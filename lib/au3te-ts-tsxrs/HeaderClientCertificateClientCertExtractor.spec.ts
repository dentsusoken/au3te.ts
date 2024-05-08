import { describe, expect, it } from 'vitest';
import { HeaderClientCertificateClientCertExtractor } from './HeaderClientCertificateClientCertExtractor';

describe('HeaderClientCertificateClientCertExtractor', () => {
  describe('extractClientCertificateChain', () => {
    it('should return null when no client certificate headers are present', async () => {
      // Arrange
      const extractor = new HeaderClientCertificateClientCertExtractor();
      const request = new Request('https://example.com', { headers: [] });

      // Act
      const result = await extractor.extractClientCertificateChain(request);
      // Assert
      expect(result).toBeNull();
    });

    it('should return the decoded client certificate chain when headers are present', async () => {
      // Arrange
      const extractor = new HeaderClientCertificateClientCertExtractor();
      const request = new Request('https://example.com', {
        headers: [
          ['Client-Cert', 'cert1'],
          ['Client-Cert-Chain', 'cert2'],
        ],
      });

      // Act
      const result = await extractor.extractClientCertificateChain(request);

      // Assert
      expect(result).toEqual(['Y2VydDE=', 'Y2VydDI=']); // Base64 encoded values of 'cert1' and 'cert2'
    });
  });

  describe('getClientCertificateChainHeaders', () => {
    it('should return the default client certificate chain headers', () => {
      // Arrange
      const extractor = new HeaderClientCertificateClientCertExtractor();

      // Act
      const result = extractor.getClientCertificateChainHeaders();

      // Assert
      expect(result).toEqual(['Client-Cert', 'Client-Cert-Chain']);
    });
  });

  describe('setClientCertificateChainHeaders', () => {
    it('should throw an error', () => {
      // Arrange
      const extractor = new HeaderClientCertificateClientCertExtractor();

      // Act & Assert
      expect(() => extractor.setClientCertificateChainHeaders([])).toThrowError(
        'Unsupported operation'
      );
    });
  });
});
