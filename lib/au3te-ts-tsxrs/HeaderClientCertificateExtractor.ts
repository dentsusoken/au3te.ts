import ClientCertificateExtractor from './ClientCertificateExtractor';

export default class HeaderClientCertificateExtractor
  implements ClientCertificateExtractor
{
  private clientCertificateChainHeaders: string[] = [];

  constructor(clientCertificateChainHeaders: string[] = []) {
    this.clientCertificateChainHeaders = clientCertificateChainHeaders;
  }

  public async extractClientCertificateChain(
    request: Request
  ): Promise<string[] | null> {
    const headerCerts = new Array<string>();

    for (const headerName of this.getClientCertificateChainHeaders()) {
      const header = request.headers.get(headerName);
      if (!header) {
        return null;
      }
      const cert = HeaderClientCertificateExtractor.normalizeCert(header);
      if (cert) {
        headerCerts.push(cert);
      }
    }

    if (headerCerts.length < 1) {
      return null;
    }

    return headerCerts;
  }

  private static normalizeCert(cert: string): string | null {
    if (!cert) {
      return null;
    }

    // "(null)" is a value that misconfigured Apache servers will send
    // instead of a missing header. This happens when "SSLOptions" does
    // not include "+ExportCertData".
    if (cert === '(null)' || cert === 'null') {
      return null;
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
  ): void {
    this.clientCertificateChainHeaders = clientCertificateChainHeaders;
    throw new Error('Unsupported operation');
  }
}
