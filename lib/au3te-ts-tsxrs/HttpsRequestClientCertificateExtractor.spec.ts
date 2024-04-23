import { describe, expect, it } from 'vitest';
import HttpsRequestClientCertificateExtractor from './HttpsRequestClientCertificateExtractor';

describe('HttpsRequestClientCertificateExtractor', () => {
  it('extractClientCertificateChain returns null when no certificates are present', async () => {
    const extractor = new HttpsRequestClientCertificateExtractor();
    const request = new Request('https://example.com', {
      method: 'POST',
      body: JSON.stringify({ 'javax.servlet.request.X509Certificate': [] }),
    });
    const result = await extractor.extractClientCertificateChain(request);
    expect(result).toBeNull();
  });

  it('extractClientCertificateChain returns null when certificates are empty', async () => {
    const extractor = new HttpsRequestClientCertificateExtractor();
    const request = new Request('https://example.com');
    request.json = async () => ({
      'javax.servlet.request.X509Certificate': [],
    });
    const result = await extractor.extractClientCertificateChain(request);
    expect(result).toBeNull();
  });

  // TODO pass this test
  // test('extractClientCertificateChain returns PEM-encoded certificates', async () => {
  //   const extractor = new HttpsRequestClientCertificateExtractor();
  //   const certificate1 = new X509Certificate(/* certificate data */);
  //   const certificate2 = new X509Certificate(/* certificate data */);
  //   const request = new Request('https://example.com');
  //   request.json = async () => ({
  //     'javax.servlet.request.X509Certificate': [certificate1, certificate2],
  //   });
  //   const result = await extractor.extractClientCertificateChain(request);
  //   expect(result).toEqual([
  //     '-----BEGIN CERTIFICATE-----\n...',
  //     '-----BEGIN CERTIFICATE-----\n...',
  //   ]);
  // });
});
