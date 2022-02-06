import * as React from 'react'
import { VStack, Box } from 'native-base'
import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack'
import { useBreakpoint } from '../../hooks/useBreakpoint'

type ContainerProps = {
  children: React.ReactNode | React.ReactNode[]
  fullscreen?: boolean
}
export default function Container({ children, fullscreen }: ContainerProps) {
  const stackProps = useBreakpoint<IVStackProps>({
    base: {
      px: '4',
      py: '6',
    },
    md: {
      py: '6',
      px: '8',
    },
    lg: {
      py: '6',
      px: '12',
    },
  })
  return (
    <Box>
      <VStack
        {...(fullscreen ? {} : stackProps)}
        space={2}
        h="full"
        bg="gray.50"
        _dark={{ bg: 'black' }}
      >
        {children}
      </VStack>
    </Box>
  )
}
