import HeaderClientCertificateExtractor from './HeaderClientCertificateExtractor';
// TODO Implement this class
export default class HeaderClientCertificateClientCertExtractor extends HeaderClientCertificateExtractor {
  private clientCertificateChainHeaders: string[] = [
    'Client-Cert',
    'Client-Cert-Chain',
  ];

  public override extractClientCertificateChain(
    request: Request
  ): string[] | null {
    const listCert: string[] = [];

    for (const headerName of this.getClientCertificateChainHeaders()) {
      const cert = request.headers.get(headerName);
      if (cert) {
        listCert.push(cert);
      }
    }
    if (listCert.length === 0) {
      return null;
    }
    return this.decodeByteBufferCerts(listCert);
  }

  // TODO Confirm if this operates correctly or not
  private decodeByteBufferCerts(sequenceItems: any): string[] {
    const certs: string[] = [];
    for (const sequenceItem of sequenceItems) {
      const cert = Buffer.from(sequenceItem).toString('base64');
      certs.push(cert);
    }
    return certs;
  }

  public override getClientCertificateChainHeaders(): string[] {
    return this.clientCertificateChainHeaders;
  }

  public override setClientCertificateChainHeaders(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clientCertificateChainHeaders: string[]
  ): void {
    throw new Error('Unsupported operation');
  }
}
