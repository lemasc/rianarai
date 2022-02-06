import { useState, useEffect } from 'react'
import { Dimensions } from 'react-native'
import { VStack, FlatList, Avatar, Pressable, HStack, Box } from 'native-base'

import { DrawerScreenProps } from '../../navigation/types'
import { Course, Teacher, getName, useCourses, useTeachers } from '@rianarai/classroom'
import Text from '../../components/Text'
import ClassroomIcon from '../../components/icon/classroom'
import Container from '../../components/layout/container'

const ITEM_WIDTH = 400
function CourseItem({
  isGridView,
  course,
  teacher,
  onPress,
}: {
  isGridView: boolean
  course: Course
  teacher?: Teacher
  onPress: () => void
}) {
  return (
    <Pressable onPress={onPress}>
      <VStack
        borderWidth={'1'}
        rounded={10}
        borderColor={'gray.300'}
        _dark={{ borderColor: 'gray.600' }}
        display={'flex'}
        m="4"
        width={isGridView ? ITEM_WIDTH : undefined}
      >
        <VStack p="4" roundedTop={'lg'} space="1" bg="jaffa.500" w="full">
          <Text color="white" content bold fontSize="lg" py="1.5" isTruncated noOfLines={1}>
            {course.name}
          </Text>
          <Text color="white" content>
            {course.section}
          </Text>
          {course && course.alternateLink ? (
            <HStack alignItems="center" space={2}>
              <ClassroomIcon width={18} height={18} />
              <Text color="white" fontSize="xs" content>
                {getName(teacher)}
              </Text>
            </HStack>
          ) : (
            <Text color="white" fontSize="xs"></Text>
          )}
        </VStack>
        <VStack
          h="56"
          bg="white"
          _dark={{ bgColor: 'gray.800', borderColor: 'gray.600' }}
          borderColor={'gray.300'}
          borderTopWidth={'1'}
          roundedBottom={'lg'}
          w="full"
        ></VStack>
        <Avatar
          position={'absolute'}
          top="20"
          right="4"
          size="72px"
          _dark={{
            bgColor: 'gray.800',
          }}
          source={
            teacher && teacher.photoUrl
              ? {
                  uri: teacher.photoUrl,
                }
              : undefined
          }
        />
      </VStack>
    </Pressable>
  )
}

export default function CoursesPage({ navigation }: DrawerScreenProps<'Courses'>) {
  const [columns, setColumns] = useState<number | undefined>()
  const courses = useCourses()
  const teachers = useTeachers()
  const isGridView = columns !== undefined && columns !== 1
  useEffect(() => {
    const listener = () => {
      const { width } = Dimensions.get('window')
      const columns = Math.max(Math.floor(width / (ITEM_WIDTH + 32)), 1)
      setColumns(columns)
    }
    Dimensions.addEventListener('change', listener)
    listener()
    return () => Dimensions.removeEventListener('change', listener)
  }, [])
  return (
    <Container fullscreen>
      <Box py="2" flex={1} alignItems={'center'} justifyContent={'center'}>
        <FlatList
          onRefresh={() => {
            teachers.mutate().then(() => courses.mutate())
          }}
          w="full"
          contentContainerStyle={{ alignItems: isGridView ? 'center' : 'stretch' }}
          numColumns={columns}
          key={`courses${columns}`}
          refreshing={columns === undefined || courses.isValidating || teachers.isValidating}
          data={columns && courses.data ? courses.data.toList().toArray() : undefined}
          extraData={[teachers.data?.toList(), courses.data?.toList()]}
          keyExtractor={(item: Course) => item.id as string}
          ListFooterComponent={() => <VStack py="10" />}
          renderItem={({ item, index }) => {
            const emptyItems = () => {
              if (!courses.data || !(columns && columns > 1)) return 0
              return index === courses.data.size - 1 ? columns - (courses.data.size % columns) : 0
            }
            return (
              <>
                <CourseItem
                  isGridView={isGridView}
                  course={item}
                  teacher={teachers.data?.get(item.ownerId as string)}
                  onPress={() =>
                    navigation.navigate('CourseDetail', {
                      screen: 'Stream',
                      params: {
                        courseId: item.id as string,
                      },
                    })
                  }
                />
                {Array.from(new Array(emptyItems()).keys()).map((i) => (
                  <Box key={i} width={ITEM_WIDTH} m="4" />
                ))}
              </>
            )
          }}
        />
      </Box>
    </Container>
  )
}
