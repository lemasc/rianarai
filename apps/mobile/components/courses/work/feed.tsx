import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Map } from 'immutable'
import { Box, SectionList } from 'native-base'

import { TabScreenProps } from '../../../navigation/types'
import {
  Course,
  isCourseWork,
  Submission,
  Topic,
  useSubmissions,
  useTopics,
} from '@rianarai/classroom'
import { WorkFeed as Feed } from '@rianarai/classroom/types/feed'
import { createDueDate } from '@rianarai/shared/work'
import { useWorkFeed } from '@rianarai/classroom/hooks/feed'

import { FeedItem, FeedItemHeader } from '../feedItem'
import Skeleton from '../../Skeleton'
import Text from '../../Text'

type WorkFeedData = {
  key: string | undefined
  data: Feed[]
}

const WorkFeedSectionHeader = ({
  section,
  topics,
}: {
  section: WorkFeedData
  topics?: Map<string, Topic>
}) => {
  return section.key !== undefined ? (
    <Box
      pt="6"
      px={topics === undefined ? '4' : undefined}
      bgColor="gray.50"
      _dark={{ bg: 'black' }}
    >
      <Skeleton show={topics === undefined} height={45} width={300}>
        {topics?.get(section.key) ? (
          <>
            <Text
              isTruncated
              noOfLines={1}
              pr="8"
              fontFamily="Kodchasan-600"
              color="jaffa.500"
              fontSize={'xl'}
              px="4"
              py="2"
            >
              {topics?.get(section.key)?.name}
            </Text>
            <Box borderWidth={0.5} borderColor="jaffa.500" />
          </>
        ) : undefined}
      </Skeleton>
    </Box>
  ) : null
}

const WorkFeedItem = ({
  item,
  submissions,
  course,
}: {
  item: Feed
  submissions?: Map<string, Submission>
  course: Course
}) => {
  const navigation = useNavigation<TabScreenProps<'Work'>['navigation']>()
  return (
    <FeedItem
      key={item.id}
      onPress={() =>
        navigation.navigate('ItemDetail', {
          courseId: course.id as string,
          id: item.id as string,
          type: isCourseWork(item) ? 'courseWork' : 'material',
        })
      }
      _dark={{ _pressed: { bgColor: 'gray.800' } }}
    >
      <FeedItemHeader
        work
        title={item.title as string}
        type={isCourseWork(item) ? 'courseWork' : 'material'}
        creationTime={item.creationTime as string}
        updateTime={item.updateTime as string}
        dueDate={isCourseWork(item) ? createDueDate(item) : undefined}
        state={isCourseWork(item) ? submissions?.get(item.id as string)?.state : undefined}
      />
    </FeedItem>
  )
}
export default function WorkFeed({ course }: { course: Course }) {
  const [feed, setFeed] = useState<WorkFeedData[]>()
  const { data: _feed, isValidating, mutate } = useWorkFeed(course?.id as string)
  const { data: topics } = useTopics(course?.id as string)
  const { data: submissions } = useSubmissions(course?.id as string)

  useEffect(() => {
    setFeed(
      _feed
        ?.groupBy((c) => c.topicId as string | undefined)
        .sortBy(
          (v, key) => key,
          (key) => (key === undefined ? -1 : 0)
        )
        .map((data, key) => ({
          key,
          data: data.toList().toArray(),
        }))
        .toList()
        .toArray()
    )
  }, [_feed])

  return (
    <SectionList
      sections={feed ?? []}
      refreshing={isValidating}
      onRefresh={() => mutate()}
      extraData={[topics?.toList(), submissions?.toList()]}
      keyExtractor={(item: Feed) => `feed-${item.id}`}
      renderSectionHeader={({ section }) => (
        <WorkFeedSectionHeader section={section} topics={topics} />
      )}
      renderItem={({ item }) => (
        <WorkFeedItem item={item} submissions={submissions as never} course={course} />
      )}
      ItemSeparatorComponent={() => (
        <Box borderBottomWidth={1} borderColor={'gray.300'} _dark={{ borderColor: 'gray.600' }} />
      )}
      ListFooterComponent={() => <Box pb="20" />}
    />
  )
}
