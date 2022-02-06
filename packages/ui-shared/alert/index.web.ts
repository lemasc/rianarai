import { ipcRenderer } from 'electron'
import { AlertOptions } from './types'

export async function alertAsync<T>({
  type,
  title,
  message,
  buttons,
  cancelable,
  ...rest
}: AlertOptions<T>) {
  return new Promise<T | undefined>((resolve) => {
    ipcRenderer
      .invoke('alert', {
        title,
        message,
        buttons: buttons.map((b) => b.text),
        cancelable,
        type
      })
      .then((index) => {
        const result = buttons[index]
        result && result.onPress && result.onPress()
        resolve(result?.value)
        rest.onDismiss && rest.onDismiss()
      })
  })
}
