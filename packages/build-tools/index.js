const fs = require('fs')
const path = require('path')

const readVersionFromFile = (filename) => {
  return JSON.parse(fs.readFileSync(path.resolve(filename))).version
}

const getRootVersion = () => readVersionFromFile('../../package.json')
const getAppVersion = () => readVersionFromFile('./package.json')

const getNextBuildId = () => {
  const rootNextApp = fs
    .readdirSync(path.join(process.cwd(), './app/_next'))
    .filter((folder) => folder !== 'static')
  if (rootNextApp.length !== 1) throw new Error('Cannot detect Next build ID')
  return rootNextApp[0]
}

const getSentryOptions = () => {
  const distDir = './app/_next'
  const urlPrefix = '~/_next'

  /**
   * @type {import('@sentry/webpack-plugin').SentryCliPluginOptions}
   **/
  const sentryOptions = {
    include: [
      {
        paths: [`${distDir}/static/chunks/pages`],
        urlPrefix: `${urlPrefix}/static/chunks/pages`,
        stripPrefix: ['webpack://_N_E/']
      },
      { paths: [`./main`] }
    ],
    ignore: [],
    authToken: process.env.SENTRY_AUTH_TOKEN,
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    release: [getAppVersion(), getNextBuildId()].join('_'),
    entries: (entryPointName) => entryPointName === 'pages/_app'
  }
  return sentryOptions
}

module.exports = {
  getRootVersion,
  getAppVersion,
  getSentryOptions
}
