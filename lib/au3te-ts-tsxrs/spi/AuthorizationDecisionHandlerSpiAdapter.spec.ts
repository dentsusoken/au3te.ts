import { describe, expect, test } from 'vitest';
import { AuthorizationDecisionHandlerSpiAdapter } from './AuthorizationDecisionHandlerSpiAdapter';

describe('AuthorizationDecisionHandlerSpiAdapter', () => {
  test('isClientAuthorized', () => {
    const spiAdapter = new AuthorizationDecisionHandlerSpiAdapter();
    expect(spiAdapter.isClientAuthorized()).toBeUndefined();
  });

  test('getUserSubject', () => {
    const spiAdapter = new AuthorizationDecisionHandlerSpiAdapter();
    expect(spiAdapter.getUserSubject()).toBeUndefined();
  });

  test('getSub', () => {
    const spiAdapter = new AuthorizationDecisionHandlerSpiAdapter();
    expect(spiAdapter.getSub()).toBeUndefined();
  });

  test('getUserAuthenticatedAt', () => {
    const spiAdapter = new AuthorizationDecisionHandlerSpiAdapter();
    expect(spiAdapter.getUserAuthenticatedAt()).toBeUndefined();
  });

  test('getUserClaim', () => {
    const spiAdapter = new AuthorizationDecisionHandlerSpiAdapter();
    expect(spiAdapter.getUserClaim('claimName', 'languageTag')).toBeUndefined();
  });

  test('getVerifiedClaims', () => {
    const spiAdapter = new AuthorizationDecisionHandlerSpiAdapter();
    expect(
      spiAdapter.getVerifiedClaims('subject', 'verifiedClaimsRequest')
    ).toBeUndefined();
  });

  test('getProperties', () => {
    const spiAdapter = new AuthorizationDecisionHandlerSpiAdapter();
    expect(spiAdapter.getProperties()).toBeUndefined();
  });

  test('getScopes', () => {
    const spiAdapter = new AuthorizationDecisionHandlerSpiAdapter();
    expect(spiAdapter.getScopes()).toBeUndefined();
  });

  test('getAcr', () => {
    const spiAdapter = new AuthorizationDecisionHandlerSpiAdapter();
    expect(spiAdapter.getAcr()).toBeUndefined();
  });
});
