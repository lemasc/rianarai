import { useState } from 'react'
import { VStack, Box, Button, IButtonProps } from 'native-base'

import { RootStackScreenProps } from '../../navigation/types'
import { useTeachers } from '@rianarai/classroom'
import Text from '../../components/Text'
import Container from '../../components/layout/container'
import { TeacherInfo } from '../../components/teachers'
import { BaseProps, TeacherDetail, TeacherLinkAccount } from '../../components/teachers/detail'

type TeacherStatus = 'assigned' | 'notAssigned'

export default function TeacherDetailScreen({ route }: RootStackScreenProps<'TeacherDetail'>) {
  const { data: teachers } = useTeachers()
  const [process, setProcess] = useState(false)

  const notAssigned = teachers
    ?.filter((c) => c.source !== 'google' && c.meetings !== undefined)
    .sortBy((c) => c.subject)
    .toList()
    .toArray()

  const teacher = teachers?.get(route.params.teacherId)

  const status: TeacherStatus | undefined = teacher
    ? teacher?.meetings !== undefined
      ? 'assigned'
      : 'notAssigned'
    : undefined

  /**
   * We have two conditional components which renders based on the teacher's linking status.
   * NativeBase Button doesn't unmounted properly after pressed, resulting in memory leak.
   *
   * The current workaround is to have base `buttonProps` which will be controlled by the `status` variable.
   * When the button is pressed, it will `setProcess` to true, triggering the component's action.
   *
   * These components will listen for the `process` prop to perform any actions.
   * It will `setProcess` back to false when finished and update the view if neccessary.
   *
   * They will also have a `mounted` ref, because the data can be updated before we `setProcess` back.
   * If it's just the first time our component mounts, we don't do anything.
   */
  const buttonProps: Record<TeacherStatus, IButtonProps> = {
    assigned: {
      bgColor: 'red.500',
      _pressed: { bgColor: 'red.600' },
      children: (
        <Text color="white" fontWeight={'semibold'}>
          ยกเลิกการเชื่อมต่อบัญชี Google
        </Text>
      ),
    },
    notAssigned: {
      bgColor: 'green.500',
      _pressed: { bgColor: 'green.600' },
      children: (
        <Text color="white" fontWeight={'semibold'}>
          เชื่อมต่อบัญชี Google
        </Text>
      ),
    },
  }

  const detailProps: BaseProps = {
    teacher,
    process,
    setProcess,
  }

  return (
    <Container>
      {teacher && status && (
        <VStack px="2" space={4}>
          <Box
            p="4"
            bg="white"
            _dark={{ bgColor: 'gray.900', borderColor: 'gray.700' }}
            rounded="lg"
            borderColor={'gray.200'}
            borderWidth={1}
          >
            <TeacherInfo large teacher={teacher} />
          </Box>
          {status === 'assigned' ? (
            <TeacherDetail {...detailProps} />
          ) : (
            <TeacherLinkAccount notAssigned={notAssigned ?? []} {...detailProps} />
          )}
          {teacher.source === 'google' && (
            <Button
              {...buttonProps[status]}
              w="full"
              rounded="lg"
              py="3"
              isLoading={process}
              onPress={() => setProcess(true)}
            />
          )}
        </VStack>
      )}
    </Container>
  )
}
