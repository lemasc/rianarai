import React from 'react'
import { FuegoProvider } from '@lemasc/swr-firestore'

import { fuego } from '@rianarai/shared/firebase'

import SWRContext from './swr'
import { TimeslotProvider } from './timeslot'
import { AuthProvider } from './auth'
import { ContextProps } from './types'
import { PluginProvider } from './plugin'

export default function MainProvider({ children }: ContextProps) {
  return (
    <PluginProvider>
      <SWRContext>
        <FuegoProvider fuego={fuego}>
          <AuthProvider>
            <TimeslotProvider>{children}</TimeslotProvider>
          </AuthProvider>
        </FuegoProvider>
      </SWRContext>
    </PluginProvider>
  )
}
