import { useCourseWork, useSubmissions } from '@rianarai/classroom'
import { useCourseView } from '../viewContext'
import DetailModal from './modal'

export default function CourseWorkDetail() {
  const { course, contentModal } = useCourseView()
  const { data } = useCourseWork(contentModal.id && course.id, contentModal.id)
  const { data: submissions } = useSubmissions(contentModal.id && course.id, contentModal.id)
  const courseWork = data?.get(contentModal.id)

  const submission = submissions?.get(contentModal.id)

  if (!contentModal.id || !course) return null
  return <DetailModal data={courseWork} submission={submission} type="งาน" />
}
