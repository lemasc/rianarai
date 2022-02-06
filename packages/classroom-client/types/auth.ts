export type Provider = 'facebook.com' | 'google.com' | 'password'

export interface UserMetadata {
  upgrade?: 'v2' | 'v2.2' | 'v2.3'
  class: number | string
  room?: number | string
  name: string
  displayName: string
  email: string
  provider: Provider[]
  announceId?: string[]
  insider?: boolean
  insiderAt?: Date | any
}

export type FirebaseResult = {
  success: boolean
}

export enum GoogleScopes {
  OPENID = 'openid',
  PROFILE = 'profile',
  EMAIL = 'email',
  CONTACTS = 'https://www.googleapis.com/auth/contacts.readonly',
  CLASSROOM_COURSES = 'https://www.googleapis.com/auth/classroom.courses.readonly',
  CLASSROOM_ROASTERS = 'https://www.googleapis.com/auth/classroom.rosters.readonly',
  CLASSROOM_PHOTOS = 'https://www.googleapis.com/auth/classroom.profile.photos',
  CLASSROOM_COURSEWORK = 'https://www.googleapis.com/auth/classroom.coursework.me.readonly',
  CLASSROOM_ANNOUNCEMENTS = 'https://www.googleapis.com/auth/classroom.announcements.readonly',
  CLASSROOM_MATERIALS = 'https://www.googleapis.com/auth/classroom.courseworkmaterials.readonly',
  CLASSROOM_SUBMISSIONS = 'https://www.googleapis.com/auth/classroom.student-submissions.me.readonly',
  CLASSROOM_TOPICS = 'https://www.googleapis.com/auth/classroom.topics.readonly'
}
