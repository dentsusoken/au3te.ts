class BaseEndpoint {
  private clientCertificateExtractors: ClientCertificateExtractor[] = [
    new HttpsRequestClientCertificateExtractor(),
    new HeaderClientCertificateXSslExtractor(),
    new HeaderClientCertificateClientCertExtractor(),
  ];

  protected onError(exception: WebApplicationException): void {
    // The default implementation does nothing.
  }

  protected extractClientCertificateChain(
    request: HttpServletRequest
  ): string[] | null {
    for (const extractor of this.clientCertificateExtractors) {
      const chain = extractor.extractClientCertificateChain(request);
      if (chain != null && chain.length > 0) {
        return chain;
      }
    }

    return null;
  }

  protected extractClientCertificate(
    request: HttpServletRequest
  ): string | null {
    const certs = this.extractClientCertificateChain(request);

    if (certs != null && certs.length > 0) {
      return certs[0];
    } else {
      return null;
    }
  }

  protected takeAttribute(session: HttpSession, key: string): any {
    const value = session.getAttribute(key);
    session.removeAttribute(key);
    return value;
  }
}
