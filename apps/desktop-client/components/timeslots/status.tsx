import { Teacher } from '@rianarai/classroom'
import launchMeeting from '@rianarai/shared/meeting'
import Link from 'next/link'
import { ReactNode } from 'react'

interface MeetingJoinProps {
  teachers: Teacher[]
  disabled: boolean
}

export const MeetingNotFound: React.FC = () => {
  return (
    <>
      <h4 className="text-lg font-medium text-red-500 p-4">ไม่พบข้อมูลผู้สอนในรายวิชานี้</h4>
      <div className="text-sm">
        นี่อาจเกิดจาก
        <br />
        <ul className="py-2 px-4 font-light">
          <li className="px-16">รายวิชานี้ไม่ได้เรียนในระบบ Zoom</li>
          <li className="px-16">ยังไม่มีข้อมูลผู้สอนของรายวิชานี้</li>
          <li className="px-16">พิมพ์ตกหล่นทำให้ระบบหาข้อมูลไม่เจอ</li>
        </ul>
        หากคิดว่านี้เป็นข้อผิดพลาด กรุณา{' '}
        <Link href="/support">
          <a
            target="_blank"
            rel="noopener noreferrer"
            title="Support"
            className="font-normal underline text-blue-500 hover:text-blue-600"
          >
            แจ้งปัญหาการใช้งาน
          </a>
        </Link>
      </div>
    </>
  )
}

export const MeetingJoin: React.FC<MeetingJoinProps> = ({ teachers, disabled }) => {
  const buttons: ReactNode[] = []
  teachers.map((meeting, index) => {
    buttons.push(
      <button
        title={
          disabled
            ? 'สามารถเข้าสู่ห้องเรียนก่อนเวลาได้ 10 นาที'
            : 'เข้าสู่ห้องเรียน จำเป็นต้องมี Zoom ติดตั้งลงในอุปกรณ์แล้ว'
        }
        key={index}
        disabled={disabled}
        className="zoom-btn w-full"
        onClick={() => launchMeeting(meeting.meetings)}
      >
        {disabled ? 'Not In Time' : 'Launch Meetings'}{' '}
        {teachers.length !== 1 && ' : ' + meeting.name}
      </button>
    )
  })
  return <div className="px-8 w-full max-w-sm">{buttons}</div>
}
