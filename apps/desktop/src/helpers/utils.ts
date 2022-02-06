/**
 * Gets the current assets directory, which depends on the current environment.
 *
 * On production, all files will be exported to the `app` directory.
 *
 * On development, we just resolved it to the public directory of our monorepo.
 */
export const getAssetsDir = () => {
  return process.env.NODE_ENV === 'development' ? '../../desktop-client/public' : '../app'
}
