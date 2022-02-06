import { BookmarkAltIcon, ClipboardListIcon, SpeakerphoneIcon } from '@heroicons/react/outline'
import Skeleton from 'react-loading-skeleton'
import { ComponentProps, ReactNode, ReactNodeArray, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import th from 'dayjs/locale/th'
import { WorkState } from '@rianarai/classroom'
import { useAuth } from '@rianarai/ui-shared/context/auth'
import { isWorkSubmitted } from '@rianarai/shared/work'

dayjs.locale(th)
dayjs.extend(localizedFormat)
dayjs.extend(buddhistEra)

export function showUpdateTime(creationTime, updateTime) {
  // We allow the gap time between creationTime and updateTime for 30 seconds.
  return creationTime && updateTime && dayjs(updateTime).subtract(1, 'm').isAfter(creationTime)
}

export function FeedItemHeader({
  state,
  dueDate,
  work,
  type,
  title,
  creationTime,
  updateTime,
  photoUrl,
}: {
  type?: 'announcement' | 'courseWork' | 'material'
  creationTime?: string
  updateTime?: string
  title?: string
  photoUrl?: string
  work?: boolean
  dueDate?: Dayjs
  state?: WorkState
}) {
  const [skeleton, setSkeleton] = useState(true)
  const dateFormat = 'D MMM BB HH:mm น.'
  if (!type || (work && type == 'courseWork' && !state)) {
    return (
      <div className="flex flex-row gap-4 items-center">
        <Skeleton circle width={40} height={40} />
        <div className="flex flex-col text-left">
          <Skeleton width={100} />
          <Skeleton width={150} />
        </div>
      </div>
    )
  }
  let Icon: (props: ComponentProps<'svg'>) => JSX.Element
  let text: string
  switch (type) {
    case 'announcement':
      Icon = SpeakerphoneIcon
      text = 'ประกาศ'
      break
    case 'courseWork':
      Icon = ClipboardListIcon
      text = 'งาน'
      break
    case 'material':
      Icon = BookmarkAltIcon
      text = 'เนื้อหา'
      break
  }

  return (
    <div className="flex flex-row gap-4 items-center">
      {type === 'announcement' ? (
        <>
          {skeleton && <Skeleton width={40} height={40} circle />}
          <img
            alt="Profile"
            className={`rounded-full h-10 w-10 ${skeleton ? ' hidden' : ''}`}
            width={40}
            height={40}
            referrerPolicy="no-referrer"
            onLoad={() => setSkeleton(false)}
            src={photoUrl}
          />
        </>
      ) : (
        <div
          className={`rounded-full text-white ${
            state && isWorkSubmitted(state) ? 'bg-gray-400' : 'bg-jaffa-500'
          } p-2`}
        >
          <Icon className="h-6 w-6" />
        </div>
      )}
      <div className="flex flex-col text-left">
        <span className="font-semibold text-gray-900">
          {!work && text} {title && (!work ? ': ' : '') + title}
        </span>
        <span className="text-gray-500 text-sm">
          {work ? (
            type !== 'courseWork' ? (
              <>
                {showUpdateTime(creationTime, updateTime) ? 'แก้ไขเมื่อ' : 'สร้างเมื่อ'}{' '}
                {dayjs(showUpdateTime(creationTime, updateTime) ? updateTime : creationTime).format(
                  dateFormat
                )}
              </>
            ) : dueDate ? (
              dueDate.format(`ครบกำหนดวันที่ ${dateFormat}`)
            ) : (
              'ไม่มีวันที่ครบกำหนด'
            )
          ) : (
            <>
              {dayjs(creationTime).format(`สร้างเมื่อ ${dateFormat}`)}
              {showUpdateTime(creationTime, updateTime) &&
                dayjs(updateTime).format(` (แก้ไขเมื่อ ${dateFormat})`)}
            </>
          )}
        </span>
      </div>
    </div>
  )
}
export function FeedItem({
  className,
  children,
  onClick,
}: {
  className?: string
  onClick?: () => void
  children: ReactNode | ReactNodeArray
}) {
  const baseClass = `p-4 flex flex-col gap-2 sarabun-font ${className}`
  if (onClick) {
    return (
      <button onClick={onClick} className={`hover:bg-gray-100 ${baseClass}`}>
        {children}
      </button>
    )
  }
  return (
    <div onClick={onClick} className={baseClass}>
      {children}
    </div>
  )
}
