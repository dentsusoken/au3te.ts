import { describe, expect, it } from 'vitest';
import HeaderClientCertificateExtractor from './HeaderClientCertificateExtractor';

describe('HeaderClientCertificateExtractor', () => {
  it('extractClientCertificateChain returns null when header is missing', () => {
    const extractor = new HeaderClientCertificateExtractor();
    const request = new Request('https://example.com', {
      headers: new Headers(),
    });
    const result = extractor.extractClientCertificateChain(request);
    expect(result).toBeNull();
  });

  it('extractClientCertificateChain returns null when header value is "(null)"', () => {
    const extractor = new HeaderClientCertificateExtractor();
    const request = new Request('https://example.com', {
      headers: { header1: '(null)' },
    });
    const result = extractor.extractClientCertificateChain(request);
    expect(result).toBeNull();
  });

  it('extractClientCertificateChain returns null when header value is "null"', () => {
    const extractor = new HeaderClientCertificateExtractor();
    const request = new Request('https://example.com', {
      headers: { header1: 'null' },
    });
    const result = extractor.extractClientCertificateChain(request);
    expect(result).toBeNull();
  });

  // TODO pass this test
  it('extractClientCertificateChain returns normalized certificate', () => {
    const extractor = new HeaderClientCertificateExtractor();
    const request = new Request('https://example.com', {
      headers: { header1: '-----BEGIN%20cert-----' },
    });
    const result = extractor.extractClientCertificateChain(request);
    expect(result).toEqual(['-----BEGIN cert-----']);
  });

  // TODO pass this test
  it('getClientCertificateChainHeaders returns the set headers', () => {
    const extractor = new HeaderClientCertificateExtractor();
    extractor.setClientCertificateChainHeaders(['header1', 'header2']);
    const result = extractor.getClientCertificateChainHeaders();
    expect(result).toEqual(['header1', 'header2']);
  });
});
