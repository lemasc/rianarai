import { BaseEventEmitter, ClassroomClient } from './base'
import { ipcRenderer } from 'electron'
import { AxiosResponse } from 'axios'

/**
 * RianArai Classroom instance for Electron renderer process.
 *
 * This instance done nothing except sends the request to the main process.
 */

export default class RianAraiClassroom implements ClassroomClient {
  events: BaseEventEmitter
  constructor() {
    this.events = {
      addListener: (name, listener) =>
        ipcRenderer.addListener(name, (event, args) => listener(args)),
      removeListener: (name, listener) =>
        ipcRenderer.removeListener(name, (event, args) => listener(args))
    }
  }
  async signIn() {
    return ipcRenderer.invoke('classroom-signIn')
  }
  async addScopes() {
    return
  }
  async signOut() {
    return ipcRenderer.invoke('classroom-signOut')
  }
  async initialize() {
    return ipcRenderer.invoke('classroom-initialize')
  }
  async refresh(idToken?: string) {
    return ipcRenderer.invoke('classroom-refresh', idToken)
  }
  async request<T>(url: string): Promise<AxiosResponse<T>> {
    return ipcRenderer.invoke('classroom-request', url)
  }
}
