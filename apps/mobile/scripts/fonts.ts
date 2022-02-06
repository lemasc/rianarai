import fs from 'fs/promises'
import path from 'path'
import { FontConfig, FontMetadata } from '../types/fonts'

const overrideWeight = (family: string, originalWeight: number) => {
  if ((family === 'Roboto' && originalWeight === 500) || family === 'Kanit')
    return originalWeight + 100
  return originalWeight
}

async function processDir(prefix: string): Promise<string[]> {
  const dir = await fs.readdir(path.resolve(prefix), {
    withFileTypes: true,
  })
  let names: string[] = []
  for (const d of dir) {
    const name = prefix + d.name
    if (d.isFile() && d.name.endsWith('.ttf')) {
      names = [name, ...names]
    }
    if (d.isDirectory()) {
      names = [...names, ...(await processDir(prefix + d.name + '/'))]
    }
  }
  return names
}

const capitalize = (val: string) => val.slice(0, 1).toUpperCase() + val.slice(1)

const getFontMetadataFromName = (fileName: string): FontMetadata | null => {
  const segments = path.parse(fileName).name.split('-')
  if (segments.length !== 4) return null
  const weight = segments[3]
  const weightNo = parseInt(weight.slice(0, 3))
  const family = capitalize(segments[0])
  return {
    family,
    type: weight.includes('italic') ? 'italic' : 'normal',
    weight: overrideWeight(family, isNaN(weightNo) ? 400 : weightNo),
    location: path.resolve(fileName),
  }
}

const banner = `/*
 * Expo Static Fonts list file.
 * This file shouldn't be edited manually. Use the CLI "yarn fonts" instead.
 */

import { FontConfig, FontImport } from '../../types/fonts'`

/**
 * Node script for generating Ionic routes based on Next.js file-based routing.
 */
async function main() {
  const prefix = './assets/fonts'
  const outDir = path.join(process.cwd(), 'constants')
  try {
    // List all fonts in the directory
    const files = (await processDir(prefix + '/')).sort()
    // Get fonts metadata as array
    const fontsMetadata = files
      .map(getFontMetadataFromName)
      .filter((c) => c !== null) as FontMetadata[]
    console.log(`Loaded ${fontsMetadata.length} fonts.`)
    const fontsConfig: FontConfig = {}
    const fontsImport: Record<string, string> = {}
    fontsMetadata.map((c) => {
      if (!fontsConfig[c.family]) fontsConfig[c.family] = {}
      if (!fontsConfig[c.family][c.weight]) fontsConfig[c.family][c.weight] = {}
      const name = [capitalize(c.family), c.weight + (c.type === 'italic' ? 'Italic' : '')].join(
        '-'
      )
      fontsImport["'" + name + "'"] = `require('${path
        .relative(outDir, c.location)
        .replaceAll('\\', '/')}')`
      fontsConfig[c.family][c.weight][c.type] = name
    })
    const data = [
      banner,
      'export const config: FontConfig = ' + JSON.stringify(fontsConfig, null, 2),
      'export const imports: FontImport = ' +
        JSON.stringify(fontsImport, null, 2).replaceAll('"', ''),
    ].join('\n\n')
    await fs.writeFile(outDir + '/Fonts.ts', data)
    console.log(
      'Fonts file successfully generated at ' + path.relative(process.cwd(), outDir + '/Fonts.ts')
    )
  } catch (err) {
    console.error(err)
  }
}

main()
