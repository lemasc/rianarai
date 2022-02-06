import { WorkFeed as Feed, isCourseWork } from '@rianarai/classroom'
import { useCourseWork, useMaterials, useSubmissions, useTopics } from '@rianarai/classroom'
import { List, Seq, Collection } from 'immutable'
import { useEffect, useState } from 'react'
import { FeedItem, FeedItemHeader } from '../feedItem'
import Skeleton from 'react-loading-skeleton'
import { useCourseView } from '../viewContext'
import dayjs from 'dayjs'
import { createDueDate } from '@rianarai/shared/work'

export default function StreamFeed() {
  const { course, setContentModal } = useCourseView()
  const [size, setSize] = useState(0)
  const [feed, setFeed] = useState<Seq.Keyed<string, Collection<number | undefined, Feed>>>()
  const { data: materials } = useMaterials(course?.id)
  const { data: courseWork } = useCourseWork(course?.id)
  const { data: submissions } = useSubmissions(course?.id)
  const { data: topics } = useTopics(course?.id)
  useEffect(() => {
    const data = List<Feed>()
      .concat(materials?.toList(), courseWork?.toList())
      .filter((c) => c !== undefined)
    setSize(data.size)
    const d = data
      .sort((a, b) => (dayjs(a.creationTime).isBefore(b.creationTime) ? 1 : -1))
      .groupBy((c) => c.topicId)
      .sortBy(
        (v, key) => key,
        (key) => (key === undefined ? -1 : 0)
      )
    setFeed(d)
  }, [courseWork, materials])

  function getAllSize() {
    return materials?.size + courseWork?.size
  }
  if (getAllSize() !== size) {
    return (
      <>
        {Array.from(Array(getAllSize() || 3).keys()).map((i) => (
          <FeedItem key={'skeleton' + i}>
            <FeedItemHeader />
          </FeedItem>
        ))}
      </>
    )
  }
  return (
    <>
      {feed
        ?.map((items, key) => (
          <div className="flex flex-col" key={`feed_${key}`}>
            {key !== undefined &&
              (topics ? (
                <h3 className="text-xl creative-font font-bold px-4 pt-2 text-jaffa-500 truncate">
                  {topics.get(key).name}
                </h3>
              ) : (
                <Skeleton className="mx-4" width={300} height={32} />
              ))}
            <div
              className={`flex flex-col divide-y${
                key !== undefined ? ' my-2 border-jaffa-500 border-t' : ''
              }`}
            >
              {items
                .map((v) => (
                  <FeedItem
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
                      work
                      title={v.title}
                      type={isCourseWork(v) ? 'courseWork' : 'material'}
                      creationTime={v.creationTime}
                      updateTime={v.updateTime}
                      dueDate={isCourseWork(v) && createDueDate(v)}
                      state={isCourseWork(v) ? submissions?.get(v.id)?.state : undefined}
                    />
                  </FeedItem>
                ))
                .toArray()}
            </div>
          </div>
        ))
        .toList()
        .toArray()}
    </>
  )
}
