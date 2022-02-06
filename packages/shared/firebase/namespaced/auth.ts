import firebaseAuth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { app } from './app'

type AuthModule = ReturnType<typeof firebaseAuth>
export const auth = firebaseAuth(app)

export function signOut(module: AuthModule) {
  return module.signOut()
}

export function signInWithCredential(module: AuthModule, credentials: any) {
  return module.signInWithCredential(credentials)
}

export const GoogleAuthProvider = firebaseAuth.GoogleAuthProvider

export function onIdTokenChanged(module: AuthModule, listener: any) {
  return module.onIdTokenChanged(listener)
}

export type User = FirebaseAuthTypes.User
