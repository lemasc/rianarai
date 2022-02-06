import RianAraiCore from './core'
import { app, nativeTheme } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import * as Sentry from '@sentry/electron'
import { autoUpdater } from 'electron-updater'
import { initSplashScreen } from './client/splashScreen'

/**
 * RianArai Application Bootstrapper
 */
export default class RianAraiApp extends RianAraiCore {
  constructor() {
    super()
    if (process.env.NODE_ENV === 'production') {
      serve({ directory: 'app' })
    }

    autoUpdater.logger = {
      info: console.log,
      error: Sentry.captureException,
      warn: console.log,
    }
    nativeTheme.themeSource = 'light'
  }
  private async installExtensions() {
    if (process.env.NODE_ENV !== 'development') return
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const installer = require('electron-devtools-installer')
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS
    const extensions = ['REACT_DEVELOPER_TOOLS']

    return installer
      .default(
        extensions.map((name) => installer[name]),
        forceDownload
      )
      .catch(console.log)
  }
  async start(): Promise<void> {
    await app.whenReady()
    if (process.env.NODE_ENV === 'production') {
      autoUpdater.checkForUpdatesAndNotify()
      setTimeout(() => {
        autoUpdater.checkForUpdatesAndNotify()
      }, 15 * 60 * 1000)
    }

    await this.installExtensions()
    this.setup()
    this.createSplashWindow()
  }

  private async createSplashWindow() {
    const size = 350
    this.splashWindow = createWindow('splash', {
      width: size,
      height: size,
      frame: false,
      transparent: false,
      resizable: false,
      show: false,
    })
    this.splashWindow.loadURL(await initSplashScreen())
    this.splashWindow.once('ready-to-show', () => {
      this.splashWindow.show()
      // When splash window is shown, creates a new main window but don't show it yet.
      this.createMainWindow()
    })
  }

  private createMainWindow() {
    this.mainWindow = createWindow('main', {
      minWidth: 1024,
      minHeight: 600,
      width: 1200,
      height: 700,
      show: false,
      autoHideMenuBar: true,
    })
    if (!this.mainWindow.webContents.getURL()) {
      this.mainWindow.loadURL(this.loadPage('index'))
    }
  }
}
