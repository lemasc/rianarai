require('dotenv').config({ path: '../../.env' })
require('dotenv').config({ path: '.env' })

const webpack = require('webpack')

const buildTools = require('@rianarai/build-tools')
process.env.CLIENT_VERSION = buildTools.getAppVersion()
process.env.ROOT_VERSION = buildTools.getRootVersion()

const SentryCliPlugin = require('@sentry/webpack-plugin')

module.exports = {
  rendererSrcDir: '../desktop-client',
  webpack: (config) => {
    config.entry.background = './src/index.ts'
    config.output = {
      ...(config.output || {}),
      filename: '[name].js',
      path: __dirname + '/main',
    }
    config.resolve.extensions = ['.node.ts', ...config.resolve.extensions]
    config.plugins.push(new webpack.EnvironmentPlugin(process.env))
    if (process.env.NODE_ENV === 'production') {
      // Upload sourcemaps to Sentry
      config.plugins.push(new SentryCliPlugin(buildTools.getSentryOptions()))
    }
    return config
  },
}
