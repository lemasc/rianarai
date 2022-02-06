/*
 * Expo Static Fonts list file.
 * This file shouldn't be edited manually. Use the CLI "yarn fonts" instead.
 */

import { FontImport, FontConfig } from '@rianarai/ui-shared/fonts/types'

export const config: FontConfig = {
  Kanit: {
    '400': {
      normal: 'Kanit-400',
      italic: 'Kanit-400Italic',
    },
    '500': {
      normal: 'Kanit-500',
    },
    '600': {
      normal: 'Kanit-600',
    },
  },
  Kodchasan: {
    '400': {
      normal: 'Kodchasan-400',
    },
    '600': {
      normal: 'Kodchasan-600',
    },
  },
  Pattaya: {
    '400': {
      normal: 'Pattaya-400',
    },
  },
  Roboto: {
    '400': {
      normal: 'Roboto-400',
    },
    '600': {
      normal: 'Roboto-600',
    },
  },
  Sarabun: {
    '400': {
      italic: 'Sarabun-400Italic',
      normal: 'Sarabun-400',
    },
    '600': {
      normal: 'Sarabun-600',
      italic: 'Sarabun-600Italic',
    },
  },
}

export const imports: FontImport = {
  'Kanit-400': require('../assets/fonts/kanit/kanit-v7-thai_latin-300.ttf'),
  'Kanit-400Italic': require('../assets/fonts/kanit/kanit-v7-thai_latin-300italic.ttf'),
  'Kanit-600': require('../assets/fonts/kanit/kanit-v7-thai_latin-500.ttf'),
  'Kanit-500': require('../assets/fonts/kanit/kanit-v7-thai_latin-regular.ttf'),
  'Kodchasan-600': require('../assets/fonts/kodchasan/kodchasan-v6-thai_latin-600.ttf'),
  'Kodchasan-400': require('../assets/fonts/kodchasan/kodchasan-v6-thai_latin-regular.ttf'),
  'Pattaya-400': require('../assets/fonts/pattaya/pattaya-v7-thai_latin-regular.ttf'),
  'Roboto-600': require('../assets/fonts/roboto/roboto-v29-latin-500.ttf'),
  'Roboto-400': require('../assets/fonts/roboto/roboto-v29-latin-regular.ttf'),
  'Sarabun-600': require('../assets/fonts/sarabun/sarabun-v8-thai_latin-600.ttf'),
  'Sarabun-600Italic': require('../assets/fonts/sarabun/sarabun-v8-thai_latin-600italic.ttf'),
  'Sarabun-400Italic': require('../assets/fonts/sarabun/sarabun-v8-thai_latin-italic.ttf'),
  'Sarabun-400': require('../assets/fonts/sarabun/sarabun-v8-thai_latin-regular.ttf'),
}
