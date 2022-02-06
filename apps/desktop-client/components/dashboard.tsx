import Link from 'next/link'
import { useAuth } from '@rianarai/ui-shared/context/auth'
import TimeSlotsComponent from '@/components/timeslots'
import dayjs from 'dayjs'
import th from 'dayjs/locale/th'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import { Navigation } from './layout/menubar'
import Title from './layout/title'
import { useTimeslot } from '@rianarai/ui-shared/context/timeslot'

dayjs.extend(localizedFormat)
dayjs.extend(buddhistEra)
dayjs.locale(th)
/*
import { StatusButton } from './work/status'
import { checkDuedate, checkTurnedIn } from './work/item'
*/

/*
<div className="md:w-72 w-full gap-8 flex flex-col">
            <Link href="/timetable">
              <a
                title="ตารางสอน"
                className="items-center flex flex-row shadow-md rounded bg-apple-500 hover:bg-gradient-to-b from-apple-500 to-apple-600 text-white p-6"
              >
                <div className="flex flex-col flex-grow items-start">
                  <h4 className="py-2 text-2xl font-medium">ตารางสอน</h4>
                  <span className="py-2 text-sm sarabun-font">
                    {schedule && schedule[curDay] && schedule[curDay].length
                      ? schedule[curDay].length
                      : 0}{' '}
                    รายวิชาที่ต้องเรียนวันนี้
                  </span>
                </div>
                <BookOpenIcon className="md:h-12 md:w-12 w-10 h-10" />
              </a>
            </Link>
            <Link href="/install">
              <a
                title="ติดตั้งแอพพลิเคชั่น"
                className="items-center flex flex-row shadow-md rounded bg-purple-500 hover:bg-gradient-to-b from-purple-500 to-purple-600 text-white p-6"
              >
                <div className="flex flex-col flex-grow items-start">
                  <h4 className="py-2 text-2xl font-medium">RianArai PC</h4>
                  <span className="py-2 text-sm sarabun-font">ลงทะเบียนล่วงหน้า Early Access</span>
                </div>
                <DownloadIcon className="md:h-12 md:w-12 w-10 h-10" />
              </a>
            </Link>
          </div>
          */
export default function Dashboard(): JSX.Element {
  const { metadata } = useAuth()
  const { date } = useTimeslot()
  /*
  const [classWork, setClassWork] = useState<ClassroomCourseWorkResult[] | null>(null)
  const { classWork: work } = useClasswork()
  const { data: firestoreData } = useCollection<ClassroomCourseWorkResult>(
    user ? `users/${user.uid}/classwork` : null,
    {
      where: [
        ['dueDate', '>=', timeList[0].startTime],
        ['dueDate', '<=', timeList[0].endTime],
      ],
      listen: true,
    }
  )
  /*
  useEffect(() => {
    let _isMounted = true
    if (!_isMounted) return
    if (!work) return
    setClassWork(
      mergeFirestore([
        work.filter((d) => d.dueDate >= timeList[0].startTime && d.dueDate <= timeList[0].endTime),
        firestoreData ? firestoreData : [],
      ])
    )
    return () => {
      _isMounted = false
    }
  }, [work, firestoreData])

  useEffect(() => {
    if (
      announce &&
      !showAnnounce &&
      metadata &&
      !(metadata.upgrade && metadata.upgrade == version)
    ) {
      setTimeout(() => setAnnounce(true), 3000)
    }
  }, [announce, metadata, showAnnounce, version])*/
  /*
  function getData(status: StatusButton['status']): ClassroomCourseWorkResult[] {
    if (!classWork) return []
    const d = classWork.filter((c) => {
      if (c.tags && c.tags.includes('archived')) return false
      switch (status) {
        case 'turned-in':
          return checkTurnedIn(c.state)
        case 'not-turned-in':
          return !checkTurnedIn(c.state) && !checkDuedate(c.dueDate)
        case 'missing':
          return !checkTurnedIn(c.state) && checkDuedate(c.dueDate)
      }
    })
    return d
  }*/

  const badge: Navigation[] = [
    {
      title: 'ครูผู้สอน',
      href: '/teachers',
    },
    {
      title: 'รายวิชา',
      href: '/courses',
    },
    {
      title: 'ตารางเรียน',
      href: '/timetable',
    },
  ]
  // const percentage = classWork ? getData('turned-in').length / classWork.length : 0
  return (
    <>
      <Title>
        <span className="flex flex-col gap-3">
          <h2>สวัสดี {metadata.displayName}</h2>
          <span className="text-gray-500 sarabun-font text-sm">
            {dayjs(date).format('วันddddที่ D MMMM พ.ศ. BBBB เวลา HH:mm:ss น.')}
          </span>
        </span>
      </Title>
      <div className="flex flex-row items-center gap-4">
        <span className="hidden sm:block">จัดการข้อมูล</span>
        <div className="flex flex-row gap-4 overflow-x-auto">
          {badge.map((d) => (
            <Link key={d.href} href={d.href}>
              <a
                draggable={false}
                title={d.title}
                className="flex-shrink-0 rounded-full border px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100"
              >
                {d.title}
              </a>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex md:flex-row flex-col md:gap-8" style={{ minHeight: '15rem' }}>
        <div className="flex flex-1 flex-col flex-grow md:gap-8 gap-6">
          <div className="flex flex-grow shadow-md rounded sm:px-4 py-4 bg-gray-100">
            <TimeSlotsComponent />
          </div>
        </div>
      </div>
    </>
  )
}
