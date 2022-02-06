import Title from '@/components/layout/title'
import TimetableComponent from '@/components/timetable'

export default function TimetablePage(): JSX.Element {
  return (
    <>
      <Title>
        <h2>ตารางสอน</h2>
      </Title>
      <div className="bg-gray-100 dark:bg-gray-800 sm:px-8 pt-4 md:pb-4 rounded">
        <TimetableComponent />
      </div>
    </>
  )
}
