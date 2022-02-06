import * as React from 'react'
import { Skeleton as MotiSkeleton } from '@motify/skeleton'

import useColorModeValue from '../hooks/useColorModeValue'

export default function Skeleton(props: React.ComponentProps<typeof MotiSkeleton>) {
  const colorMode = useColorModeValue('light', 'dark')
  return <MotiSkeleton colorMode={colorMode} {...props} />
}
