import { describe, expect, it } from 'vitest';
import { ClientAuthMethod } from '../types/ClientAuthMethod';
import { PushedAuthReqResponse } from './PushedAuthReqResponse';

describe('PushedAuthReqResponse', () => {
  it('getResponseContent', () => {
    const response = new PushedAuthReqResponse();
    response.setResponseContent('content');
    expect(response.getResponseContent()).toEqual('content');
  });

  it('getClientAuthMethod', () => {
    const response = new PushedAuthReqResponse();
    response.setClientAuthMethod(ClientAuthMethod.NONE);
    expect(response.getClientAuthMethod()).toEqual(ClientAuthMethod.NONE);
  });

  it('getRequestUri', () => {
    const response = new PushedAuthReqResponse();
    const requestUri = new URL('https://example.com');
    response.setRequestUri(requestUri);
    expect(response.getRequestUri()).toEqual(requestUri);
  });

  it('getDpopNonce', () => {
    const response = new PushedAuthReqResponse();
    response.setDpopNonce('nonce');
    expect(response.getDpopNonce()).toEqual('nonce');
  });
});
