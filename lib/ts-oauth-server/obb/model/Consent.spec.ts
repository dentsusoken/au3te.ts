import { beforeEach, describe, expect, it } from 'vitest';
import { Consent } from './Consent';

describe('Consent', () => {
  let consent: Consent;

  beforeEach(() => {
    consent = new Consent(
      'consentId',
      ['permission1', 'permission2'],
      'status',
      'creationDateTime',
      'expirationDateTime',
      'statusUpdateDateTime',
      123,
      'refreshToken'
    );
  });

  it('should return the consent ID', () => {
    expect(consent.getConsentId()).toBe('consentId');
  });

  it('should return the expiration date time', () => {
    expect(consent.getExpirationDateTime()).toBe('expirationDateTime');
  });

  it('should return the status update date time', () => {
    expect(consent.getStatusUpdateDateTime()).toBe('statusUpdateDateTime');
  });

  it('should set the status update date time', () => {
    const newStatusUpdateDateTime = 'newStatusUpdateDateTime';
    consent.setStatusUpdateDateTime(newStatusUpdateDateTime);
    expect(consent.getStatusUpdateDateTime()).toBe(newStatusUpdateDateTime);
  });

  it('should set the refresh token', () => {
    const newRefreshToken = 'newRefreshToken';
    consent.setRefreshToken(newRefreshToken);
    expect(consent.refreshToken).toBe(newRefreshToken);
  });
});
