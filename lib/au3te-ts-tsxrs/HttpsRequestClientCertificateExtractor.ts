interface X509Certificate {
  getEncoded(): Uint8Array;
}

interface HttpServletRequest {
  getAttribute(attributeName: string): X509Certificate[] | null;
}

interface ClientCertificateExtractor {
  extractClientCertificateChain(request: HttpServletRequest): string[] | null;
}

class HttpsRequestClientCertificateExtractor
  implements ClientCertificateExtractor
{
  private base64: Base64;

  constructor() {
    this.base64 = new Base64(Base64.PEM_CHUNK_SIZE, '\n'.getBytes());
  }

  extractClientCertificateChain(request: HttpServletRequest): string[] | null {
    const certs = request.getAttribute(
      'javax.servlet.request.X509Certificate'
    ) as X509Certificate[] | null;

    if (!certs || certs.length === 0) {
      return null;
    }

    const pemEncoded: string[] = [];

    try {
      for (let i = 0; i < certs.length; i++) {
        pemEncoded[i] = this.toPEM(certs[i]);
      }
    } catch (e) {
      return null;
    }

    return pemEncoded;
  }

  private toPEM(certificate: X509Certificate): string {
    const sb = new StringBuilder();

    sb.append('-----BEGIN CERTIFICATE-----\n');
    sb.append(this.base64.encode(certificate.getEncoded()));
    sb.append('\n-----END CERTIFICATE-----\n');

    return sb.toString();
  }
}
