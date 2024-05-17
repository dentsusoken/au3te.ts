import { Session } from '../util/session';
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

  protected async extractClientCertificateChain(
    request: Request
  ): Promise<string[] | undefined> {
    for (const extractor of this.clientCertificateExtractors) {
      const chain = await extractor.extractClientCertificateChain(request);
      if (chain && chain.length > 0) {
        return chain;
      }
    }

    return;
  }

  protected async extractClientCertificate(request: Request) {
    const certs = await this.extractClientCertificateChain(request);
    if (certs && certs.length > 0) {
      return certs[0];
    } else {
      return;
    }
  }

  public async takeAttribute(session: Session, key: string) {
    const value = await session.get(key);
    await session.delete(key);
    return value;
  }
}
