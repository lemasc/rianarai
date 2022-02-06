import firestore from '@react-native-firebase/firestore'

/**
 * Fuego instance for React Native Firebase.
 *
 * Since we only use swr-firebase for the default project
 * and it was already initialized by the plugin, no further configuration is needed.
 */
export class Fuego {
  public db: ReturnType<typeof firestore>
  constructor() {
    this.db = firestore()
  }
}
