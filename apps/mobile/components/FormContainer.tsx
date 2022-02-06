import { VStack, HStack } from 'native-base'
import { IHStackProps } from 'native-base/lib/typescript/components/primitives/Stack/HStack'
import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack'

export default function FormContainer({
  children,
  ...rest
}: { children: React.ReactElement[]; ignoreStylingIndex?: number[] } & Omit<
  IHStackProps,
  'children'
>) {
  const vStackProps: IVStackProps = {
    space: '4',
  }

  const label = children
    .filter((v, i) => i % 2 === 0)
    .map((v) => ({ ...v, props: { ...v.props, content: true, bold: true } }))
  const value = children
    .filter((v, i) => i % 2 !== 0)
    .map((v) => ({ ...v, props: { ...v.props, content: v.props._text ? undefined : true } }))

  return (
    <HStack space={4} {...rest}>
      <VStack {...vStackProps}>{label}</VStack>
      <VStack {...vStackProps}>{value}</VStack>
    </HStack>
  )
}
