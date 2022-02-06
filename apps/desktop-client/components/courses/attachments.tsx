import { StaticAttachment } from '@rianarai/classroom'
import { useState } from 'react'

function AttachmentThumbnail({ attachment }: { attachment: StaticAttachment }) {
  const [error, setError] = useState(false)

  return (
    <>
      {!error && (
        <img
          onLoad={() => {
            setError(false)
          }}
          onError={() => {
            setError(true)
          }}
          alt={attachment.title}
          className={`rounded-l object-cover h-16 w-16 border-r bg-gray-100`}
          referrerPolicy="no-referrer"
          src={attachment.thumbnailUrl}
        />
      )}
      {error && <div className="rounded-l bg-gray-200 h-16 w-16 border-r" />}
    </>
  )
}
export default function Attachments({
  modal,
  attachments,
}: {
  modal?: boolean
  attachments: StaticAttachment[]
}) {
  return (
    <div
      className={
        modal && attachments?.length > 1
          ? 'grid grid-cols-2 gap-4'
          : 'flex flex-row flex-wrap gap-4'
      }
    >
      {attachments?.map((d, i) => (
        <a
          draggable={false}
          key={d.title + i}
          href={d.url}
          target="_blank"
          rel="noreferrer noopener"
          className={`border rounded-lg hover:bg-gray-100 flex flex-row items-center w-full ${
            modal ? '' : 'md:max-w-xs'
          }`}
          title={d.title}
        >
          <AttachmentThumbnail attachment={d} />
          <div className="flex flex-col py-2 px-4 truncate">
            <span className="font-semibold truncate">{d.title}</span>
            <span className="text-sm text-gray-600">{d.type}</span>
          </div>
        </a>
      ))}
    </div>
  )
}
