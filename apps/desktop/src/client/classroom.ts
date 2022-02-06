import type { ClassroomClient } from '@rianarai/classroom/core/base'
import { ipcMain } from 'electron'
import * as Sentry from '@sentry/electron'

export function registerEvent<T extends keyof Omit<ClassroomClient, 'events'>>(
  eventName: T,
  handler: ClassroomClient[T]
) {
  ipcMain.handle(`classroom-${eventName}`, (event, ...args) => {
    try {
      // eslint-disable-next-line prefer-spread
      return handler.apply(null, args)
    } catch (err) {
      Sentry.captureException(err)
      throw err
    }
  })
}
