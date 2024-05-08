import { ClientCertificateExtractor } from './ClientCertificateExtractor';

export class HeaderClientCertificateExtractor
  implements ClientCertificateExtractor
{
  private clientCertificateChainHeaders: string[] = [];

  constructor(clientCertificateChainHeaders: string[] = []) {
    this.clientCertificateChainHeaders = clientCertificateChainHeaders;
  }

  public async extractClientCertificateChain(
    request: Request
  ): Promise<string[] | undefined> {
    const headerCerts = new Array<string>();

    for (const headerName of this.getClientCertificateChainHeaders()) {
      const header = request.headers.get(headerName);
      if (!header) {
        return undefined;
      }
      const cert = HeaderClientCertificateExtractor.normalizeCert(header);
      if (cert) {
        headerCerts.push(cert);
      }
    }

    if (headerCerts.length < 1) {
      return undefined;
    }

    return headerCerts;
  }

  private static normalizeCert(cert: string): string | undefined {
    if (!cert) {
      return undefined;
    }

    // "(undefined)" is a value that misconfigured Apache servers will send
    // instead of a missing header. This happens when "SSLOptions" does
    // not include "+ExportCertData".
    if (cert === '(undefined)' || cert === 'undefined') {
      return undefined;
    }

    // Nginx's $ssl_client_escaped_cert holds a "urlencoded" client
    // certificate in the PEM format.
    if (cert.startsWith('-----BEGIN%20')) {
      cert = HeaderClientCertificateExtractor.urlDecode(cert);
    }

    return cert;
  }

  private static urlDecode(input: string): string {
    try {
      return decodeURI(input);
    } catch (e) {
      // Failed to decode the input string.
      return input;
    }
  }

  public getClientCertificateChainHeaders(): string[] {
    return this.clientCertificateChainHeaders;
  }

  public setClientCertificateChainHeaders(
    clientCertificateChainHeaders: string[]
  ): HeaderClientCertificateExtractor {
    this.clientCertificateChainHeaders = clientCertificateChainHeaders;
    return this;
  }
}
