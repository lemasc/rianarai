import { getFirestore } from '@firebase/firestore'

export class Fuego {
  db: ReturnType<typeof getFirestore>
}
