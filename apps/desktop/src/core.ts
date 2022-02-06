import { BrowserWindow, ipcMain } from 'electron'
import { app } from 'electron'
import RianAraiClassroom from '@rianarai/classroom/core/node'
import { GoogleSignIn } from './client/signin'
import { alertAsync } from '@rianarai/ui-shared/alert/index.node'
import { registerEvent } from './client/classroom'
import axios from 'axios'

export default class RianAraiCore {
  protected splashWindow: BrowserWindow
  protected modalWindow: BrowserWindow
  protected mainWindow: BrowserWindow
  protected client: RianAraiClassroom
  constructor() {
    this.client = new RianAraiClassroom(new GoogleSignIn(process.env.API_URL))
  }
  protected setup(): void {
    app.on('window-all-closed', () => {
      this.client.destroySignIn(true)
      app.quit()
    })
    app.on('second-instance', () => {
      if (process.env.NODE_ENV === 'development') {
        // Hot Reload enabled. We should quit the app
        app.quit()
      } else {
        this._focusWindow()
      }
    })
    this.setupClassroom()
    this.setupEvents()
  }

  private _focusWindow() {
    if (this.mainWindow) {
      if (this.mainWindow.isMinimized()) this.mainWindow.restore()
      this.mainWindow.focus()
    }
  }

  protected loadPage(name: string): string {
    const port = process.argv[2]
    return process.env.NODE_ENV !== 'development'
      ? `app://./${name}.html`
      : `http://localhost:${port}/${name === 'index' ? '' : name}`
  }
  protected onWindowReady(window: BrowserWindow): void {
    if (window !== this.splashWindow && this.splashWindow && !this.splashWindow.isDestroyed()) {
      this.splashWindow.destroy()
      this.splashWindow = undefined
    }
    window.show()
  }
  private setupEvents() {
    this.client.events.on('auth-changed', (status) => {
      this.mainWindow.webContents.send('auth-changed', status)
    })
    ipcMain.handle('alert', (event, options) =>
      alertAsync(!options.cancelable ? this.mainWindow : undefined, options)
    )
  }

  private setupClassroom() {
    registerEvent('signIn', async () => {
      if (this.client.isSigningIn()) {
        if (
          (await alertAsync(this.mainWindow, {
            title: 'คำขอการเข้าสู่ระบบเดิมยังไม่เสร็จสิ้น',
            message:
              'การส่งคำขอใหม่จะทำให้การเข้าสู่ระบบเดิมถูกยกเลิก ให้ส่งคำขอใหม่หากปิดเบราวเซอร์ไปแล้วเท่านั้น\nต้องการดำเนินการต่อหรือไม่',
            type: 'warning',
            buttons: ['ไม่ใช่', 'ใช่'],
          })) == 0
        )
          throw new Error('Sign in canceled.')
      }
      const signInAlert = await alertAsync(this.mainWindow, {
        title: 'RianArai ต้องการเข้าสู่ระบบด้วย Google',
        message: 'กระบวนการนี้จะเปิดเบราวเซอร์เริ่มต้นของคุณ',
        type: 'info',
        buttons: ['ยกเลิก', 'ตกลง'],
      })
      if (signInAlert === 0) throw new Error('Sign in canceled.')
      const { idToken } = await this.client.nativeSignIn()
      this._focusWindow()
      return { idToken }
    })
    registerEvent('signOut', async () => {
      await this.client.signOut()
    })
    registerEvent('initialize', async () => {
      try {
        await this.client.initialize()
      } catch {
        // Electron throws error urglily. Silently passed this
      } finally {
        if (this.splashWindow?.isDestroyed()) {
          // Splash screen was already destroyed before we can handle it.
          // Possibl)y because the user close it. Quit the app
          this.mainWindow.destroy()
          app.quit()
        } else {
          this.onWindowReady(this.mainWindow)
        }
      }
    })
    registerEvent('refresh', async (idToken) => {
      try {
        await this.client.refresh(idToken)
      } catch (err) {
        if (axios.isAxiosError(err)) {
          throw new Error(err.message)
        }
        throw err
      }
    })
    registerEvent('request', async (url) => {
      const { data, status, statusText } = await this.client.request(url)
      return {
        data,
        status,
        statusText,
      } as never
    })
  }
}
