export const isObject = (payload: unknown): payload is Record<string, unknown> => {
  return typeof payload === 'object' && payload !== null
}

export const isString = (payload: unknown): payload is string => {
  return typeof payload === 'string' && payload !== null
}

export function removeUndefined<T>(obj: T) {
  return Object.fromEntries(Object.entries(obj).filter(([key, value]) => value !== undefined)) as T
}
