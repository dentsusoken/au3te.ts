export interface ClientCertificateExtractor {
  /**
   * Search the given request for a client's certificate and return it as a string
   * of certificates in PEM format.
   *
   * @param request
   *          The incoming HTTP request to search.
   *
   * @return
   *          The client's MTLS certificate chain. All certificates are in PEM format,
   *          the first certificate is the client's own certificate.
   */
  extractClientCertificateChain(request: Request): Promise<string[] | null>;
}
