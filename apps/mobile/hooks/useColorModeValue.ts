import { useColorModeValue as useNBColorModeValue } from 'native-base'

export default function useColorModeValue<T>(light: T, dark: T) {
  return useNBColorModeValue(light, dark)
}
