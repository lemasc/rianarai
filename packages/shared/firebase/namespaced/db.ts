import { Fuego } from './fuego'
import { app } from './app'
import firestore from '@react-native-firebase/firestore'

export const db = firestore(app)
export const fuego = new Fuego()
