import { describe, expect, test } from 'vitest';
import { AuthorizationRequestHandlerSpiAdapter } from './AuthorizationRequestHandlerSpiAdapter';

describe('AuthorizationRequestHandlerSpiAdapter', () => {
  test('isUserAuthenticated', () => {
    const spiAdapter = new AuthorizationRequestHandlerSpiAdapter();

    const result = spiAdapter.isUserAuthenticated();

    expect(result).toBe(false);
  });

  test('getUserAuthenticatedAt', () => {
    const spiAdapter = new AuthorizationRequestHandlerSpiAdapter();

    const result = spiAdapter.getUserAuthenticatedAt();

    expect(result).toBe(0);
  });

  test('getUserSubject', () => {
    const spiAdapter = new AuthorizationRequestHandlerSpiAdapter();

    const result = spiAdapter.getUserSubject();

    expect(result).toBe('');
  });

  test('getAcr', () => {
    const spiAdapter = new AuthorizationRequestHandlerSpiAdapter();

    const result = spiAdapter.getAcr();

    expect(result).toBe('');
  });

  test('getProperties', () => {
    const spiAdapter = new AuthorizationRequestHandlerSpiAdapter();

    const result = spiAdapter.getProperties();

    expect(result).toEqual([]);
  });

  test('getScopes', () => {
    const spiAdapter = new AuthorizationRequestHandlerSpiAdapter();

    const result = spiAdapter.getScopes();

    expect(result).toEqual([]);
  });

  test('getSub', () => {
    const spiAdapter = new AuthorizationRequestHandlerSpiAdapter();

    const result = spiAdapter.getSub();

    expect(result).toBe('');
  });
});
