import { getName, useTeachers } from '@rianarai/classroom'
import dynamic from 'next/dynamic'
import Card from '@/components/card'
import { ComponentProps, useState } from 'react'
import { Teacher } from '@rianarai/classroom'
import { EyeIcon, EyeOffIcon, PlusIcon } from '@heroicons/react/outline'
import TeacherImage from './image'
import GoogleBadge from './google'
import ModalComponent from '../modal'
import launchMeeting from '@rianarai/shared/meeting'
import { useAuth } from '@rianarai/ui-shared/context/auth'
import { deleteDocument as deleteDoc, set as setDoc } from '@lemasc/swr-firestore'
import { arrayUnion } from '@firebase/firestore'
import { useSWRConfig } from 'swr'

import * as Sentry from '@sentry/react'

const TeacherLinkAccount = dynamic(() => import('./link'))

type TeacherInfoProps = {
  desc?: string
  teacher?: Teacher
}
function TeacherInfo({
  desc,
  teacher,
  name,
  button,
}: { name: string; button?: boolean } & TeacherInfoProps) {
  return (
    <div className="flex-col sarabun-font flex text-sm gap-1 text-gray-800 truncate">
      <h2 className={`text-lg font-bold truncate ${button ? 'hover:underline' : ''}`}>{name}</h2>
      <GoogleBadge teacher={teacher} />
      <span className={!desc && !teacher?.subject ? 'text-red-500' : undefined}>
        {desc ?? (teacher.subject ? `วิชา${teacher.subject}` : 'ยังไม่ได้ตั้งค่ารายวิชา')}
      </span>
    </div>
  )
}

type TeacherCardProps = {
  title?: string
} & TeacherInfoProps &
  Omit<ComponentProps<typeof Card>, 'className' | 'children' | 'title'>

function TeacherCard({ desc, teacher, ...rest }: TeacherCardProps) {
  const name = getName(teacher) ?? rest.title ?? ''
  return (
    <Card
      {...rest}
      title={name}
      className="flex flex-row items-center text-left hover:bg-gray-100 gap-6 p-4"
    >
      {teacher ? (
        <div className="flex-shrink-0">
          <TeacherImage
            teacher={teacher}
            alt={name}
            width={60}
            height={60}
            className="border h-14 w-14 sm:h-16 sm:w-16"
          />
        </div>
      ) : (
        <div className="bg-gray-300 rounded-full">
          <PlusIcon className="h-6 w-6 sm:h-8 sm:w-8 m-4" />
        </div>
      )}
      <TeacherInfo button teacher={teacher} desc={desc} name={name} />
    </Card>
  )
}

function TeacherModal({ state, onClose }: { state: ModalState; onClose: () => void }) {
  const { mutate } = useSWRConfig()
  const { user } = useAuth()
  const { data: teachers } = useTeachers()
  const teacher = teachers?.get(state.id)
  if (!teacher) return null
  const name = getName(teacher)
  const upper = (text: string) => text.slice(0, 1).toUpperCase() + text.slice(1)

  const notAssigned = teachers
    ?.filter((c) => c.source !== 'google' && c.meetings !== undefined)
    .sortBy((c) => c.subject)

  const linkAccount = async (linkId: string) => {
    try {
      setDoc(
        `users/${user.uid}/courses/${linkId}`,
        {
          source: teacher.source,
          userId: arrayUnion(teacher.id),
        },
        {
          mutator: mutate,
        }
      )
    } catch (err) {
      console.error(err)
    }
  }
  const unlinkAccount = async () => {
    try {
      if (teacher.source !== 'google') return
      deleteDoc(`users/${user.uid}/courses/${teacher.localId}`, {
        mutator: mutate,
      })
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div className="p-4 flex flex-col gap-4 overflow-auto" style={{ maxHeight: '75vh' }}>
      <div className="flex flex-row items-center gap-4">
        <TeacherImage
          teacher={teacher}
          alt={name}
          width={75}
          height={75}
          className="border h-20 w-20"
        />
        <TeacherInfo teacher={teacher} name={name} />
      </div>
      {teacher.meetings ? (
        <>
          <h3 className="font-medium">ข้อมูลการเข้าเรียน</h3>
          <div className="sarabun-font form-container">
            <span>แหล่งที่มาของข้อมูล:</span>
            <span>
              {teacher.source === 'google' ? 'Google Classroom' : 'ออนไลน์ (WPM RianArai Plugin)'}
            </span>
            <span>รูปแบบการเข้าเรียน:</span>
            <span>{upper(teacher.meetings.type)}</span>
            <span>Meeting ID:</span>
            <span>{teacher.meetings.id}</span>
            <span>Meeting Passcode:</span>
            <span>
              <Password text={teacher.meetings.code} />
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <button
              className="zoom-btn kanit-font"
              onClick={() => {
                Sentry.captureException(new Error((Math.random() * 10).toString()))
                launchMeeting(teacher.meetings)
                onClose()
              }}
            >
              เข้าสู่ห้องเรียน
            </button>
            {teacher.source === 'google' && (
              <button
                onClick={unlinkAccount}
                className="kanit-font rounded-lg text-sm btn bg-red-500 from-red-600 to-red-600 ring-red-500 px-4 py-3 text-white"
              >
                ยกเลิกการเชื่อมต่อบัญชี Google
              </button>
            )}
          </div>
        </>
      ) : (
        <TeacherLinkAccount onSubmit={linkAccount} notAssigned={notAssigned} />
      )}
    </div>
  )
}

type ModalState = {
  show: boolean
  id?: string
}
export default function TeacherList() {
  const [modal, setModal] = useState<ModalState>({
    show: false,
  })
  const { data: teachers } = useTeachers()
  return (
    <>
      <span className="font-light">
        แสดงผลข้อมูลครูผู้สอน {teachers ? teachers.size : 0} รายการ
      </span>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {false && (
          <TeacherCard href="/teachers/add" title="เพิ่มครูผู้สอน" desc="เพิ่มครูผู้สอนใหม่" />
        )}
        {teachers &&
          Array.from(teachers.values()).map((t) => (
            <TeacherCard
              teacher={t}
              key={t.id}
              onClick={() =>
                setModal({
                  show: true,
                  id: t.id,
                })
              }
            />
          ))}
      </div>
      <ModalComponent
        size="max-w-lg"
        closable={true}
        title="ข้อมูลครูผู้สอน"
        onClose={() => setModal((state) => ({ ...state, show: false }))}
        show={modal.show}
      >
        <TeacherModal
          state={modal}
          onClose={() => setModal((state) => ({ ...state, show: false }))}
        />
      </ModalComponent>
    </>
  )
}

function Password({ text }: { text: string }) {
  const [show, setShow] = useState(false)
  const Icon = !show ? EyeIcon : EyeOffIcon
  return (
    <div className="flex flex-row gap-2 items-center w-1/3">
      <span className={`flex-grow ${show ? undefined : 'text-gray-500 text-sm'}`}>
        {show ? text : Array(text.length).fill('X')}
      </span>
      <button className={show ? 'text-red-600' : 'text-gray-800'} onClick={() => setShow(!show)}>
        <Icon className="h-5 w-5 " />
      </button>
    </div>
  )
}
