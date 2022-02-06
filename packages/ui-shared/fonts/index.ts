import { Platform } from 'react-native'

export * from './types'

type FontInterface = {
  fontFamily?: string
  fontWeight?: 'normal' | 'bold'
  paddingTop?: number
}

export function contentFont(bold?: boolean, fallbackFont?: string): FontInterface {
  if (Platform.OS === 'ios') {
    return {
      fontFamily: 'System',
      fontWeight: bold ? 'bold' : 'normal',
    }
  }
  return {
    fontFamily: `${fallbackFont ?? 'Sarabun'}-${bold ? 600 : 400}`,
    paddingTop: 3,
  }
}
