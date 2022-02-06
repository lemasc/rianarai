import Head from 'next/head'
import { AppProps } from 'next/app'
import LayoutComponent from '@/components/layout'
import MainProvider from '@rianarai/ui-shared/context'

import 'tailwindcss/tailwind.css'
import '../fonts/index.css'
import '../styles/globals.css'
import '../styles/content.css'
import '../styles/react-tabs.css'
import 'react-loading-skeleton/dist/skeleton.css'

import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.3,
})

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>RianArai</title>
      </Head>
      <MainProvider>
        <LayoutComponent>
          <Component {...pageProps} />
        </LayoutComponent>
      </MainProvider>
    </>
  )
}

export default App
