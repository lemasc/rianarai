import { Credentials } from 'google-auth-library'

export type GoogleSignInResult = {
  success: boolean
  token?: Credentials
  message?: string
}

export type AuthChangeEvent = {
  token: string
}
