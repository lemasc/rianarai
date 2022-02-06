import { Instance } from './instance'

type DocumentReference = ReturnType<typeof doc>

export function doc(instance: Instance, path: string) {
  return instance.doc(path)
}

export function getDoc(doc: DocumentReference) {
  return doc.get()
}

export function setDoc(doc: DocumentReference, data: any, options: any) {
  return doc.set(data, options)
}

export function updateDoc(doc: DocumentReference, data: any) {
  return doc.update(data)
}

export function deleteDoc(doc: DocumentReference) {
  return doc.delete()
}
