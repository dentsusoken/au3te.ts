import { describe, expect, it } from 'vitest';
import { HeaderClientCertificateXSslExtractor } from './HeaderClientCertificateXSslExtractor';

describe('HeaderClientCertificateXSslExtractor', () => {
  it('getClientCertificateChainHeaders returns the correct headers', () => {
    const extractor = new HeaderClientCertificateXSslExtractor();
    const headers = extractor.getClientCertificateChainHeaders();
    expect(headers).toEqual([
      'X-Ssl-Cert',
      'X-Ssl-Cert-Chain-0',
      'X-Ssl-Cert-Chain-1',
      'X-Ssl-Cert-Chain-2',
      'X-Ssl-Cert-Chain-3',
      'X-Ssl-Cert-Chain-4',
    ]);
  });

  it('setClientCertificateChainHeaders throws an error', () => {
    const extractor = new HeaderClientCertificateXSslExtractor();
    expect(() => {
      extractor.setClientCertificateChainHeaders([]);
    }).toThrow();
  });
});
