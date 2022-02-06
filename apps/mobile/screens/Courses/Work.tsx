import { TabScreenProps } from '../../navigation/types'
import { useCourses } from '@rianarai/classroom'
import WorkFeed from '../../components/courses/work/feed'
import Container from '../../components/layout/container'

export default function CourseWorkScreen({ route }: TabScreenProps<'Stream'>) {
  const { data: courses } = useCourses()
  const course = courses?.get(route.params.courseId)
  return <Container fullscreen>{course && <WorkFeed course={course} />}</Container>
}
