import { beforeEach, describe, expect, it } from 'vitest';
import { CredentialIssuerMetadataRequest } from '../dto/CredentialIssuerMetadataRequest';

describe('CredentialIssuerMetadataRequest', () => {
  let request: CredentialIssuerMetadataRequest;

  beforeEach(() => {
    request = new CredentialIssuerMetadataRequest();
  });

  it('should default to not pretty', () => {
    expect(request.isPretty()).toBe(false);
  });

  it('should set pretty to true', () => {
    request.setPretty(true);
    expect(request.isPretty()).toBe(true);
  });

  it('should set pretty to false', () => {
    request.setPretty(false);
    expect(request.isPretty()).toBe(false);
  });
});
