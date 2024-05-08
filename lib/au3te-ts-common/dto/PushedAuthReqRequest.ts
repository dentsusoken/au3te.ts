/**
 * Request to Authlete's /api/pushed_auth_req API.
 */
export class PushedAuthReqRequest {
  /**
   * Request parameters that the pushed authorization request endpoint of the
   * authorization server implementation received from the client application.
   * Its format is application/x-www-form-urlencoded.
   */
  parameters?: string;

  /**
   * The client ID extracted from the Authorization header of the request
   * to the pushed authorization request endpoint.
   */
  clientId?: string;

  /**
   * The client secret extracted from the Authorization header of the
   * request to the pushed authorization request endpoint.
   */
  clientSecret?: string;

  /**
   * The client certificate used in the TLS connection between the client
   * application and the pushed authorization request endpoint of the
   * authorization server.
   */
  clientCertificate?: string;

  /**
   * The client certificate path presented by the client during client
   * authentication. Each element is a string in PEM format.
   */
  clientCertificatePath?: string[];

  /**
   * The value of the DPoP HTTP header.
   */
  dpop?: string;

  /**
   * The HTTP method of the PAR request. In normal cases, the value is "POST".
   * When this parameter is omitted, "POST" is used as the default value.
   */
  htm?: string;

  /**
   * The URL of the PAR endpoint, without query or path components. If omitted,
   * the pushedAuthReqEndpoint property of Service is used as the default value.
   */
  htu?: string;

  /**
   * The flag indicating whether to require the DPoP proof JWT to include
   * the nonce claim.
   */
  dpopNonceRequired?: boolean;

  /**
   * Get the request parameters that the pushed authorization request
   * endpoint received from the client application.
   */
  getParameters(): string | undefined {
    return this.parameters;
  }

  /**
   * Set the request parameters that the pushed authorization request
   * endpoint received from the client application.
   */
  setParameters(parameters: string): PushedAuthReqRequest {
    this.parameters = parameters;
    return this;
  }

  /**
   * Get the client ID extracted from the Authorization header of the
   * request to the pushed authorization request endpoint.
   */
  getClientId(): string | undefined {
    return this.clientId;
  }

  /**
   * Set the client ID extracted from the Authorization header of the
   * request to the pushed authorization request endpoint.
   */
  setClientId(clientId: string): PushedAuthReqRequest {
    this.clientId = clientId;
    return this;
  }

  /**
   * Get the client secret extracted from the Authorization header of
   * the request to the pushed authorization request endpoint.
   */
  getClientSecret(): string | undefined {
    return this.clientSecret;
  }

  /**
   * Set the client secret extracted from the Authorization header of
   * the request to the pushed authorization request endpoint.
   */
  setClientSecret(clientSecret: string): PushedAuthReqRequest {
    this.clientSecret = clientSecret;
    return this;
  }

  /**
   * Get the client certificate used in the TLS connection between the client
   * application and the pushed authorization request endpoint.
   */
  getClientCertificate(): string | undefined {
    return this.clientCertificate;
  }

  /**
   * Set the client certificate used in the TLS connection between the client
   * application and the pushed authorization request endpoint.
   */
  setClientCertificate(certificate: string): PushedAuthReqRequest {
    this.clientCertificate = certificate;
    return this;
  }

  /**
   * Get the client certificate path presented by the client during client
   * authentication.
   */
  getClientCertificatePath(): string[] | undefined {
    return this.clientCertificatePath;
  }

  /**
   * Set the client certificate path presented by the client during client
   * authentication.
   */
  setClientCertificatePath(path: string[]): PushedAuthReqRequest {
    this.clientCertificatePath = path;
    return this;
  }

  /**
   * Get the DPoP header presented by the client during the request
   * to the PAR endpoint.
   */
  getDpop(): string | undefined {
    return this.dpop;
  }

  /**
   * Set the DPoP header presented by the client during the request
   * to the PAR endpoint.
   */
  setDpop(dpop: string): PushedAuthReqRequest {
    this.dpop = dpop;
    return this;
  }

  /**
   * Get the HTTP method of the pushed authorization request.
   */
  getHtm(): string | undefined {
    return this.htm;
  }

  /**
   * Set the HTTP method of the pushed authorization request.
   */
  setHtm(htm: string): PushedAuthReqRequest {
    this.htm = htm;
    return this;
  }

  /**
   * Get the URL of the PAR endpoint.
   */
  getHtu(): string | undefined {
    return this.htu;
  }

  /**
   * Set the URL of the PAR endpoint.
   */
  setHtu(htu: string): PushedAuthReqRequest {
    this.htu = htu;
    return this;
  }

  /**
   * Get the flag indicating whether to check if the DPoP proof JWT includes
   * the expected nonce value.
   */
  isDpopNonceRequired(): boolean | undefined {
    return this.dpopNonceRequired;
  }

  /**
   * Set the flag indicating whether to check if the DPoP proof JWT includes
   * the expected nonce value.
   */
  setDpopNonceRequired(required: boolean): PushedAuthReqRequest {
    this.dpopNonceRequired = required;
    return this;
  }
}
