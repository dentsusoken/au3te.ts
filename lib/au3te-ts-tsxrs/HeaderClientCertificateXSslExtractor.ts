import HeaderClientCertificateExtractor from './HeaderClientCertificateExtractor';

export default class HeaderClientCertificateXSslExtractor extends HeaderClientCertificateExtractor {
  constructor() {
    super([
      'X-Ssl-Cert', // the client's certificate
      'X-Ssl-Cert-Chain-0',
      'X-Ssl-Cert-Chain-1',
      'X-Ssl-Cert-Chain-2',
      'X-Ssl-Cert-Chain-3',
      'X-Ssl-Cert-Chain-4',
    ]);
  }

  public override getClientCertificateChainHeaders(): string[] {
    return super.getClientCertificateChainHeaders();
  }

  public setClientCertificateChainHeaders(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: string[]
  ): HeaderClientCertificateExtractor {
    throw new Error();
  }
}
