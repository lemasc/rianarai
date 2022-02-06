import { GoogleScopes } from '../../types/auth'

export const additionalScopes = [
  GoogleScopes.CONTACTS,
  GoogleScopes.CLASSROOM_ANNOUNCEMENTS,
  GoogleScopes.CLASSROOM_COURSES,
  GoogleScopes.CLASSROOM_COURSEWORK,
  GoogleScopes.CLASSROOM_MATERIALS,
  GoogleScopes.CLASSROOM_PHOTOS,
  GoogleScopes.CLASSROOM_ROASTERS,
  GoogleScopes.CLASSROOM_SUBMISSIONS,
  GoogleScopes.CLASSROOM_TOPICS
]

export const requiredScopes = [
  GoogleScopes.OPENID,
  GoogleScopes.PROFILE,
  GoogleScopes.EMAIL
]
