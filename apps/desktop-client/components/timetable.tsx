import dayjs from 'dayjs'
import { ReactNodeArray, useState } from 'react'
import { GenerateTeacherName } from './timeslots/info'
import { useWindowWidth } from '@react-hook/window-size/throttled'

import { TimeSlots } from '@rianarai/classroom/types/meeting'
import PaginationComponent from './layout/pagination'
import { useSchedule } from '@rianarai/classroom'

type dataTimeSlots = {
  start: string[]
  end: string[]
}
const timetable: dataTimeSlots = {
  start: [
    '08:30',
    '09:20',
    '10:10',
    '10:30',
    '11:20',
    '12:10',
    '13:00',
    '13:50',
    '14:40',
    '15:30',
    '16:20',
  ],
  end: [
    '09:20',
    '10:10',
    '10:30',
    '11:20',
    '12:10',
    '13:00',
    '13:50',
    '14:40',
    '15:30',
    '16:20',
    '17:10',
  ],
}

function TimeSlotsData({ data }: { data: TimeSlots }): JSX.Element {
  return (
    <>
      <span className="text-lg py-2 font-bold sarabun-font">{data.code.join(',')}</span>
      {data.teacher.length !== 0 && (
        <div className="flex flex-row space-x-1 justify-center w-full">
          {GenerateTeacherName(data.teacher)}
        </div>
      )}
    </>
  )
}

export default function TimetableComponent(): JSX.Element {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const daysTH = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์']
  const [curDay, setCurday] = useState<number>(dayjs().day())
  const { data } = useSchedule()
  const width = useWindowWidth()
  // BREAKPOINT Breakpoints
  const BREAKPOINT = 640
  const break10Class = 'bg-green-500 bg-opacity-40 italic'
  const breakClass = 'bg-yellow-500 bg-opacity-40 italic'
  const generatePendingSlots = (slot: TimeSlots[]): ReactNodeArray => {
    // Get index of the last end time in schedule
    const lastIndex = timetable.end.indexOf(slot[slot.length - 1].end)
    return Array(timetable.start.length - lastIndex - 1).fill(<td></td>)
  }
  const calculateColSpan = (slot: TimeSlots): number | undefined => {
    return timetable.end.indexOf(slot.end) - timetable.start.indexOf(slot.start) + 1
  }
  return (
    <div
      className={
        width > BREAKPOINT
          ? 'whitespace-nowrap block'
          : 'min-w-min flex flex-col justify-center items-center'
      }
    >
      {width < BREAKPOINT && (
        <PaginationComponent
          className="w-48"
          index={curDay}
          onChange={setCurday}
          name={daysTH[curDay]}
          showIcons={true}
          length={7}
        />
      )}

      <main className="py-4 flex items-center justify-center">
        {width < BREAKPOINT ? (
          <>
            {data && data[days[curDay]] ? (
              <>
                <table className="timetable w-full">
                  <thead className="bg-gray-50 dark:bg-black">
                    <tr>
                      <th scope="col">เวลา</th>
                      <th scope="col">คาบเรียน</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data[days[curDay]].map((d) => (
                      <>
                        <tr key={d.start}>
                          <td>
                            {d.start} - {d.end}
                          </td>
                          <td>
                            <TimeSlotsData data={d} />
                          </td>
                        </tr>
                        {d.end == '10:10' && (
                          <tr key="break10" className={break10Class}>
                            <td>10:10 - 10:30</td>
                            <td>พัก 20 นาที</td>
                          </tr>
                        )}
                        {d.end == '12:10' && (
                          <tr key="break" className={breakClass}>
                            <td>12:10 - 13:00</td>
                            <td>พักกลางวัน</td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <div className="text-lg text-red-500 p-12 font-medium">ไม่มีข้อมูลตารางเรียน</div>
            )}
          </>
        ) : (
          <table className="timetable">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="sticky -left-0.5 bg-gray-50 dark:bg-gray-900 z-20 border">วัน</th>
                {timetable.start.map((d, i) => (
                  <>
                    <th key={d}>
                      {d} - {timetable.end[i]}
                    </th>
                  </>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-light">
              {days.map((day, dayIndex) => (
                <>
                  {data && data[day] && (
                    <tr>
                      <td
                        className={
                          'sticky -left-0.5 font-medium border ' +
                          (dayIndex === curDay
                            ? 'bg-bright-sun-400 text-gray-900'
                            : 'bg-gray-50 dark:bg-gray-900')
                        }
                      >
                        {daysTH[dayIndex]}
                      </td>
                      {data[day] &&
                        data[day].map((d, i) => (
                          <>
                            <td colSpan={calculateColSpan(d)} key={d.code.toString()}>
                              <TimeSlotsData data={d} />
                            </td>
                            {day === 'monday' && (
                              <>
                                {d.end == '10:10' && (
                                  <td rowSpan={5} key="break10" className={break10Class}>
                                    พัก 20 นาที
                                  </td>
                                )}
                                {d.end == '12:10' && (
                                  <td rowSpan={5} key="break" className={breakClass}>
                                    พักกลางวัน
                                  </td>
                                )}
                                {i === data[day].length - 1 && generatePendingSlots(data[day])}
                              </>
                            )}
                          </>
                        ))}
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  )
}
