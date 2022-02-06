import { useEffect, useState } from 'react'
import { VStack, Box } from 'native-base'
import { useAnimationState, MotiView } from 'moti'
import { State, TimeSlotsMemory } from '@rianarai/classroom/types/meeting'
import { useTimeslot } from '@rianarai/ui-shared/context/timeslot'

import { MeetingInfo, MeetingPending } from './info'
import Text from '../Text'

interface MemoryQueue {
  slots: TimeSlotsMemory
  state: State
}

export default function Timeslot() {
  const { slots, state: cState, nextSlot } = useTimeslot()
  const [nextPage, setNextPage] = useState(false)
  const [memory, _setMemory] = useState<TimeSlotsMemory>({ active: null, next: null })
  const [memoryQueue, setQueue] = useState<MemoryQueue | null>(null)
  const [state, setState] = useState<State>('')

  const animation = useAnimationState({
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  })

  // Appear
  useEffect(() => {
    animation.transitionTo('enter')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Transition on data changes
  useEffect(() => {
    const shallowCompare =
      slots.active === memory.active && slots.next === memory.next && cState === state
    if (shallowCompare || memoryQueue !== null) return
    setQueue({ slots, state: cState })
    setNextPage(false)
    animation.transitionTo('exit')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slots, memory, cState, state, memoryQueue])

  /*
  let message = ''
  switch (state) {
    case 'start':
      message = 'ทำสมาธิ หายใจเข้าลึก ๆ'
      break
    case 'break':
      message = 'พักผ่อนให้เรียบร้อย เตรียมตัวเรียนต่อนะ'
      break
    case 'end':
      message = 'หมดวันแล้ว วันนี้เก่งมาก!'
      break
  }
  */

  return (
    <MotiView
      state={animation}
      onDidAnimate={(property, finished) => {
        if (animation.current === 'exit' && finished) {
          if (memoryQueue) {
            setState(memoryQueue.state)
            _setMemory(memoryQueue.slots)
            setQueue(null)
            animation.transitionTo('enter')
          }
        }
      }}
    >
      {state === '' ? (
        <VStack px="4" py="12" space={4} alignItems="center">
          <Text fontSize={'2xl'} color="blue.600" fontWeight={'semibold'}>
            กำลังโหลด...
          </Text>
        </VStack>
      ) : (
        <VStack px="4" py="6" space={{ base: 4, md: 6 }} alignItems="center">
          <Text fontWeight="semibold">รายวิชาปัจจุบัน</Text>
          <MeetingInfo
            slot={nextPage ? memory.next : memory.active}
            disabled={nextPage && !nextSlot}
          />
          {!memory.active && (
            <>
              <Text fontSize={'2xl'} color="green.600" fontWeight={'semibold'} mb="4">
                ไม่มีคาบเรียนในตอนนี้
              </Text>
            </>
          )}
          {memory.next && (
            <>
              <Box borderWidth={0.5} w="full" borderColor="gray.300" mb="4" />
              <Text fontSize={'xs'} w="full" textAlign="center">
                {nextPage ? 'รายวิชาปัจจุบัน' : 'รายวิชาต่อไป'} -{' '}
                <MeetingPending slot={nextPage ? memory.active : memory.next} />
              </Text>
            </>
          )}
        </VStack>
      )}
    </MotiView>
  )
}
