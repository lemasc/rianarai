import type { Credentials, CredentialRequest } from 'google-auth-library'
import { isObject, removeUndefined } from '@rianarai/shared/helpers'

export abstract class ClassroomCredentialStorage {
  private _credentials?: Credentials

  /**
   * Reads and validate the existing credential from the storage.
   * Throws an error if it doesn't exists or malformed.
   */
  protected abstract readCredentials: () => Promise<void>

  /**
   * Save credentials to the storage.
   * @param credentials - Credentials or credential request to save.
   */
  protected abstract saveCredentials: (
    credentials: Partial<Credentials> | CredentialRequest
  ) => Promise<void>

  /**
   * Clear credentials from the storage.
   */
  protected abstract clearCredentials: () => Promise<void>

  protected get credentials() {
    return this._credentials
  }

  protected set credentials(credentials: Credentials | undefined) {
    this._credentials = credentials
      ? Object.assign({}, this._credentials, removeUndefined(credentials))
      : credentials
  }

  protected _verifyCredentials(
    credentials: unknown
  ): credentials is Credentials {
    return (
      isObject(credentials) &&
      typeof (credentials as CredentialRequest).access_token === 'string' &&
      typeof (credentials as Partial<Credentials>).expiry_date === 'number' &&
      // If it contains the refresh token field, check if it's a string. Else just bypass it silently.
      ((credentials as CredentialRequest).refresh_token
        ? typeof (credentials as CredentialRequest).refresh_token === 'string'
        : true)
    )
  }

  /**
   * Converts the remote credential request into the application credentials format.
   */
  protected _convertCredentialRequest(
    request: CredentialRequest
  ): Partial<Credentials> {
    return {
      access_token: request.access_token,
      refresh_token: request.refresh_token,
      // Use seconds since Unix-epoch. NOT MILLISECONDS
      expiry_date: request.expires_in
        ? Math.floor(new Date().valueOf() / 1000) + request.expires_in
        : undefined
    }
  }
  protected _isCredentialRequest(
    credentials: unknown
  ): credentials is CredentialRequest {
    return (
      isObject(credentials) &&
      (credentials as CredentialRequest).expires_in !== undefined
    )
  }
}
