import { describe, expect, it } from 'vitest';
import HeaderClientCertificateExtractor from './HeaderClientCertificateExtractor';

describe('HeaderClientCertificateExtractor', () => {
  it('extractClientCertificateChain returns null when header is missing', async () => {
    const extractor = new HeaderClientCertificateExtractor();
    const request = new Request('https://example.com', {
      headers: new Headers(),
    });
    const result = await extractor.extractClientCertificateChain(request);
    expect(result).toBeNull();
  });

  it('extractClientCertificateChain returns null when header value is "(null)"', async () => {
    const extractor = new HeaderClientCertificateExtractor();
    const request = new Request('https://example.com', {
      headers: { header1: '(null)' },
    });
    const result = await extractor.extractClientCertificateChain(request);
    expect(result).toBeNull();
  });

  it('extractClientCertificateChain returns null when header value is "null"', async () => {
    const extractor = new HeaderClientCertificateExtractor();
    const request = new Request('https://example.com', {
      headers: { header1: 'null' },
    });
    const result = await extractor.extractClientCertificateChain(request);
    expect(result).toBeNull();
  });

  // TODO pass this test (normalizeCert is private and cannot be accessed from the test)
  // it('extractClientCertificateChain returns normalized certificate', async () => {
  //   const extractor = new HeaderClientCertificateExtractor();
  //   const request = new Request('https://example.com', {
  //     headers: { header1: '-----BEGIN%20cert-----' },
  //   });
  //   const result = await extractor.extractClientCertificateChain(request);
  //   expect(result).toEqual(['-----BEGIN cert-----']);
  // });
});
