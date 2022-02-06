import { Box, IBoxProps } from 'native-base'
import RNMarkdown from 'react-native-markdown-display'

import { contentFont } from '@rianarai/ui-shared/fonts'
import useColorModeValue from '../hooks/useColorModeValue'
import { useBreakpoint } from '../hooks/useBreakpoint'

export default function Markdown({
  children,
  ...rest
}: {
  children: string
} & Omit<IBoxProps, 'style'>) {
  const fontColor = useColorModeValue(undefined, '#f3f4f6')
  const fontStyles = useBreakpoint({
    base: {
      lineHeight: 25,
      fontSize: 13,
    },
    sm: {
      lineHeight: 30,
      fontSize: 15,
    },
  })
  return (
    <Box {...rest}>
      <RNMarkdown
        style={{
          body: {
            ...fontStyles,
            color: fontColor,
          },
          text: contentFont(),
        }}
      >
        {children}
      </RNMarkdown>
    </Box>
  )
}
