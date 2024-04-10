/**
 * Authlete configuration.
 */
export interface AuthleteConfiguration {
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
   * Get the service owner API key.
   */
  getServiceOwnerApiKey(): string;

  /**
   * Get the service owner API key.
   */
  getServiceOwnerApiKey(): string;

  /**
   * Get the service owner API secret.
   */
  getServiceOwnerApiSecret(): string;

  /**
   * Get the service owner API access token
   */
  getServiceOwnerAccessToken(): string;

  /**
   * Get the service API key.
   */
  getServiceApiKey(): string;

  /**
   * Get the service API secret.
   */
  getServiceApiSecret(): string;

  /**
   * Get the service API access token
   */
  getServiceAccessToken(): string;

  /**
   * Get the public/private key pair used for DPoP
   * signatures in JWK format.
   *
   * @since 2.73
   */
  getDpopKey(): string;

  /**
   * Get the certificate used for MTLS bound
   * access tokens in PEM format.
   *
   * @since 2.73
   */
  getClientCertificate(): string;
}
