/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: '../../.env' })
require('dotenv').config({ path: '.env' })

const buildTools = require('@rianarai/build-tools')
const reservedClientId = process.env.WEB_CLIENT_ID.split('.').reverse().join('.')

module.exports = {
  expo: {
    owner: process.env.EXPO_OWNER,
    name: 'RianArai',
    slug: 'rianarai',
    version: '1.1.1',
    icon: './assets/images/icon.png',
    plugins: ['@react-native-firebase/app', 'sentry-expo', '@notifee/react-native'],
    jsEngine: 'hermes',
    scheme: 'rianarai',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffd46e',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      buildNumber: '1',
      bundleIdentifier: 'com.lemasc.rianarai',
      supportsTablet: true,
      googleServicesFile: './config/GoogleService-Info.plist',
      config: {
        googleSignIn: {
          reservedClientId,
        },
      },
    },
    android: {
      versionCode: 7,
      package: 'com.lemasc.rianarai',
      googleServicesFile: './config/google-services.json',
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffd46e',
      },
    },
    web: {
      favicon: './assets/images/favicon.png',
    },
    hooks: {
      postPublish: [
        {
          file: 'sentry-expo/upload-sourcemaps',
          config: {
            organization: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,
            authToken: process.env.SENTRY_AUTH_TOKEN,
          },
        },
      ],
    },
    extra: {
      rootVersion: buildTools.getRootVersion(),
      accessTokenKey: process.env.ACCESS_TOKEN_KEY,
      refreshTokenKey: process.env.REFRESH_TOKEN_KEY,
      expiryDateKey: process.env.EXPIRY_DATE_KEY,
    },
  },
}
