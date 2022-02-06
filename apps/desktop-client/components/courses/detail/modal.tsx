import Markdown from '@/components/markdown'
import { isCourseWork, StaticAttachment, Submission } from '@rianarai/classroom'
import dayjs from 'dayjs'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import { ComponentProps, createElement, ReactNode } from 'react'
import Attachments from '../attachments'
import { showUpdateTime } from '../feedItem'
import Skeleton from 'react-loading-skeleton'
import { useCourseView } from '../viewContext'
import { createDueDate, createState, getColor, getStateName } from '@rianarai/shared/work'

dayjs.extend(buddhistEra)

type DetailResource = {
  title?: string
  creationTime?: string
  updateTime?: string
  alternateLink?: string
  description?: string
  materials?: StaticAttachment[]
  maxPoints?: number
}

function Text<T extends React.ElementType<any>>({
  className,
  as,
  children,
  width,
  height,
  loaded,
  count,
  ...rest
}: Partial<ComponentProps<T>> & {
  as?: keyof JSX.IntrinsicElements
  children: ReactNode
  width: number
  height?: number
  loaded: boolean
  count?: number
}): JSX.Element {
  return loaded ? (
    createElement(
      as ?? 'div',
      {
        className,
        ...rest,
      },
      children
    )
  ) : (
    <Skeleton count={count} width={width} height={height ?? 20} />
  )
}
export default function DetailModal({
  data,
  type,
  submission,
}: {
  data?: DetailResource
  type: string
  submission?: Submission
}) {
  const { contentModal } = useCourseView()
  const courseWorkContent = data && (data.description || data.materials)
  const submissionContent = submission && submission.assignmentSubmission
  return (
    <div className="sarabun-font flex flex-col h-full" style={{ maxHeight: '75vh' }}>
      <div
        className="p-4 flex-shrink-0 flex flex-row bg-gray-100 border-b"
        style={{ minHeight: '8rem' }}
      >
        <div className="flex flex-col space-y-2 pr-2 text-sm flex-grow items-start text-left">
          <Text
            loaded={data !== undefined}
            width={400}
            height={50}
            as="h3"
            className="text-xl font-bold mr-8 break-words gap-1"
          >
            {data?.title}
          </Text>
          <Text
            as="div"
            loaded={data !== undefined}
            width={250}
            count={2}
            className="font-medium text-gray-500 flex flex-col gap-1.5"
          >
            {data && (
              <>
                <span>ประเภท: {type}</span>
                <span>
                  สร้างเมื่อ {dayjs(data.creationTime).format('DD MMM BBBB เวลา HH:mm น.')}
                </span>
                {showUpdateTime(data.creationTime, data.updateTime) && (
                  <span>
                    {dayjs(data.updateTime).format('แก้ไขเมื่อ DD MMM BBBB เวลา HH:mm น.')}
                  </span>
                )}
                {isCourseWork(data) && (
                  <span>
                    {data.dueDate
                      ? createDueDate(data).format('ครบกำหนดวันที่ DD MMM BBBB เวลา HH:mm น.')
                      : 'ไม่มีวันครบกำหนด'}
                  </span>
                )}
              </>
            )}
          </Text>

          <Text
            loaded={data !== undefined}
            width={150}
            as="a"
            className="text-blue-500 underline"
            target="_blank"
            rel="noreferrer noopener"
            href={data?.alternateLink}
          >
            เปิดใน Google Classroom
          </Text>
        </div>
        {contentModal.type === 'courseWork' && (
          <div className="flex flex-shrink-0 flex-col space-y-1 items-end font-bold text-gray-800">
            <Text
              as="b"
              width={150}
              height={24}
              loaded={submission !== undefined}
              className={`text-lg ${getColor(createState(submission?.state, data))}`}
            >
              {getStateName(createState(submission?.state, data))}
            </Text>

            <Text as="span" width={50} loaded={data !== undefined && submission !== undefined}>
              {data?.maxPoints &&
                (submission?.assignedGrade
                  ? `${submission.assignedGrade}/${data?.maxPoints}`
                  : `${data?.maxPoints} คะแนน`)}
            </Text>
          </div>
        )}
      </div>
      {(courseWorkContent || submissionContent) && (
        <div className="px-4 overflow-auto divide-y">
          {courseWorkContent && (
            <div className="flex flex-col py-4 flex-grow flex-shrink-0 gap-2 overflow-auto">
              <h4 className="font-bold">รายละเอียด{type}</h4>
              {data.description && (
                <Markdown className="text-sm break-words">{data.description}</Markdown>
              )}
              {data?.materials && <Attachments modal attachments={data.materials} />}
            </div>
          )}
          {submissionContent && submission.assignmentSubmission?.attachments && (
            <div className="flex flex-col py-4 flex-grow flex-shrink-0 gap-4">
              <h4 className="font-bold">งานที่แนบไว้</h4>
              <Attachments modal attachments={submission.assignmentSubmission.attachments} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
