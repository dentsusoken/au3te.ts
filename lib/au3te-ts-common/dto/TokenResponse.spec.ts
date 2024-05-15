import { describe, expect, it } from 'vitest';
import { TokenResponse } from './TokenResponse';

describe('TokenRequest', () => {
  it('getResponseContent', () => {
    const response = new TokenResponse();
    response.setResponseContent('ResContent');
    expect(response.getResponseContent()).toEqual('ResContent');
  });

  it('getDpopNonce', () => {
    const response = new TokenResponse();
    response.setDpopNonce('DpNonce');
    expect(response.getDpopNonce()).toEqual('DpNonce');
  });
});
