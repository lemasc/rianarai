import { Instance } from './instance'

export type CollectionInstance = ReturnType<typeof collection>

export function writeBatch(instance: Instance) {
  return instance.batch()
}

export function collection(instance: Instance, path: string) {
  return instance.collection(path)
}

export function collectionGroup(instance: Instance, path: string) {
  return instance.collectionGroup(path)
}

export function getDocs(instance: CollectionInstance) {
  return instance.get()
}
