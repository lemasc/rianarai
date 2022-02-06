import {
  getName,
  useCourses,
  useCourseWork,
  useSubmissions,
  useTeachers,
} from '@rianarai/classroom'

import Card from '@/components/card'
import { ComponentProps, useEffect, useState } from 'react'
import { Course, CourseWork, Teacher } from '@rianarai/classroom'
import TeacherImage from '../teacher/image'
import { createDueDate, isWorkSubmitted } from '@rianarai/shared/work'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import Scrollbars from 'react-custom-scrollbars-2'
import Loader from 'react-loader-spinner'
dayjs.extend(weekday)

type CourseCardProps = {
  teacher: Teacher
  course: Course
  desc: string
} & Omit<ComponentProps<typeof Card>, 'className' | 'children'>

const weekdays = ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์']

function CourseCard({ teacher, title, desc, course, ...rest }: CourseCardProps) {
  const name = course.name
  const { data: courseWork } = useCourseWork(course.id)
  const { data: submissions } = useSubmissions(course.id)
  const [data, setData] = useState<Record<string, CourseWork[]>>()

  const getWeekDays = (day: string) => {
    if (dayjs().format('YYYY-MM-DD') === day) return 'วันนี้'
    return `วัน${weekdays[dayjs(day).weekday()]}`
  }
  useEffect(() => {
    if (!courseWork) return
    const d = courseWork
      .filter((c) => {
        const dueDate = createDueDate(c)
        if (dueDate) {
          return (
            dayjs().unix() <= dueDate.unix() && dueDate.subtract(7, 'days').unix() <= dayjs().unix()
          )
        }
        return false
      })
      .filter((c) => submissions && !isWorkSubmitted(submissions.get(c.id)?.state))
      .sort((a, b) => (createDueDate(a).isAfter(createDueDate(b)) ? 1 : -1))
      .toList()
      .groupBy((c) => createDueDate(c).format('YYYY-MM-DD'))
    setData(d.toJS() as never)
  }, [courseWork, submissions])
  return (
    <Card {...rest} title={name} className="flex flex-col w-full lg:w-card">
      <div className="flex flex-row p-4 gap-6 bg-jaffa-500 relative rounded-t-lg">
        <div className="absolute -bottom-1/3 right-4">
          <TeacherImage
            alt={name}
            teacher={teacher}
            width={60}
            height={60}
            className="h-14 w-14 sm:h-16 sm:w-16"
          />
        </div>
        <div className="flex-col sarabun-font flex gap-2 text-white truncate text-sm">
          <div className="flex flex-col gap-1 hover:underline" style={{ minHeight: '3rem' }}>
            <h2 className="text-lg font-bold truncate">{name}</h2>
            <span className="text-xs">{desc}</span>
          </div>
          <div>
            {course && course.alternateLink && (
              <img
                alt="Classroom"
                title="ข้อมูลจาก Google Classroom"
                className="-mt-1 mr-2 inline"
                src="/classroom.svg"
                width={20}
                height={20}
              />
            )}
            {getName(teacher)}
          </div>
        </div>
      </div>
      <div className={`border-t h-52 font-light sarabun-font text-sm${data ? '' : ' bg-gray-50'}`}>
        {data && courseWork && submissions ? (
          <Scrollbars universal>
            <div className="px-4 py-3 space-y-2">
              {Object.entries(data).map(([day, data]) => (
                <div key={day} className="leading-6">
                  <b className="text-gray-600">
                    ครบกำหนด{getWeekDays(day)}
                    {dayjs(day).weekday(1).unix() >= dayjs().unix() && 'หน้า'}
                  </b>
                  <div className="flex flex-col gap-1 py-0.5 truncate">
                    {data.map((d) => (
                      <span key={d.id} className="truncate">
                        {d.title}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Scrollbars>
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-gray-100">
            <Loader width={50} color="#f28131" type="TailSpin" />
          </div>
        )}
      </div>
    </Card>
  )
}
export default function CourseList() {
  const { data: courses } = useCourses()
  const { data: teachers } = useTeachers()
  return (
    <>
      <span className="font-light">แสดงผลข้อมูลรายวิชา {courses ? courses.size : 0} รายการ</span>
      <div className="flex flex-row flex-wrap gap-6">
        {courses &&
          courses
            .toList()
            .sortBy((c) => c.name)
            .map((c) => (
              <CourseCard
                teacher={teachers?.get(c.ownerId)}
                course={c}
                title={c.name}
                desc={c.section ?? c.description}
                key={c.id}
                href={`/courses/${c.id}`}
              />
            ))}
      </div>
    </>
  )
}
