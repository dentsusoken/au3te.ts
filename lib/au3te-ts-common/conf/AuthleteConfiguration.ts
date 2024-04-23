/**
 * Authlete configuration.
 */
export default interface AuthleteConfiguration {
  /**
   * Get the Authlete API version.
   *
   * @since 3.23
   */
  getApiVersion(): string;

  /**
   * Get the base URL.
   */
  getBaseUrl(): string;

  /**
   * Get the service API key.
   */
  getServiceApiKey(): string;

  /**
   * Get the service API access token
   */
  getServiceAccessToken(): string;
}
