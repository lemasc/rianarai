import { ITextProps, Text as NBText } from 'native-base'
import typography from 'native-base/src/theme/base/typography'

import { isString } from '@rianarai/shared/helpers'
import { contentFont } from '@rianarai/ui-shared/fonts'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { Platform } from 'react-native'

const availableSizes = Object.keys(typography.fontSizes)

export function useFontSize(fontSize: ITextProps['fontSize']) {
  const isSm = useBreakpoint({ base: false, sm: true })
  const processFontSize = () => {
    if (!isString(fontSize) || Platform.OS !== 'ios') return fontSize
    if (isSm) return availableSizes[availableSizes.indexOf(fontSize) + 1]
    return fontSize
  }
  return processFontSize()
}

export default function Text(props: ITextProps & { content?: boolean }) {
  return (
    <NBText
      {...Object.assign({}, props, {
        fontSize: useFontSize(props.fontSize ?? 'sm'),
        style: props.content ? contentFont(!!props.bold) : undefined,
        bold: undefined,
        content: undefined,
      })}
    ></NBText>
  )
}
