export interface Credentials {
  /**
   * The refresh token use to issue a new access token.
   */
  refresh_token: string
  /**
   * The number of seconds since the Unix epoch that the token will expire.
   */
  expiry_date: number
  /**
   * A token that can be used to access the RianArai server.
   */
  access_token: string
}
