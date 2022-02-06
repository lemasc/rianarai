import { VStack, HStack, Avatar } from 'native-base'
import { ColorType } from 'native-base/lib/typescript/components/types'

import { Teacher, getName } from '@rianarai/classroom'
import useColorModeValue from '../../hooks/useColorModeValue'

import Text from '../Text'
import GoogleIcon from '../icon/google'

export function GoogleBadge({ teacher }: { teacher?: Teacher }) {
  return teacher && teacher.displayName && teacher.source === 'google' ? (
    <HStack space={2} alignItems={'center'}>
      <GoogleIcon size={'4'} />
      <Text color={'gray.500'}>{teacher.name}</Text>
    </HStack>
  ) : null
}

export function TeacherInfo({ teacher, large }: { teacher: Teacher; large?: boolean }) {
  const notLinkedColor = useColorModeValue<ColorType>('red.600', 'red.500')
  return (
    <HStack space={6} alignItems={'center'}>
      <Avatar
        bgColor={'gray.300'}
        _dark={{
          bgColor: 'gray.600',
        }}
        size={`60px`}
        source={{
          uri: teacher.photoUrl,
        }}
      />
      <VStack space={'0.5'}>
        <Text
          content
          bold
          fontSize={large ? 'md' : 'sm'}
          py={large ? '0.5' : undefined}
          isTruncated
          noOfLines={1}
        >
          {getName(teacher)}
        </Text>
        <GoogleBadge teacher={teacher} />
        <Text
          content
          fontSize={large ? 'sm' : 'xs'}
          color={teacher.subject ? undefined : notLinkedColor}
        >
          {teacher.subject ? `วิชา${teacher.subject}` : `ยังไม่ได้ตั้งค่ารายวิชา`}
        </Text>
      </VStack>
    </HStack>
  )
}
