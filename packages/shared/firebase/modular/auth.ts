import { app } from './app'
import { getAuth } from 'firebase/auth'

export const auth = getAuth(app)

export {
  signOut,
  signInWithCredential,
  GoogleAuthProvider,
  onIdTokenChanged
} from 'firebase/auth'

export type { User } from 'firebase/auth'
