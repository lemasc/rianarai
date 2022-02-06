import type { StaticQuery } from './query'

function factory(type: string): (...args: any[]) => StaticQuery {
  return (...args) => ({
    type,
    args
  })
}
export const Constraints = {
  where: factory('where'),
  orderBy: factory('orderBy'),
  startAt: factory('startAt'),
  endAt: factory('endAt'),
  startAfter: factory('startAfter'),
  endBefore: factory('endBefore'),
  limit: factory('limit')
}
