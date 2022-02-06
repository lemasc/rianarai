import { RootStackScreenProps } from '../../../navigation/types'
import { CourseWorkDetail, MaterialDetail } from '../../../components/courses/modal'
import Container from '../../../components/layout/container'

export default function ItemDetailScreen({ route }: RootStackScreenProps<'ItemDetail'>) {
  const Detail = route.params.type === 'courseWork' ? CourseWorkDetail : MaterialDetail
  return (
    <Container fullscreen>
      <Detail />
    </Container>
  )
}
