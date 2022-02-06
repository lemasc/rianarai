import { Fuego } from './fuego'
import { app } from './app'

import { getFirestore } from 'firebase/firestore'

export const db = getFirestore(app)
export const fuego = new Fuego()
