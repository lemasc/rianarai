import RianAraiApp from './app'
import { app } from 'electron'

import * as Sentry from '@sentry/electron'

Sentry.init({ dsn: process.env.SENTRY_DSN })

try {
  // Run our main class
  const gotTheLock = app.requestSingleInstanceLock()
  if (process.env.NODE_ENV !== 'development') {
    if (!gotTheLock) {
      app.quit()
    } else {
      app.setAppUserModelId('com.lemasc.rianarai')
    }
  } else {
    // Needs to be call as soon as possible.
    app.setPath('userData', `${app.getPath('userData')} (development)`)
    app.setAppUserModelId(process.execPath)
  }
  const main = new RianAraiApp()
  main.start()
} catch (e) {
  console.error(e)
  Sentry.captureException(e)
  app.exit()
}
