import { describe, it } from 'vitest';
describe('AbstractOrderProcessor', () => {
  // Existing tests...

  describe('toOrder', () => {
    it('should convert the context, introspection, and info into an order', () => {
      // Test implementation...
    });

    it('should throw an error if any of the parameters are missing', () => {
      // Test implementation...
    });
  });

  describe('parseJson', () => {
    it('should parse the given JSON string', () => {
      // Test implementation...
    });

    it('should throw an error if the JSON string is invalid', () => {
      // Test implementation...
    });
  });

  describe('createOrder', () => {
    it('should create an order with the given info and claims', () => {
      // Test implementation...
    });
  });

  describe('checkPermissions', () => {
    it('should check the permissions for the given context, issuableCredentials, format, and requestedCredential', () => {
      // Test implementation...
    });
  });

  describe('collectClaims', () => {
    it('should collect the claims for the given context, user, format, and requestedCredential', () => {
      // Test implementation...
    });
  });

  describe('computeCredentialDuration', () => {
    it('should compute the duration of the credential', () => {
      // Test implementation...
    });
  });
});
