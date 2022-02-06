import fs from 'fs/promises'
import path from 'path'
import { getAssetsDir } from '../helpers'

async function encodeFromFile(filePath: string): Promise<string> {
  // Most commonly used images extension can be append as a mime type, except JPEG.
  const extension = path.parse(filePath).ext
  let mediaType = extension === 'jpg' ? 'jpeg' : extension

  const fileData = await fs.readFile(path.resolve(__dirname, getAssetsDir(), filePath))
  mediaType = /\//.test(mediaType) ? mediaType : 'image/' + mediaType
  const dataBase64 = fileData.toString('base64')
  return 'data:' + mediaType + ';base64,' + dataBase64
}

/**
 * Reads the splash screen image and returns a base64-encoded HTML document URI.
 */
async function initSplashScreen(): Promise<string> {
  const imageUrl = await encodeFromFile('splash.png')
  const splashHtml = `<html style="width: 100%; height: 100%; margin: 0; overflow: hidden;"><body style="width: 100%; height: 100%;"><div style="background-image: url('${imageUrl}'); background-position: center center; background-repeat: no-repeat; width: 100%; height: 100%; margin: 0; overflow: hidden; position: absolute; top: 0; left: 0; z-index: 100;">&nbsp;</div></body></html>`

  return `data:text/html;charset=UTF-8,${encodeURIComponent(splashHtml)}`
}

export { initSplashScreen }
