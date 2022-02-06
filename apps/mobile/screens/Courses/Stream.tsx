import { TabScreenProps } from '../../navigation/types'
import { useCourses, useTeachers } from '@rianarai/classroom'
import StreamFeed from '../../components/courses/stream/feed'
import Container from '../../components/layout/container'

export default function CourseStreamScreen({ route }: TabScreenProps<'Stream'>) {
  const { data: courses } = useCourses()
  const course = courses?.get(route.params.courseId)
  const { data: teachers } = useTeachers()
  const teacher = teachers?.get(course?.ownerId as string)
  return (
    <Container fullscreen>
      {course && teacher && <StreamFeed course={course} teacher={teacher} />}
    </Container>
  )
}
