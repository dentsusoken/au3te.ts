import { HeaderClientCertificateExtractor } from './HeaderClientCertificateExtractor';
export class HeaderClientCertificateClientCertExtractor extends HeaderClientCertificateExtractor {
  constructor() {
    super(['Client-Cert', 'Client-Cert-Chain']);
  }

  public override async extractClientCertificateChain(
    request: Request
  ): Promise<string[] | null> {
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

  private decodeByteBufferCerts(sequenceItems: string[]): string[] {
    const certs: string[] = [];
    for (const sequenceItem of sequenceItems) {
      const cert = Buffer.from(sequenceItem).toString('base64');
      certs.push(cert);
    }
    return certs;
  }

  public override getClientCertificateChainHeaders(): string[] {
    return super.getClientCertificateChainHeaders();
  }

  public override setClientCertificateChainHeaders(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: string[]
  ): HeaderClientCertificateExtractor {
    throw new Error('Unsupported operation');
  }
}
