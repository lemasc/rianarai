import Title from '@/components/layout/title'
import TeacherList from '@/components/teacher/list'

function TeachersPage(): JSX.Element {
  return (
    <>
      <Title>
        <h2>ครูผู้สอน</h2>
      </Title>
      <TeacherList />
    </>
  )
}

export default TeachersPage
