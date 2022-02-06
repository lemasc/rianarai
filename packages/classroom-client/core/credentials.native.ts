import type {
  CredentialRequest,
  Credentials as StorageCredentials
} from 'google-auth-library'
import * as SecureStore from 'expo-secure-store'

import { Credentials } from '../types/credentials'
import { ClassroomCredentialStorage } from './base'
import Constants from 'expo-constants'

const env = Constants.manifest.extra
console.log(env)

/**
 * Classroom Credential Storage uses by React Native
 */
export default class CredentialStorage extends ClassroomCredentialStorage {
  protected readCredentials = async () => {
    try {
      const expiry_date = await SecureStore.getItemAsync(env?.expiryDateKey)
      const credentials: StorageCredentials = {
        access_token: await SecureStore.getItemAsync(env?.accessTokenKey),
        refresh_token: await SecureStore.getItemAsync(env?.refreshTokenKey),
        expiry_date:
          expiry_date && !isNaN(parseInt(expiry_date))
            ? parseInt(expiry_date)
            : null
      }
      if (!this._verifyCredentials(credentials))
        throw new Error('Invalid credentials')
      this.credentials = credentials
    } catch (err) {
      this.clearCredentials()
      this.credentials = undefined
      throw err
    }
  }

  protected saveCredentials = async (
    credentials: Partial<Credentials> | CredentialRequest
  ) => {
    if (this._isCredentialRequest(credentials)) {
      credentials = this._convertCredentialRequest(credentials)
    }
    if (!this._verifyCredentials(credentials))
      throw new Error('Cannot verify credential format')
    // Save to secure storage
    await SecureStore.setItemAsync(
      env?.accessTokenKey,
      credentials.access_token
    )
    if (credentials.refresh_token) {
      await SecureStore.setItemAsync(
        env?.refreshTokenKey,
        credentials.refresh_token
      )
    }
    await SecureStore.setItemAsync(
      env?.expiryDateKey,
      credentials.expiry_date.toString()
    )
    this.credentials = credentials
  }

  protected clearCredentials = async () => {
    this.credentials = undefined
    await SecureStore.deleteItemAsync(env?.accessTokenKey)
    await SecureStore.deleteItemAsync(env?.refreshTokenKey)
    await SecureStore.deleteItemAsync(env?.expiryDateKey)
  }
}
