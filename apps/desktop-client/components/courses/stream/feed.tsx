import { StreamFeed as Feed, isAnnouncement, isCourseWork, useTeachers } from '@rianarai/classroom'
import { useAnnoucement, useCourseWork, useMaterials } from '@rianarai/classroom'
import { List } from 'immutable'
import { useEffect, useState } from 'react'
import Markdown from '@/components/markdown'
import Attachments from '../attachments'
import dayjs from 'dayjs'
import { FeedItem, FeedItemHeader } from '../feedItem'
import { useCourseView } from '../viewContext'

export default function StreamFeed() {
  const { course, setContentModal, teacher } = useCourseView()
  const [feed, setFeed] = useState<Feed[]>([])
  const { data: announcements } = useAnnoucement(course?.id)
  const { data: materials } = useMaterials(course?.id)
  const { data: courseWork } = useCourseWork(course?.id)
  useEffect(() => {
    const data = List<Feed>()
      .concat(announcements?.toList(), materials?.toList(), courseWork?.toList())
      .filter((c) => c !== undefined)
    setFeed(
      data.sort((a, b) => (dayjs(a.creationTime).isBefore(b.creationTime) ? 1 : -1)).toArray()
    )
  }, [announcements, courseWork, materials])

  function getAllSize() {
    return announcements?.size + materials?.size + courseWork?.size
  }
  if (getAllSize() !== feed.length) {
    return (
      <>
        {Array.from(Array(getAllSize() || 3).keys()).map((i) => (
          <FeedItem className="rounded-lg border" key={'skeleton' + i}>
            <FeedItemHeader />
          </FeedItem>
        ))}
      </>
    )
  }
  return (
    <>
      {feed?.map((v) =>
        isAnnouncement(v) ? (
          <FeedItem className="rounded-lg border" key={v.id}>
            <FeedItemHeader
              type="announcement"
              creationTime={v.creationTime}
              updateTime={v.updateTime}
              photoUrl={v.creatorUserId === course.ownerId ? teacher?.photoUrl : v.photoUrl}
            />
            <Markdown className="text-sm py-1 select-text">{v.text}</Markdown>
            {v.materials && <Attachments attachments={v.materials} />}
          </FeedItem>
        ) : (
          <FeedItem
            className="rounded-lg border"
            key={v.id}
            onClick={() =>
              setContentModal({
                id: v.id,
                show: true,
                type: isCourseWork(v) ? 'courseWork' : 'material',
              })
            }
          >
            <FeedItemHeader
              title={v.title}
              type={isCourseWork(v) ? 'courseWork' : 'material'}
              creationTime={v.creationTime}
              updateTime={v.updateTime}
            />
          </FeedItem>
        )
      )}
    </>
  )
}
