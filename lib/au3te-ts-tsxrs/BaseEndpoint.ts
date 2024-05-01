import { ClientCertificateExtractor } from './ClientCertificateExtractor';
import { HeaderClientCertificateClientCertExtractor } from './HeaderClientCertificateClientCertExtractor';
import { HeaderClientCertificateXSslExtractor } from './HeaderClientCertificateXSslExtractor';
import { HttpsRequestClientCertificateExtractor } from './HttpsRequestClientCertificateExtractor';

export class BaseEndpoint {
  private clientCertificateExtractors: ClientCertificateExtractor[] = [
    new HttpsRequestClientCertificateExtractor(),
    new HeaderClientCertificateXSslExtractor(),
    new HeaderClientCertificateClientCertExtractor(),
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onError(_: Error): void {
    // The default implementation does nothing.
  }

  protected async extractClientCertificateChain(request: Request) {
    for (const extractor of this.clientCertificateExtractors) {
      const chain = await extractor.extractClientCertificateChain(request);
      if (chain != null && chain.length > 0) {
        return chain;
      }
    }

    return null;
  }
  // TODO Authorization Endpoint
  public BaseEndpoint() {}
}
