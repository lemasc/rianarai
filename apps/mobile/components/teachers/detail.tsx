import { useState, useRef, useCallback, useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { HStack, VStack, Pressable, Button, Icon } from 'native-base'
import { deleteDocument, set } from '@lemasc/swr-firestore'
import firestore from '@react-native-firebase/firestore'

import { Teacher } from '@rianarai/classroom'
import { useAuth } from '@rianarai/ui-shared/context/auth'
import launchMeeting from '@rianarai/shared/meeting'

import Text from '../Text'
import FormContainer from '../FormContainer'
import { Select } from '../form/input'
import { useSWRConfig } from 'swr'

export type BaseProps = {
  teacher?: Teacher
  process: boolean
  setProcess: (process: boolean) => void
}

function Password({ text }: { text?: string }) {
  const [show, setShow] = useState(false)
  return (
    <HStack alignItems="center" space="2">
      <Text
        flexGrow={1}
        {...(show
          ? {}
          : {
              fontSize: 'sm',
              color: 'gray.500',
            })}
      >
        {show ? text : Array(text?.length).fill('X')}
      </Text>
      <Pressable
        _pressed={{
          opacity: 0.7,
        }}
        onPress={() => setShow(!show)}
      >
        <Icon
          as={MaterialCommunityIcons}
          name={show ? 'eye-off' : 'eye'}
          color={show ? 'red.600' : 'gray.800'}
          size={6}
          _dark={
            show
              ? undefined
              : {
                  color: 'gray.400',
                }
          }
        />
      </Pressable>
    </HStack>
  )
}

export function TeacherLinkAccount({
  teacher,
  notAssigned,
  process,
  setProcess,
}: BaseProps & {
  notAssigned: Teacher[]
}) {
  const { user } = useAuth()
  const { mutate } = useSWRConfig()
  const [userId, setUserId] = useState('')
  const mounted = useRef(false)

  const linkAccount = useCallback(async () => {
    if (!user || !teacher) throw new Error('Not authenticated.')
    if (!userId) throw new Error('No teacher selected.')
    await set(
      `users/${user.uid}/courses/${userId}`,
      {
        source: teacher.source,
        userId: firestore.FieldValue.arrayUnion(teacher.id),
      },
      {
        mutator: mutate,
      }
    )
  }, [user, teacher, userId, mutate])

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    if (!process) return
    linkAccount().catch(() => setProcess(false))
    return () => setProcess(false)
  }, [process, setProcess, linkAccount])

  return (
    <VStack space={4}>
      <Text>
        กรุณาเลือกครูผู้สอนที่ต้องการเชื่อมต่อกับบัญชี Google นี้
        คุณสามารถแก้ไขข้อมูลเหล่านี้ได้ในภายหลัง
      </Text>
      <Select placeholder="กรุณาเลือก..." selectedValue={userId} onValueChange={setUserId}>
        {notAssigned?.map((i) => (
          <Select.Item key={i.id} value={i.id} label={`${i.subject} - ${i.name}`} />
        ))}
      </Select>
    </VStack>
  )
}

export function TeacherDetail({ teacher, process, setProcess }: BaseProps) {
  const { user } = useAuth()
  const { mutate } = useSWRConfig()
  const mounted = useRef(false)

  const upper = (text: string) => text.slice(0, 1).toUpperCase() + text.slice(1)

  const unlinkAccount = useCallback(async () => {
    if (!teacher || !user) throw new Error('Not authenticated.')
    if (teacher.source !== 'google' || !teacher.localId)
      throw new Error('Invalid teacher to unlink.')
    await deleteDocument(`users/${user.uid}/courses/${teacher.localId}`, {
      mutator: mutate,
    })
  }, [teacher, user, mutate])

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    if (!process) return
    unlinkAccount().catch(() => setProcess(false))
    return () => setProcess(false)
  }, [process, setProcess, unlinkAccount])
  return (
    <VStack space={6}>
      <Text fontSize="lg" fontWeight="semibold">
        ข้อมูลการเข้าเรียน
      </Text>
      <FormContainer ignoreStylingIndex={[7]}>
        <Text>แหล่งที่มาของข้อมูล:</Text>
        <Text>
          {teacher?.source === 'google' ? 'Google Classroom' : 'ออนไลน์ (WPM RianArai Plugin)'}
        </Text>
        <Text>รูปแบบการเข้าเรียน:</Text>
        <Text>{upper(teacher?.meetings?.type ?? 'zoom')}</Text>
        <Text>Meeting ID:</Text>
        <Text>{teacher?.meetings?.id}</Text>
        <Text>Meeting Passcode:</Text>
        <Password text={teacher?.meetings?.code} />
      </FormContainer>
      <Button
        rounded="lg"
        py="3"
        bgColor={'blue.500'}
        _pressed={{ bgColor: 'blue.600' }}
        onPress={() => {
          launchMeeting(teacher?.meetings as never)
        }}
      >
        <Text color="white" fontWeight={'semibold'}>
          เข้าสู่ห้องเรียน
        </Text>
      </Button>
    </VStack>
  )
}
