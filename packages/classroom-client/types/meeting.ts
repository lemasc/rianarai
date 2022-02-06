export interface TimeSlotsMemory {
  active: TimeSlots | null
  next: TimeSlots | null
}
export type State = 'active' | 'start' | 'break' | 'end' | ''

export interface TimeSlots {
  start: string
  end: string
  teacher: string[]
  code: string[]
  id?: string[]
}

export interface LegacyMeeting {
  id: string
  code?: string
  meeting: string
  name: string
  subject: string
  url?: string
  meet?: boolean
  userId?: string[]
}
