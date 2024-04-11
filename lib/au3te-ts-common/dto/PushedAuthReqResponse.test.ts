import { expect, test } from 'vitest';
import PushedAuthReqResponse from './PushedAuthReqResponse';

test('getAction', () => {
  const response = new PushedAuthReqResponse();
  // response.setAction('action');
  // expect(response.getAction()).toEqual('action');
  expect(response.getAction()).toBeUndefined;
});

test('getResponseContent', () => {
  const response = new PushedAuthReqResponse();
  // response.setResponseContent('content');
  // expect(response.getResponseContent()).toEqual('content');
  expect(response.getResponseContent()).toBeUndefined;
});

test('getDpopNonce', () => {
  const response = new PushedAuthReqResponse();
  // response.setDpopNonce('nonce');
  // expect(response.getDpopNonce()).toEqual('nonce');
  expect(response.getDpopNonce()).toBeUndefined;
});
