import { FlatList } from 'native-base'

import { useTeachers, Teacher } from '@rianarai/classroom'
import { RootStackScreenProps } from '../../navigation/types'
import Container from '../../components/layout/container'
import { TeacherInfo } from '../../components/teachers'
import PressableItem from '../../components/PressableItem'

export default function TeachersScreen({ navigation }: RootStackScreenProps<'Teachers'>) {
  const { data: teachers, isValidating, mutate } = useTeachers()
  return (
    <Container fullscreen>
      <FlatList
        refreshing={isValidating || teachers === undefined}
        onRefresh={() => {
          mutate()
        }}
        data={teachers ? teachers.toList().toArray() : undefined}
        renderItem={({ item }) => {
          const teacher: Teacher = item
          return (
            <PressableItem
              onPress={() =>
                navigation.navigate('TeacherDetail', {
                  teacherId: teacher.id,
                })
              }
            >
              <TeacherInfo teacher={teacher} />
            </PressableItem>
          )
        }}
        keyExtractor={(item: Teacher) => item.id}
      />
    </Container>
  )
}
