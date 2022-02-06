import { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import PaginationComponent from '../layout/pagination'
import { MeetingInfo, MeetingPending } from './info'
import { State, TimeSlotsMemory } from '@rianarai/classroom/types/meeting'
import { useTimeslot } from '@rianarai/ui-shared/context/timeslot'

interface MemoryQueue {
  slots: TimeSlotsMemory
  state: State
}

export default function TimeSlotsComponent(): JSX.Element {
  const { slots, state: cState, nextSlot } = useTimeslot()
  const [nextPage, setNextPage] = useState(false)
  const [memory, _setMemory] = useState<TimeSlotsMemory>({ active: null, next: null })
  const [memoryQueue, setQueue] = useState<MemoryQueue>(null)
  const [show, setShow] = useState(true)
  const [state, setState] = useState<State>('')

  useEffect(() => {
    if (
      (slots.active === memory.active && slots.next === memory.next && cState === state) ||
      memoryQueue !== null
    )
      return
    setQueue({ slots, state: cState })
    setNextPage(false)
    setShow(false)
  }, [slots, memory, cState, state, memoryQueue])

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

  return (
    <Transition
      show={show}
      appear={true}
      className="flex flex-1 flex-col justify-center items-center text-center"
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      beforeEnter={() => {
        if (memoryQueue) {
          setState(memoryQueue.state)
          _setMemory(memoryQueue.slots)
          setQueue(null)
        }
      }}
      afterLeave={() => setShow(true)}
    >
      {state == '' ? (
        <div className="flex flex-col px-4">
          <h3 className="text-2xl p-4 text-blue-600 font-medium px-8">กำลังโหลด...</h3>
        </div>
      ) : (
        <>
          <PaginationComponent
            className="w-56"
            index={nextPage ? 1 : 0}
            onChange={(index) => setNextPage(index == 1 ? true : false)}
            name={nextPage ? 'รายวิชาต่อไป' : 'รายวิชาปัจจุบัน'}
            showIcons={!!memory.next && state === 'active'}
            length={2}
          />
          <MeetingInfo
            slot={nextPage ? memory.next : memory.active}
            disabled={nextPage && !nextSlot}
          />
          {!memory.active && (
            <>
              <div className="text-2xl p-8 text-green-600 font-medium">ไม่มีคาบเรียนในตอนนี้</div>
              <span className="text-sm font-light creative-font px-4 py-1">{message}</span>
            </>
          )}
          {memory.next && (
            <span className="text-center mt-4 text-sm border-t-2 border-gray-300 w-full pt-4 font-light px-4">
              {nextPage ? 'รายวิชาปัจจุบัน' : 'รายวิชาต่อไป'} -{' '}
              <MeetingPending slot={nextPage ? memory.active : memory.next} />
            </span>
          )}
        </>
      )}
    </Transition>
  )
}
