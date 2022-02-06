import { useState, useEffect, ReactNode } from 'react'
import { VStack, Stack, Box } from 'native-base'

import { TimeSlots } from '@rianarai/classroom/types/meeting'
import { Teacher, useTeachers } from '@rianarai/classroom'

import { MeetingJoin } from './status'
import Text from '../Text'

interface MeetingInfoProps {
  slot: TimeSlots | null
  disabled: boolean
}

export function GenerateTeacherName(teacher: string[]): ReactNode[] {
  function getPrefix(t: string): string {
    if (t.match(/^[a-zA-Z0-9]*$/g)) return 'T.'
    if (t.indexOf('.') === -1) return 'อ.'
    return ''
  }
  return teacher.map((t, i) => (
    <Text key={i}>
      {i !== 0 && ' | '}
      {getPrefix(t)}
      {t}
    </Text>
  ))
}

export function MeetingPending({ slot }: { slot: TimeSlots | null }) {
  if (!slot) return null
  return (
    <>
      {slot.code.join(' , ')} ({GenerateTeacherName(slot.teacher)}) : {slot.start} น.
    </>
  )
}

export function MeetingInfo({ slot, disabled }: MeetingInfoProps) {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const { data } = useTeachers()

  useEffect(() => {
    if (!data || !slot) return
    setTeachers(
      data
        .filter((t) => {
          const name = t.displayName ?? t.name
          return name && slot.teacher.includes(name)
        })
        .toList()
        .toArray()
    )
  }, [data, slot])

  if (!slot) return null
  return (
    <Stack
      direction={{
        base: 'column',
        md: 'row',
      }}
      alignItems="center"
      justifyContent={'flex-start'}
      space={{ base: 6, md: 12 }}
      mb="2"
    >
      <VStack space={3} alignItems="center" px="6">
        <Text
          isTruncated
          noOfLines={2}
          textAlign="center"
          fontSize="2xl"
          fontWeight="semibold"
          color="blue.500"
        >
          {teachers.length > 0 &&
            slot.code[0].match(/([0-9]){4}\w/g) !== null &&
            teachers[0].subject + ' : '}
          {slot.code.length !== 1 && '\n'}
          {slot.code.join(' , ')}
        </Text>
        {slot.teacher.length > 0 && (
          <Text fontWeight="semibold" color="blue.500">
            สอนโดย {GenerateTeacherName(slot.teacher)}
          </Text>
        )}
        <Text>
          {slot.start} น. - {slot.end} น.
        </Text>
      </VStack>
      {teachers.length === 0 || teachers[0].meetings?.type === 'meet' ? (
        <Text color="red.600" py="0" my="0" fontWeight={'semibold'}>
          ไม่พบข้อมูลผู้สอนในรายวิชานี้
        </Text>
      ) : (
        <Box alignItems="center" px="6">
          <MeetingJoin teachers={teachers} disabled={disabled} />
        </Box>
      )}
    </Stack>
  )
}
