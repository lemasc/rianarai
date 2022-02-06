import axios, { AxiosInstance, AxiosResponse } from 'axios'
import type { CredentialRequest } from 'google-auth-library'
import { GoogleSignin, verifyNativeError } from './signin'
import dayjs from 'dayjs'

import CredentialStorage from './credentials'
import {
  ClassroomClient,
  requiredScopes,
  additionalScopes,
  RefreshRequestParams,
  BaseUser
} from './base'

import { TypedEmitter } from 'tiny-typed-emitter'
import { ClassroomEvents } from '../types/events'

const initGoogleSignIn = () =>
  GoogleSignin.configure({
    offlineAccess: true,
    scopes: [...requiredScopes, ...additionalScopes],
    webClientId: process.env.WEB_CLIENT_ID
  })

/**
 * RianArai Classroom main instance used by Electron main process and React Native.
 *
 * However, the Electron main process shouldn't use this class directly.
 * It should be loaded by the `@rianarai/classroom/core/node` instead.
 */
export default class RianAraiClassroom
  extends CredentialStorage
  implements ClassroomClient
{
  private isRefreshing = false
  protected user?: BaseUser
  private instance: AxiosInstance
  events: TypedEmitter<ClassroomEvents>
  constructor() {
    super()
    this.events = new TypedEmitter()
    this.instance = axios.create({
      baseURL: process.env.API_URL
    })
    initGoogleSignIn()
  }

  private _isCredentialValid() {
    return this.credentials?.expiry_date
      ? dayjs().isBefore(dayjs.unix(this.credentials.expiry_date))
      : false
  }

  private _isCredentialNeedsRefresh() {
    return this.credentials
      ? !dayjs()
          .add(5, 'minutes')
          .isBefore(dayjs.unix(this.credentials.expiry_date))
      : false
  }

  protected _sendAuthChangeEvent(signedIn?: boolean) {
    this.events.emit('auth-changed', {
      needsRefresh: this.user !== undefined && this._isCredentialNeedsRefresh(),
      valid: this.user !== undefined && this._isCredentialValid(),
      signedIn:
        signedIn ?? (this.user !== undefined && this.credentials !== undefined)
    })
  }
  /**
   * Sign in the user and authenticate securely with the RianArai server.
   */

  signIn = async () => {
    await GoogleSignin.hasPlayServices()
    this.user = await GoogleSignin.signIn()
    // There's no credential yet.
    this._sendAuthChangeEvent(true)
    return this.user
  }

  addScopes = async () => {
    await GoogleSignin.addScopes({
      scopes: additionalScopes
    })
  }

  /**
   * Clear any RianArai credentials and sign out the user.
   */

  signOut = async () => {
    await this.clearCredentials()
    await GoogleSignin.signOut()
    this.user = undefined
    this._sendAuthChangeEvent()
  }

  /**
   * Initialize the plugin and setup necessary validation.
   * This function should be called as soon as the application was loaded.
   */
  async initialize() {
    try {
      // Always read the credentials, since Google may able to sign in without our credentials.
      await this.readCredentials()
      this.user = await GoogleSignin.signInSilently()
      this._sendAuthChangeEvent()
    } catch (err) {
      console.error(err)
      this.user = undefined
      this._sendAuthChangeEvent()
      if (verifyNativeError(err)) {
        // User didn't signed in yet.
        return
      } else {
        throw err
      }
    }
  }

  protected _sendRefreshRequest = async (
    params: RefreshRequestParams,
    idToken: string
  ) => {
    if (this.isRefreshing) return
    try {
      this.isRefreshing = true
      const { data: token } = await this.instance.request<CredentialRequest>({
        url: '/token',
        method: 'POST',
        data: null,
        params,
        headers: {
          Authorization: `Bearer ${idToken}`
        },
        validateStatus: (status) => status === 200
      })
      await this.saveCredentials(token)
      console.log('Refresh Success')
      this._sendAuthChangeEvent()
    } catch (err) {
      console.log('Refresh Fail')
      throw err
    } finally {
      // Delayed to prevent multiple request at a time
      setTimeout(() => (this.isRefreshing = false), 1000)
    }
  }

  /**
   * Refresh the RianArai credentials using the current Firebase JWT token.
   */
  async refresh(idToken?: string) {
    if (!idToken) throw new Error('No ID Token given!')
    if (!this.user) throw new Error('No user found!')
    if (this.credentials?.refresh_token) {
      if (!this._isCredentialNeedsRefresh()) return
      await this._sendRefreshRequest(
        {
          grant_type: 'refresh_token',
          refresh_token: this.credentials.refresh_token
        },
        idToken
      )
    } else if (this.user.serverAuthCode) {
      await this._sendRefreshRequest(
        {
          grant_type: 'authorization_code',
          code: this.user.serverAuthCode,
          code_verifier: this.user.codeVerifier
        },
        idToken
      )
    } else {
      throw new Error('Neither refresh token nor serverAuthCode was set.')
    }
  }

  async request<T>(url: string): Promise<AxiosResponse<T>> {
    if (this.credentials?.access_token && !this._isCredentialNeedsRefresh()) {
      try {
        return await this.instance.get<T>(url, {
          headers: {
            Authorization: `Bearer ${this.credentials?.access_token}`
          }
        })
      } catch (err) {
        console.error(err)
        if (axios.isAxiosError(err)) {
          if (err.response && err.response?.status === 403) {
            this._sendAuthChangeEvent()
            throw new Error(
              'Request forbidden. Refreshing token might required.'
            )
          }
        }
        throw err
      }
    } else {
      this._sendAuthChangeEvent()
      throw new Error(
        'Access token should be refreshed before continue requesting.'
      )
    }
  }
}
