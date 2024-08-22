import { describe, expect, it } from 'vitest';
import { VerifiedClaimsConstraint } from './VerifiedClaimsConstraint';

describe('VerifiedClaimsConstraint', () => {
  describe('constructor', () => {
    it('should create an instance of VerifiedClaims', () => {
      const verifiedClaims = new VerifiedClaimsConstraint();
      expect(verifiedClaims).toBeInstanceOf(VerifiedClaimsConstraint);
    });
  });
});
