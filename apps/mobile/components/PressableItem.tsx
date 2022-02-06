import { IPressableProps, Pressable, useColorModeValue } from 'native-base'

export default function PressableItem(props: IPressableProps) {
  const rippleColor = useColorModeValue('#e5e5e5', '#404040')
  return (
    <Pressable
      android_ripple={{
        color: rippleColor,
      }}
      borderBottomWidth="1"
      _dark={{
        borderColor: 'gray.700',
        bgColor: 'black',
      }}
      bgColor={'white'}
      borderColor="coolGray.200"
      px="6"
      py="4"
      {...props}
    >
      {props.children}
    </Pressable>
  )
}
