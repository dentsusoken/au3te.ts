import { describe, it, expect } from 'vitest';
import { VerifiedClaimsContainerConstraint } from './VerifiedClaimsContainerConstraint';

describe('VerifiedClaimsContainerConstraint', () => {
  describe('constructor', () => {
    it('should create an instance of VerifiedClaims', () => {
      const verifiedClaims = new VerifiedClaimsContainerConstraint();
      expect(verifiedClaims).toBeInstanceOf(VerifiedClaimsContainerConstraint);
    });
  });
});
