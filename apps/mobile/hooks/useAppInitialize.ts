import { useEffect } from 'react'
import * as Font from 'expo-font'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import * as SplashScreen from 'expo-splash-screen'
import { imports } from '../constants/Fonts'

/**
 * Main hook for initializing all the stuffs we need.
 */

export default function useAppInitialize() {
  const [fontsReady, error] = Font.useFonts({
    ...Ionicons.font,
    ...MaterialCommunityIcons.font,
    ...imports,
  })

  useEffect(() => {
    if (fontsReady) SplashScreen.hideAsync()
    else SplashScreen.preventAutoHideAsync()
  }, [fontsReady])

  return fontsReady
}
