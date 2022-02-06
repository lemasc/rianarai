export type AuthChangeEvent = {
  valid: boolean
  signedIn: boolean
  needsRefresh: boolean
}

export interface ClassroomEvents {
  'auth-changed': (event: AuthChangeEvent) => void
}
