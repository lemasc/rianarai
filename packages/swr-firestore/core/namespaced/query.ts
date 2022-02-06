import type { CollectionInstance } from './collection'

export type StaticQuery = {
  type: string
  args: any[]
}

export function query(ref: CollectionInstance, ...query: StaticQuery[]) {
  return query.reduce((ref, cur) => ref[cur.type](...cur.args), ref)
}

export function onSnapshot(query: any, ...args: any[]) {
  return query.onSnapshot(...args)
}
