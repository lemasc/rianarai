import { Course, Teacher } from '@rianarai/classroom'
import { createContext, useContext } from 'react'

export type ViewModalState = {
  id?: string
  type?: 'courseWork' | 'material'
  show: boolean
}

interface ViewContext {
  teacher?: Teacher
  course?: Course
  contentModal: ViewModalState
  setContentModal: (state: ViewModalState) => void
}

const viewContext = createContext<ViewContext | undefined>(undefined)

export const ViewContextProvider = viewContext.Provider

export const useCourseView = (): ViewContext => {
  const ctx = useContext(viewContext)
  if (!ctx) throw new Error('Attempt to use outside of context: viewContext')
  return ctx
}
