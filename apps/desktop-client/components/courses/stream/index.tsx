import { TabPanel, TabPanelProps } from 'react-tabs'
import Link from 'next/link'
import TeacherImage from '@/components/teacher/image'
import GoogleBadge from '@/components/teacher/google'
import { WithSideBar, SideBar, SideBarWidget, WidgetText } from '../sidebar'
import Feed from './feed'
import { useCourseView } from '../viewContext'
import launchMeeting from '@rianarai/shared/meeting'

export default function StreamTab(props: Omit<TabPanelProps, 'ref'>) {
  const { teacher } = useCourseView()
  return (
    <TabPanel {...props}>
      <WithSideBar>
        <SideBar>
          <SideBarWidget>
            <h3 className="font-medium">ข้อมูลผู้สอน</h3>
            <TeacherImage className="my-2" teacher={teacher} width={60} height={60} />
            <div className="flex flex-col gap-1 items-center justify-center sarabun-font">
              <WidgetText
                className="font-bold"
                value={teacher?.displayName ?? teacher?.name}
                multiple={1.5}
              />
              <WidgetText show={teacher !== undefined} multiple={2}>
                <GoogleBadge />
              </WidgetText>
              <WidgetText
                show={teacher !== undefined}
                value={
                  teacher && teacher.subject ? `วิชา${teacher?.subject}` : 'ยังไม่ได้ตั้งค่ารายวิชา'
                }
                multiple={3}
              />
              {teacher &&
                (teacher.meetings ? (
                  <button
                    className="btn rounded-lg kanit-font text-sm bg-zoom-500 from-zoom-600 to-zoom-600 ring-zoom-500 text-white my-2 px-10 font-base py-3"
                    onClick={() => launchMeeting(teacher.meetings)}
                  >
                    เข้าสู่ห้องเรียน
                  </button>
                ) : (
                  <Link href="/teachers">
                    <a className="btn rounded-lg kanit-font text-sm bg-red-500 from-red-600 to-red-600 ring-red-500 text-white my-2 px-10 font-base py-3">
                      ตั้งค่าครูผู้สอน
                    </a>
                  </Link>
                ))}
            </div>
          </SideBarWidget>
        </SideBar>
        <div className="flex flex-col gap-6 flex-grow">
          <Feed />
        </div>
      </WithSideBar>
    </TabPanel>
  )
}

StreamTab.tabsRole = 'TabPanel'
