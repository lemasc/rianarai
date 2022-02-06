import { ScrollView, useToast } from 'native-base'
import { MetadataComponent } from '../../components/auth'
import Container from '../../components/layout/container'

export default function ProfileSettingsScreen() {
  const toast = useToast()
  const id = 'profileEdit'

  return (
    <Container fullscreen>
      <ScrollView>
        <MetadataComponent
          onSubmit={() => {
            if (!toast.isActive(id)) {
              toast.show({
                id,
                status: 'success',
                title: 'บันทึกข้อมูลเรียบร้อยแล้ว',
                mx: 8,
                maxW: 'sm',
              })
            }
          }}
        />
      </ScrollView>
    </Container>
  )
}
