import { StatusBar } from 'expo-status-bar'

import { NativeBaseProvider } from './shared/nativebase'
import MainContext from '@rianarai/ui-shared/context'

import Navigation from './navigation'
import useAppInitialize from './hooks/useAppInitialize'

export default function App() {
  const initialized = useAppInitialize()
  return (
    <NativeBaseProvider>
      <MainContext>
        {initialized ? (
          <>
            <Navigation />
            <StatusBar />
          </>
        ) : null}
      </MainContext>
    </NativeBaseProvider>
  )
}
