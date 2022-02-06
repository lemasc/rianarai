import 'fastestsmallesttextencoderdecoder'
import 'expo-dev-client'
import * as Sentry from 'sentry-expo'

import 'react-native-gesture-handler'
import { registerRootComponent } from 'expo'

import App from './App'

Sentry.init({
  dsn: 'https://8fb9770bc8be4243903086e4894bc5e4@o1055795.ingest.sentry.io/6171303',
  tracesSampleRate: 1.0,
  enableInExpoDevelopment: __DEV__,
  debug: __DEV__,
})

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App)
