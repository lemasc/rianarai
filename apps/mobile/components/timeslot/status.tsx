import { Pressable, VStack } from 'native-base'

import { Meeting, Teacher } from '@rianarai/classroom'
import launchMeeting from '@rianarai/shared/meeting'
import Text from '../Text'

interface MeetingJoinProps {
  teachers: Teacher[]
  disabled: boolean
}

export const MeetingJoin: React.FC<MeetingJoinProps> = ({ teachers, disabled }) => {
  return (
    <VStack space={3}>
      {teachers.map((meeting, index) => (
        <Pressable
          _hover={{ bgColor: 'blue.600' }}
          _pressed={{ bgColor: 'blue.600' }}
          disabled={disabled}
          key={index}
          rounded="lg"
          bgColor="blue.500"
          px="16"
          py="3"
          onPress={() => {
            launchMeeting(meeting.meetings as Meeting)
          }}
        >
          <Text
            /*  title={
            disabled
              ? 'สามารถเข้าสู่ห้องเรียนก่อนเวลาได้ 10 นาที'
              : 'เข้าสู่ห้องเรียน จำเป็นต้องมี Zoom ติดตั้งลงในอุปกรณ์แล้ว'
          }*/
            color={'white'}
            fontFamily="Roboto-400"
          >
            {disabled ? 'Not In Time' : 'Launch Meetings'}
            {teachers.length !== 1 && ' : ' + meeting.name}
          </Text>
        </Pressable>
      ))}
    </VStack>
  )
}
