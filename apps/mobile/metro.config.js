/* eslint-disable @typescript-eslint/no-var-requires */
// Learn more https://docs.expo.io/guides/customizing-metro
require('dotenv').config({ path: '../../.env' })
require('dotenv').config({ path: '.env' })

const { getDefaultConfig } = require('expo/metro-config')
const { getMetroAndroidAssetsResolutionFix } = require('react-native-monorepo-tools')
const path = require('path')

const config = getDefaultConfig(__dirname)

// Monorepo
const projectRoot = __dirname
const workspaceRoot = path.resolve(__dirname, '../..')
config.watchFolders = [workspaceRoot]
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
]

// Android Assets Resolution Fix
const androidAssetsResolutionFix = getMetroAndroidAssetsResolutionFix()
config.transformer.publicPath = androidAssetsResolutionFix.publicPath
config.server.enhanceMiddleware = (middleware) => {
  return androidAssetsResolutionFix.applyMiddleware(middleware)
}

module.exports = config
