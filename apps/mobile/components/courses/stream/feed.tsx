import { Box, FlatList, VStack } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { Course, isAnnouncement, isCourseWork, Teacher } from '@rianarai/classroom'
import { TabScreenProps } from '../../../navigation/types'
import { StreamFeed as Feed } from '@rianarai/classroom/types/feed'
import { useStreamFeed } from '@rianarai/classroom/hooks/feed'

import { FeedItem, FeedItemHeader } from '../feedItem'
import Attachments from '../attachments'
import Text from '../../Text'
import Markdown from '../../Markdown'

function StreamFeedItem({
  item,
  course,
  teacher,
}: {
  item: Feed
  course: Course
  teacher: Teacher
}) {
  const navigation = useNavigation<TabScreenProps<'Stream'>['navigation']>()
  return isAnnouncement(item) ? (
    <FeedItem
      rounded={'lg'}
      borderWidth={'1'}
      borderColor={'gray.300'}
      _dark={{
        borderColor: 'gray.600',
        bgColor: 'gray.900',
      }}
    >
      <FeedItemHeader
        type="announcement"
        creationTime={item.creationTime as string}
        updateTime={item.updateTime as string}
        photoUrl={item.creatorUserId === course.ownerId ? teacher?.photoUrl : item?.photoUrl}
      />
      <Markdown>{item.text as string}</Markdown>
      {item.materials && <Attachments attachments={item.materials} />}
    </FeedItem>
  ) : (
    <FeedItem
      rounded={'lg'}
      borderWidth={'1'}
      borderColor={'gray.300'}
      _dark={{
        bgColor: 'gray.900',
        borderColor: 'gray.600',
        _pressed: {
          bgColor: 'gray.800',
        },
      }}
      key={item.id}
      onPress={() =>
        navigation.navigate('ItemDetail', {
          courseId: course.id as string,
          id: item.id as string,
          type: isCourseWork(item) ? 'courseWork' : 'material',
        })
      }
    >
      <FeedItemHeader
        title={item.title as string}
        type={isCourseWork(item) ? 'courseWork' : 'material'}
        creationTime={item.creationTime as string}
        updateTime={item.updateTime as string}
      />
    </FeedItem>
  )
}

export default function StreamFeed({ course, teacher }: { course: Course; teacher: Teacher }) {
  const { data: feed, isValidating, mutate } = useStreamFeed(course.id as string)
  return (
    <FlatList
      px="4"
      py="6"
      ListHeaderComponent={() => (
        <VStack
          h="32"
          bg={{
            linearGradient: {
              colors: ['jaffa.500', 'jaffa.600'],
              start: [0, 0],
              end: [0, 1],
            },
          }}
          p="4"
          mb="6"
          rounded="md"
          w="full"
          justifyContent={'flex-end'}
        >
          <Text color="white" content bold fontSize="lg" lineHeight={'xl'}>
            {course ? course.name : 'รายละเอียดวิชา'}{' '}
          </Text>
          {course && (course.section || course.description) && (
            <Text color="gray.100" fontSize="sm">
              {course.section || course.description}
            </Text>
          )}
        </VStack>
      )}
      ListFooterComponent={() => <Box pb="20" />}
      ItemSeparatorComponent={() => <Box pb="6" />}
      refreshing={isValidating}
      onRefresh={() => mutate()}
      data={feed?.toArray()}
      extraData={teacher}
      keyExtractor={(feed: Feed) => feed.id as string}
      renderItem={({ item }) => (
        <StreamFeedItem key={`feed_${item.id}`} item={item} course={course} teacher={teacher} />
      )}
    />
  )
}
