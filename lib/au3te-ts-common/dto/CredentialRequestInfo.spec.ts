import { beforeEach, describe, expect, it } from 'vitest';
import { CredentialRequestInfo } from '../dto/CredentialRequestInfo';

describe('CredentialRequestInfo', () => {
  let credentialRequestInfo: CredentialRequestInfo;

  beforeEach(() => {
    credentialRequestInfo = new CredentialRequestInfo();
  });

  it('should set and get the identifier', () => {
    const identifier = 'exampleIdentifier';
    credentialRequestInfo.setIdentifier(identifier);
    expect(credentialRequestInfo.getIdentifier()).toBe(identifier);
  });

  it('should set and get the format', () => {
    const format = 'exampleFormat';
    credentialRequestInfo.setFormat(format);
    expect(credentialRequestInfo.getFormat()).toBe(format);
  });

  it('should set and get the details', () => {
    const details = 'exampleDetails';
    credentialRequestInfo.setDetails(details);
    expect(credentialRequestInfo.getDetails()).toBe(details);
  });

  it('should not set the identifier if it is undefined', () => {
    const identifier = undefined;
    credentialRequestInfo.setIdentifier(identifier!);
    expect(credentialRequestInfo.getIdentifier()).toBeUndefined();
  });

  it('should not set the format if it is undefined', () => {
    const format = undefined;
    credentialRequestInfo.setFormat(format!);
    expect(credentialRequestInfo.getFormat()).toBeUndefined();
  });

  it('should not set the details if it is undefined', () => {
    const details = undefined;
    credentialRequestInfo.setDetails(details!);
    expect(credentialRequestInfo.getDetails()).toBeUndefined();
  });
});
