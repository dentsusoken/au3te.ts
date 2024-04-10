import { Request } from 'express';

class HeaderClientCertificateExtractor {
  protected clientCertificateChainHeaders: string[] = [];

  public extractClientCertificateChain(request: Request): string[] | null {
    const listCert: Buffer[] = [];
    let byteSequenceCerts: Buffer[] = [];

    for (const headerName of this.getClientCertificateChainHeaders()) {
      const header = request.header(headerName);
      if (!header) {
        return null;
      }
      const parseCerts = parseList(header);
      byteSequenceCerts = parseCerts.get().toArray();

      for (const item of byteSequenceCerts) {
        listCert.push(item);
      }
    }

    if (listCert.length < 1) {
      return null;
    }

    return this.decodeByteBufferCerts(listCert);
  }

  private decodeByteBufferCerts(sequenceItems: Buffer[]): string[] {
    const certs: string[] = [];

    for (const item of sequenceItems) {
      certs.push(item.toString('utf-8'));
    }

    return certs;
  }

  public getClientCertificateChainHeaders(): string[] {
    return this.clientCertificateChainHeaders;
  }

  public setClientCertificateChainHeaders(
    clientCertificateChainHeaders: string[]
  ): void {
    throw new Error('Unsupported operation');
  }
}

class HeaderClientCertificateClientCertExtractor extends HeaderClientCertificateExtractor {
  private clientCertificateChainHeaders: string[] = [
    'Client-Cert',
    'Client-Cert-Chain',
  ];

  public getClientCertificateChainHeaders(): string[] {
    return this.clientCertificateChainHeaders;
  }
}
