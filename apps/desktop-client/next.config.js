const webpack = require('webpack')

// @ts-check
/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  experimental: {
    externalDir: true,
  },
  webpack: (config, { isServer, dev, buildId, config: nextConfig }) => {
    if (!isServer) {
      config.target = 'electron-renderer'
      config.node = {
        __dirname: true,
      }
    }

    if (!dev) {
      config.devtool = !isServer ? 'hidden-source-map' : 'source-map'
    }

    config.resolve.extensions = ['.web.ts', '.web.tsx', ...config.resolve.extensions]
    // If we execute this from the Nextron CLI, we will have the env set already.
    config.plugins.push(new webpack.EnvironmentPlugin(process.env))
    return config
  },
}

module.exports = nextConfig
