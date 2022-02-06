import React from 'react'
import { loadBundle } from 'firebase/firestore'
import { Document, useDocument } from '@lemasc/swr-firestore'
import axios from 'axios'

import { Provider, UserMetadata } from '@rianarai/classroom/types/auth'
import {
  auth,
  GoogleAuthProvider,
  onIdTokenChanged,
  signInWithCredential,
  User
} from '@rianarai/shared/firebase'
import { alertAsync } from '../alert'
import { db as pluginDb } from '@rianarai/shared/firebase/plugin'
import { usePlugin } from './plugin'
import { ContextProps } from './types'

interface IAuthContext {
  user: User | null
  ready: boolean
  bundle: boolean
  remove: () => Promise<void> | undefined
  // announce: Document<Announcement>[]
  // markAsRead: (announceId: string) => Promise<void>
  metadata: Document<UserMetadata> | undefined | null
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  updateMeta: (meta: UserMetadata) => Promise<boolean>
}

const authContext = React.createContext<IAuthContext | undefined>(undefined)

export const useAuth = (): IAuthContext => {
  const ctx = React.useContext(authContext)
  if (!ctx) throw new Error('No context found: authContext')
  return ctx
}

// Provider hook that creates auth object and handles state
function useProvideAuth(): IAuthContext {
  const { classroom, status } = usePlugin()
  const [user, setUser] = React.useState<User | null>(null)
  const [ready, setReady] = React.useState<boolean>(false)
  const [bundle, setBundle] = React.useState(false)
  const [metadata, setMetadata] = React.useState<
    Document<UserMetadata> | null | undefined
  >(undefined)
  const {
    data: _metadata,
    set,
    error
  } = useDocument<UserMetadata>(user ? `users/${user.uid}` : null, {
    listen: true
  })

  /**
   * SWR-Firestore always return a document.
   * We want SWR style (null if not exists, undefined if loading).
   * Add a wrapper instead.
   */
  React.useEffect(() => {
    setMetadata(
      _metadata !== undefined
        ? _metadata?.exists
          ? _metadata
          : null
        : undefined
    )
  }, [_metadata])

  /* const { data: announce } = useCollection<Announcement>(ready ? 'announcement' : null, {
    where: [['enable', '==', true], ...(!user ? [] : ([['needs_login', '==', false]] as any))],
    orderBy: ['created_at', 'desc'],
    parseDates: ['created_at', 'released_at'],
    listen: true,
  })
*/
  React.useEffect(() => {
    let time = undefined
    if (time) clearTimeout(time)
    time = setTimeout(() => {
      console.log('Ready,', user == null || metadata !== undefined)
      setReady(true)
    }, 1000)
  }, [user, metadata])

  React.useEffect(() => {
    if (!metadata || !user) return
    ;(async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_PLUGIN_ENDPOINT}/api/client/bundle/${metadata.class}`,
          {
            headers: {
              Authorization: `Bearer ${await user.getIdToken()}`
            },
            responseType: 'arraybuffer'
          }
        )
        await loadBundle(pluginDb, data)
        setBundle(true)
      } catch (err) {
        console.error(err)
        setBundle(false)
      }
    })()
  }, [metadata, bundle, user])

  const signInWithGoogle = async (): Promise<void> => {
    const user = await classroom?.signIn()
    if (!user) return
    await signInWithCredential(
      auth,
      GoogleAuthProvider.credential(user.idToken)
    )
  }

  const refreshAlert = React.useCallback(
    async (forceLogout?: boolean) => {
      if (!user) return true
      return await alertAsync({
        ...(forceLogout
          ? {
              title: 'ไม่สามารถเข้าสู่ระบบได้',
              message: 'กรุณาออกจากระบบแล้วเข้าสู่ระบบใหม่อีกครั้ง'
            }
          : {
              title: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้',
              message: 'กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ตแล้วลองใหม่อีกครั้ง'
            }),
        buttons: [
          {
            text: 'ออกจากระบบ',
            value: true
          },
          ...(!forceLogout
            ? [
                {
                  text: 'ลองอีกครั้ง',
                  value: false
                }
              ]
            : [])
        ],
        type: 'error'
      })
    },
    [user]
  )

  const addScopeAlert = async () => {
    return await alertAsync({
      title: 'ยังไม่ได้เชื่อมต่อกับ Google Classroom',
      message:
        'กรุณาเข้าสู่ระบบเพื่อเชื่อมต่อกับ Google Classroom ก่อนเข้าใช้งานแอพพลิเคชั่น',
      buttons: [
        {
          text: 'ออกจากระบบ',
          value: false
        },
        {
          text: 'เชื่อมต่อ',
          value: true
        }
      ],
      type: 'warning'
    })
  }

  const remove = async () => {
    await user?.delete()
    await classroom?.signOut()
  }

  const signOut = React.useCallback(
    async (showAlert = true): Promise<void> => {
      // We don't sign out users immediately.
      // Ask the users before continuing.
      if (showAlert) {
        const ok = await alertAsync({
          title: 'ออกจากระบบ',
          message: 'คุณต้องการออกจากระบบหรือไม่',
          buttons: [
            {
              text: 'ยกเลิก',
              style: 'cancel'
            },
            {
              text: 'ตกลง',
              value: true
            }
          ],
          type: 'question'
        })
        if (!ok) return
      }
      await classroom?.signOut()
      await auth.signOut()
    },
    [classroom]
  )

  const refresh: () => Promise<void> = React.useCallback(async () => {
    if (!user || !metadata || !status?.signedIn) return
    try {
      await classroom?.refresh(await user?.getIdToken())
      setReady(true)
    } catch (err) {
      console.error('Refresh error')
      console.error(err)
      setReady(false)
      let forceLogout = true
      if (axios.isAxiosError(err)) {
        if (err.response) {
          if (err.response.status === 204) {
            // iOS requires scopes to be incrementally added, even user may already granted.
            // We might made this as an opt-in feature, but for now it requires that all users must connect to Classroom.
            // Show the alert, request scopes and try again.
            const addScopes = await addScopeAlert()
            if (addScopes) {
              await classroom?.addScopes()
              return await refresh()
            } else {
              return signOut(false)
            }
          }
          forceLogout = err.response.status !== 404
        } else forceLogout = false
      }
      if (await refreshAlert(forceLogout)) await signOut(false)
      else await refreshAlert()
    }
  }, [user, metadata, classroom, refreshAlert, signOut, status])

  const updateMeta = async (meta: UserMetadata): Promise<boolean> => {
    if (!user) return false
    try {
      meta.name = user.displayName as string
      meta.email = user.email as string
      meta.provider = user.providerData.map((p) => p.providerId) as Provider[]
      if (metadata && metadata.announceId) {
        meta.announceId = metadata.announceId //Preserve fields
      }
      if (metadata && metadata.upgrade) meta.upgrade = metadata.upgrade
      await set(meta)
      return true
    } catch (err) {
      return false
    }
  }

  const validateRef = React.useRef<any>()
  React.useEffect(() => {
    if (!status) return
    if (validateRef.current) clearTimeout(validateRef.current)
    validateRef.current = setTimeout(() => {
      const { signedIn, needsRefresh, valid } = status
      console.log('Auth change event', { signedIn, needsRefresh, valid })
      if (user) {
        if (!signedIn) {
          signOut(false)
        } else if (needsRefresh || !valid) {
          refresh()
        }
      }
    }, 2000)
  }, [user, refresh, signOut, status])

  React.useEffect(() => {
    let _isMounted = true
    return onIdTokenChanged(auth, async (curUser) => {
      if (!_isMounted) return
      if (curUser) {
        setReady(false)
        setUser(curUser)
        // withAnalytics((a) => setUserId(a, curUser.uid))
        // Refresh immediately after user changes.
        refresh()
      } else {
        setUser(null)
      }
      return () => {
        _isMounted = false
      }
    })
  }, [refresh])

  return {
    user,
    metadata,
    remove,
    ready,
    bundle,
    signInWithGoogle,
    signOut,
    updateMeta
  }
}

export function AuthProvider({ children }: ContextProps) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}
