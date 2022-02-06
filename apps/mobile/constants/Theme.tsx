import { extendTheme } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'

import { config as fontConfig } from './Fonts'

export const theme = extendTheme({
  components: {
    Input: {
      baseStyle: () => ({
        _focus: {
          borderColor: 'rianarai.600',
        },
      }),
    },
  },
  colors: {
    rianarai: {
      DEFAULT: '#FDC04A',
      50: '#FFFFFF',
      100: '#FFF8EB',
      200: '#FEEAC3',
      300: '#FEDC9B',
      400: '#FDCE72',
      500: '#FDC04A',
      600: '#FCAD13',
      700: '#D48D02',
      800: '#9D6802',
      900: '#654301',
    },
    jaffa: {
      DEFAULT: '#F28131',
      50: '#FFFFFF',
      100: '#FEF6F1',
      200: '#FBD9C1',
      300: '#F8BC91',
      400: '#F59F61',
      500: '#F28131',
      600: '#E2660E',
      700: '#B2510B',
      800: '#823B08',
      900: '#522505',
    },
  },
  fontConfig,
  fonts: {
    brand: 'Pattaya',
    body: 'Kanit',
    mono: 'Roboto',
  },
})

export const config = {
  dependencies: {
    'linear-gradient': LinearGradient,
  },
}
