import Title from '@/components/layout/title'
import CourseList from '@/components/courses/list'

function TeachersPage(): JSX.Element {
  return (
    <>
      <Title>
        <h2>รายวิชา</h2>
      </Title>
      <CourseList />
    </>
  )
}

export default TeachersPage
