import { useTeachers } from '@rianarai/classroom'
import { Course } from '@rianarai/classroom'

import { Tab, Tabs, TabList } from 'react-tabs'
import StreamTab from './stream'
import WorkTab from './work'
import { ViewContextProvider, ViewModalState } from './viewContext'
import { useState } from 'react'
import ModalComponent from '../modal'
import MaterialDetail from './detail/material'
import CourseWorkDetail from './detail/courseWork'

export default function ViewCourseComponent({ course }: { course?: Course }) {
  const [contentModal, setContentModal] = useState<ViewModalState>({
    show: false,
  })
  const { data: teachers } = useTeachers()

  const teacher = teachers?.get(course?.ownerId)

  return (
    <ViewContextProvider
      value={{
        course,
        teacher,
        contentModal,
        setContentModal,
      }}
    >
      <Tabs>
        <TabList>
          <Tab>สตรีม</Tab>
          <Tab>งานของชั้นเรียน</Tab>
        </TabList>
        <StreamTab />
        <WorkTab />
        <ModalComponent
          closable={true}
          title="รายละเอียด"
          show={contentModal.show}
          size="max-w-2xl"
          onClose={() => setContentModal((state) => ({ ...state, show: false }))}
        >
          {contentModal.type === 'courseWork' ? <CourseWorkDetail /> : <MaterialDetail />}
        </ModalComponent>
      </Tabs>
    </ViewContextProvider>
  )
}
