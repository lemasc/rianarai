import { TabPanel, TabPanelProps } from 'react-tabs'
import { WithSideBar } from '../sidebar'
import Feed from './feed'

/*
 <SideBar>
          <SideBarWidget>
            <h3 className="font-medium">งานทั้งหมด</h3>
            <TeacherImage className="my-2" teacher={teacher} width={60} height={60} />
            <div className="flex flex-col gap-1 items-center justify-center sarabun-font">
              <WidgetText className="font-bold" value={teacher?.displayName} multiple={1.5} />
              <WidgetText show={teacher !== undefined} multiple={2}>
                <GoogleBadge teacher={teacher} />
              </WidgetText>
              <WidgetText value={teacher && `วิชา${teacher?.subject}`} multiple={3} />
              <button className="kanit-font zoom-btn">เข้าสู่ห้องเรียน</button>
            </div>
          </SideBarWidget>
        </SideBar>
        */
export default function WorkTab(props: Omit<TabPanelProps, 'ref'>) {
  return (
    <TabPanel {...props}>
      <WithSideBar>
        <div className="flex flex-col gap-6 flex-grow xl:mx-16">
          <Feed />
        </div>
      </WithSideBar>
    </TabPanel>
  )
}

WorkTab.tabsRole = 'TabPanel'
