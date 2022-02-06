import React from 'react'
import { Appearance } from 'react-native'
import { NativeBaseProvider as NBProvider, useColorMode } from 'native-base'

import * as Theme from '../constants/Theme'

export function NativeBaseProvider({ children }: { children: JSX.Element }) {
  return (
    <NBProvider {...Theme}>
      <WithNightMode>{children}</WithNightMode>
    </NBProvider>
  )
}

function WithNightMode({ children }: { children: JSX.Element }) {
  const { setColorMode } = useColorMode()
  React.useEffect(() => {
    const sub = (pref: Appearance.AppearancePreferences) => {
      setColorMode(pref.colorScheme ?? null)
    }
    Appearance.addChangeListener(sub)
    setColorMode(Appearance.getColorScheme() ?? null)
    return () => Appearance.removeChangeListener(sub)
  }, [setColorMode])
  return children
}
