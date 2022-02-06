import type { CredentialRequest, Credentials } from 'google-auth-library'
import keytar from 'keytar'
import { ClassroomCredentialStorage } from './base'

/**
 * Credential Storage for NodeJS main process.
 */
export default class CredentialStorage extends ClassroomCredentialStorage {
  private serviceName = process.env.SERVICE_NAME as string
  private accountName = process.env.ACCOUNT_NAME as string

  constructor() {
    super()
    this.removeLegacyCredentials()
  }
  private async removeLegacyCredentials() {
    try {
      const credentials = await keytar.findCredentials('RianAraiClient')
      await Promise.all(
        credentials.map(
          async (c) => await keytar.deletePassword('RianAraiClient', c.account)
        )
      )
      // eslint-disable-next-line no-empty
    } catch {}
  }
  protected readCredentials = async () => {
    try {
      const credentials = JSON.parse(
        (await keytar.getPassword(this.serviceName, this.accountName)) as string
      )
      if (!this._verifyCredentials(credentials))
        throw new Error('Invalid credentials')
      this.credentials = credentials
    } catch (err) {
      console.error(err)
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
    const savedCredentials: Credentials = {
      access_token: credentials.access_token,
      refresh_token:
        credentials.refresh_token ?? this.credentials?.refresh_token,
      expiry_date: credentials.expiry_date
    }
    await keytar.setPassword(
      this.serviceName,
      this.accountName,
      JSON.stringify(savedCredentials)
    )
    this.credentials = credentials
  }

  protected clearCredentials = async () => {
    this.credentials = undefined
    await keytar.deletePassword(this.serviceName, this.accountName)
  }
}
