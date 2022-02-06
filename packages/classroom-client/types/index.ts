import type { classroom_v1 } from '@googleapis/classroom'

export type WithTimestamp<T extends Record<string, unknown>> = T & {
  createdAt: string
  updatedAt: string
}

export type TeacherDb = {
  id: string
  name: string
  photoUrl?: string
}

export type CourseWorkDb = Pick<CourseWork, 'id' | 'title' | 'workType' | 'alternateLink'> & {
  courseId?: string
  state?: WorkState
  dueDate: number
}

export type Meeting = {
  type: 'zoom' | 'meet'
  url?: string
  id: string
  code?: string
}

export type Teacher = {
  displayName?: string
  subject?: string
  source?: 'google' | 'plugin'
  meetings?: Meeting
  userId?: string[]
  localId?: string
} & TeacherDb

export type Course = Pick<
  classroom_v1.Schema$Course,
  'id' | 'name' | 'section' | 'description' | 'alternateLink' | 'ownerId'
>
export type CourseWork = WithStaticAttachment<
  Pick<
    classroom_v1.Schema$CourseWork,
    | 'id'
    | 'title'
    | 'creationTime'
    | 'updateTime'
    | 'alternateLink'
    | 'dueDate'
    | 'dueTime'
    | 'maxPoints'
    | 'topicId'
    | 'description'
  > & {
    workType?: WorkType
  }
>
export type Submission = Pick<
  classroom_v1.Schema$StudentSubmission,
  'courseWorkId' | 'creationTime' | 'updateTime' | 'assignedGrade'
> & {
  state?: WorkState
  assignmentSubmission: {
    attachments: StaticAttachment[]
  }
}
export type Topic = Pick<classroom_v1.Schema$Topic, 'topicId' | 'name' | 'updateTime'>
export type Material = Pick<
  classroom_v1.Schema$CourseWorkMaterial,
  'id' | 'title' | 'creationTime' | 'updateTime' | 'alternateLink' | 'topicId'
>
export type Announcement = WithStaticAttachment<
  Pick<
    classroom_v1.Schema$Announcement,
    'id' | 'text' | 'alternateLink' | 'creationTime' | 'updateTime' | 'creatorUserId'
  > & {
    photoUrl?: string
  }
>
/**
 * Global information for a user.
 */
export type UserProfile = {
  /**
   * Details of the user's name.
   */
  name?: {
    /**
     * The user's first name. Read-only.
     */
    fullName?: string | null
  }
  /**
   * URL of user's profile photo. Read-only.
   */
  photoUrl?: string | null
}

export type GoogleForm = Omit<classroom_v1.Schema$Form, 'responseUrl'>
export type Url = classroom_v1.Schema$Link

export type Attachment = classroom_v1.Schema$DriveFile &
  GoogleForm &
  Url &
  classroom_v1.Schema$YouTubeVideo

export type RawAttachments = classroom_v1.Schema$Material

export function isCourseWork(data: unknown): data is CourseWork {
  return (data as CourseWork).workType !== undefined
}

export function isAnnouncement(data: unknown): data is Announcement {
  return (data as Announcement).text !== undefined
}

export function isSubmission(data: unknown): data is Submission {
  return (data as Submission).state !== undefined
}

export type StaticAttachment = {
  thumbnailUrl?: string
  title?: string
  url?: string
  type: 'Youtube' | 'Google Drive' | 'Google Form' | 'Link'
}

type WithStaticAttachment<T> = T & {
  materials?: StaticAttachment[]
}
export type StreamFeed = CourseWork | Announcement | Material
export type WorkFeed = CourseWork | Material

export type WorkType = 'SHORT_ANSWER_QUESTION' | 'ASSIGNMENT' | 'MULTIPLE_CHOICE_QUESTION'

export type WorkState = 'NEW' | 'CREATED' | 'TURNED_IN' | 'RETURNED' | 'RECLAIMED_BY_STUDENT'
