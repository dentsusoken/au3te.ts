interface X509Certificate {
  getEncoded(): Uint8Array;
}
interface ClientCertificateExtractor {
  extractClientCertificateChain(request: Request): Promise<string[] | null>;
}

// TODO move to  util?
const base64 = {
  encode: (data: string): string => {
    const encoded = btoa(data);
    const wrapped = encoded.replace(/(.{64})/g, '$1\n');
    return wrapped;
  },
};

export default class HttpsRequestClientCertificateExtractor
  implements ClientCertificateExtractor
{
  async extractClientCertificateChain(
    request: Request
  ): Promise<string[] | null> {
    // TODO comfirm is this correct
    const certs = (await request.json())[
      'javax.servlet.request.X509Certificate'
    ] as X509Certificate[] | null;

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
    let sb: string = '';
    // TODO Confirm if this is operate correctly or not
    sb += '-----BEGIN CERTIFICATE-----\n';
    sb += base64.encode(new TextDecoder().decode(certificate.getEncoded()));
    sb += '\n-----END CERTIFICATE-----\n';

    return sb;
  }
}
