// TODO 安藤実装済み
import { describe, expect, it } from 'vitest';
import { CredentialRequestInfo } from './CredentialRequestInfo';
import { CredentialSingleParseResponse } from './CredentialSingleParseResponse';

describe('IntrospectionRequest', () => {
  const request = new CredentialSingleParseResponse();

  it('getResponseContent', () => {
    expect(request.getResponseContent()).toBeUndefined();
  });

  it('setResponseContent', () => {
    const responseContent = 'responseContent123';
    request.setResponseContent(responseContent);
    expect(request.getResponseContent()).toBe(responseContent);
  });

  it('getInfo', () => {
    expect(request.getInfo()).toBeUndefined();
  });

  it('setInfo', () => {
    const info = new CredentialRequestInfo;
    request.setInfo(info);
    expect(request.getInfo()).toBe(info);
  });
});
