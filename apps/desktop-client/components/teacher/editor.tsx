import { Teacher } from '@rianarai/classroom'
import { ExclamationIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { FieldError, FieldErrors, useForm } from 'react-hook-form'

type InputMode = 'link' | 'code' | null | false
export default function TeacherEditor({
  onSubmit,
  userId,
  data,
}: {
  onSubmit: (success: boolean) => void
  userId?: string
  data?: Teacher
}) {
  const [input, setInput] = useState<InputMode>(null)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Teacher>()
  function submit(data: Teacher) {
    const formData = Object.assign({}, data)
    console.log(data)
  }
  const meeting = watch('meetings')

  useEffect(() => {
    if (data) {
      reset(data)
    }
  }, [data, reset])

  useEffect(() => {
    if (!meeting) return
    if (userId) return setInput(false)
    const isBlank = (field: string) => (field ? field.trim() === '' : true)
    const isDisabled = (field: string) => field === undefined
    if (!isBlank(meeting.url) && !isDisabled(meeting.id) && !isDisabled(meeting.code)) {
      return setInput('link')
    }
    if (!isBlank(meeting.id) && (!isBlank(meeting.code) || !isDisabled(meeting.url))) {
      return setInput('code')
    }
    setInput((input) => {
      if (input !== null && isBlank(meeting.id) && isBlank(meeting.code) && isBlank(meeting.url))
        return null
      return input
    })
  }, [meeting, userId])

  function isBaseFieldError(err: FieldErrors): err is FieldError {
    return (err as FieldError).message !== undefined
  }
  function getErrors() {
    if (!errors) return []
    return Object.values(errors).map((c) =>
      isBaseFieldError(c) ? c.message : Object.values(c)[0].message
    )
  }

  function isDisabled(selected: InputMode) {
    return input === false || (input !== null ? input !== selected : false)
  }
  return (
    <form onSubmit={handleSubmit(submit)}>
      <h3 className="text-xl creative-font border-b py-4 font-bold">ข้อมูลครูผู้สอน</h3>
      <div className="form-container py-4">
        <label htmlFor="displayName">ชื่อ:</label>
        <input
          className="input"
          type="text"
          {...register('displayName', {
            required: {
              value: true,
              message: 'กรุณากรอกชื่อครูผู้สอน',
            },
          })}
        />
        <label htmlFor="subject">รายวิชา:</label>
        <input
          className="input"
          type="text"
          {...register('subject', {
            required: {
              value: true,
              message: 'กรุณากรอกรายวิชาที่สอน',
            },
          })}
        />
      </div>
      <h3 className="text-xl creative-font border-b py-4 font-bold">ข้อมูลการเข้าสู่ห้องเรียน</h3>
      <div className="bg-green-200 text-green-700 rounded mt-4 py-4 px-6 sarabun-font leading-8">
        <b>รูปแบบการเข้าเรียน:</b>
        <br />
        <u>เรียนผ่านระบบ Zoom</u> เลือกกรอกข้อมูลอย่างใดอย่างหนึ่งต่อไปนี้
        <ul className="list-disc list-inside ml-4 text-sm my-1 leading-7">
          <li>ป้อน Meeting URL ที่ได้จากการเข้าร่วมการประชุม (แนะนำ)</li>
          <li>ป้อน Meeting ID และ Meeting Passcode ด้วยตนเอง</li>
        </ul>
      </div>
      <div className="form-container py-4">
        <span>รูปแบบการเข้าเรียน:</span>
        <div className="flex flex-row gap-4 font-light justify-center sm:justify-start py-2">
          <div>
            <input
              type="radio"
              className="mr-2 -mt-1"
              value="zoom"
              {...register('meetings.type', {
                required: {
                  value: true,
                  message: 'กรุณาเลือกรูปแบบการเข้าเรียน',
                },
                value: 'zoom',
              })}
            />
            <label htmlFor="zoom">Zoom</label>
          </div>
          <div>
            <input type="radio" className="mr-2 -mt-1 bg-gray-100 cursor-not-allowed" disabled />
            <label className="text-gray-500">Google Meet (เร็ว ๆ นี้)</label>
          </div>
        </div>
        <label>Meeting URL:</label>
        <input
          className="input"
          type="text"
          {...register('meetings.url', {
            disabled: isDisabled('link'),
            validate: (value) => {
              const err = 'กรุณากรอกรูปแบบ URL ให้ถูกต้อง'
              try {
                if (!value) return true
                const u = new URL(value)
                const parseId = () => {
                  const join = u.pathname.split('/j/')
                  return join.length == 2 && !isNaN(parseInt(join[1])) && join[1]
                }
                if (
                  !(
                    u.protocol === 'https:' &&
                    u.hostname.includes('zoom.us') &&
                    u.searchParams.has('pwd') &&
                    parseId()
                  )
                )
                  return err
                return true
              } catch {
                return err
              }
            },
          })}
        />
        <label>Meeting ID:</label>
        <input
          className="input"
          type="text"
          {...register('meetings.id', {
            disabled: isDisabled('code'),
            required: {
              value: true,
              message:
                'กรุณากรอก Meeting URL หรือ Meeting ID และ Passcode (เลือกอย่างใดอย่างหนึ่ง)',
            },
          })}
        />
        <label>Meeting Passcode:</label>
        <input
          className="input"
          type="password"
          {...register('meetings.code', {
            disabled: isDisabled('code'),
          })}
        />

        <label></label>
      </div>
      <div className="rounded bg-red-200 text-red-700 flex flex-col text-center sm:text-left sm:flex-row items-center sarabun-font px-4 py-6 gap-4">
        <ExclamationIcon className="h-12 lg:w-12 flex-shrink-0" />
        <div className="flex flex-col gap-2 md:gap-1">
          <b className="text-lg">ข้อมูลการเข้าสู่ห้องเรียนถือเป็นข้อมูลที่ละเอียดอ่อน</b>
          <p className="text-sm leading-6">
            ระบบจะจัดเก็บข้อมูลเหล่านี้อย่างปลอดภัยและใช้สำหรับเข้าเรียนเท่านั้น{' '}
            จะไม่นำไปใช้ในวัตถุประสงค์อื่นโดยเด็ดขาด{' '}
            <a
              className="font-bold underline hover:text-red-900"
              href={`${process.env.NEXT_PUBLIC_ENDPOINT}/privacy`}
            >
              ดูเพิ่มเติมเกี่ยวกับนโยบายความเป็นส่วนตัว
            </a>
          </p>
        </div>
      </div>
      {getErrors().length !== 0 && (
        <div className="text-red-600 text-center font-bold py-8 sarabun-font">{getErrors()[0]}</div>
      )}
      <div className="flex flex-grow items-center justify-center py-8">
        <div className="items-center justify-center flex flex-col sm:grid-cols-2 sm:grid gap-4 w-full max-w-sm">
          <button
            type="submit"
            className="w-full sm:w-auto text-white btn py-2 ring-apple-500 bg-apple-500 from-apple-500 to-apple-600 disabled:bg-gray-200"
          >
            บันทึก
          </button>
          <button
            type="button"
            className="w-full sm:w-auto btn py-2 ring-gray-300 text-black bg-gray-200 from-gray-200 to-gray-300"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </form>
  )
}
