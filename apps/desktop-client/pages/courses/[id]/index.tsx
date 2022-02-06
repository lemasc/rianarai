import ViewCourseComponent from '@/components/courses/view'
import Title from '@/components/layout/title'
import { useCourses } from '@rianarai/classroom'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function CourseViewPage() {
  const { data: courses } = useCourses()
  const router = useRouter()
  useEffect(() => {
    if (!router.query.id) {
      router.replace('/courses')
    }
  }, [router])
  const course = courses?.get(router.query.id as string)
  return (
    <>
      <Title>
        <div className="flex flex-col gap-1">
          <h2 className="text-gray-900">{course ? course.name : 'รายละเอียดรายวิชา'}</h2>
          {course && (course.section || course.description) && (
            <span className="text-lg font-light">{course.section || course.description}</span>
          )}
        </div>
      </Title>
      <ViewCourseComponent course={course} />
    </>
  )
}
