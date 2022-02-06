import { getFirestore } from '@firebase/firestore'

/**
 * Fuego instance for React Native Firebase.
 *
 * Since we only use swr-firebase for the default project
 * and it was already initialized by the plugin, no further configuration is needed.
 */
export class Fuego {
  public db: ReturnType<typeof getFirestore>
  constructor() {
    this.db = getFirestore()
  }
}
