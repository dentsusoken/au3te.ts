import { describe, expect, it } from 'vitest';
import { VerifiedClaims } from './VerifiedClaims';

describe('VerifiedClaims', () => {
  describe('constructor', () => {
    it('should create an instance of VerifiedClaims', () => {
      const verifiedClaims = new VerifiedClaims();
      expect(verifiedClaims).toBeInstanceOf(VerifiedClaims);
    });
  });
});
