// TODO 安藤実装済み
import { describe, expect, it } from 'vitest';
import { CredentialSingleParseRequest } from "./CredentialSingleParseRequest";

describe('CredentialSingleParseRequest', () => {
  const request = new CredentialSingleParseRequest();

  it('getAccessToken', () => {
    expect(request.getAccessToken()).toBeUndefined();
  });

  it('setAccessToken', () => {
    const accessToken = 'accessToken123';
    request.setAccessToken(accessToken);
    expect(request.getAccessToken()).toBe(accessToken);
  });

  it('getRequestContent', () => {
    expect(request.getRequestContent()).toBeUndefined();
  });

  it('setRequestContent', () => {
    const reqContent = 'requestContent123';
    request.setRequestContent(reqContent);
    expect(request.getRequestContent()).toBe(reqContent);
  });
});