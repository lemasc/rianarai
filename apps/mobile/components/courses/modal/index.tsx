import { useRoute } from '@react-navigation/native'
import { useMaterials, useCourseWork, useSubmissions } from '@rianarai/classroom'
import { RootStackScreenProps } from '../../../navigation/types'
import DetailModal from './detail'

export function CourseWorkDetail() {
  const { params } = useRoute<RootStackScreenProps<'ItemDetail'>['route']>()
  const { data } = useCourseWork(params.courseId, params.id)
  const { data: submissions } = useSubmissions(params.courseId, params.id)
  const courseWork = data?.get(params.id)
  const submission = submissions?.get(params.id)

  return <DetailModal data={courseWork} submission={submission} type="งาน" />
}

export function MaterialDetail() {
  const { params } = useRoute<RootStackScreenProps<'ItemDetail'>['route']>()
  const { data } = useMaterials(params.courseId, params.id)
  const material = data?.get(params.id)

  return <DetailModal data={material} type="เนื้อหา" />
}
