// TODO 安藤実装済み
import { describe, expect, it } from 'vitest';
import { IntrospectionResponse } from './IntrospectionResponse';
import { Action } from "./PushedAuthReqResponse";

describe('IntrospectionRequest', () => {
  const request = new IntrospectionResponse();

  it('getAction', () => {
    expect(request.getAction()).toBeUndefined();
  });

  it('setAction', () => {
    request.setAction(Action.CREATED);
    expect(request.getAction()).toBe(Action.CREATED);
  });

  it('getSubject', () => {
    expect(request.getSubject()).toBeUndefined();
  });

  it('setSubject', () => {
    const subject = 'subject123';
    request.setSubject(subject);
    expect(request.getSubject()).toBe(subject);
  });

  it('getResponseContent', () => {
    expect(request.getResponseContent()).toBeUndefined();
  });

  it('setResponseContent', () => {
    const responseContent = 'resContent123';
    request.setResponseContent(responseContent);
    expect(request.getResponseContent()).toBe(responseContent);
  });

  it('getIssuableCredentials', () => {
    expect(request.getIssuableCredentials()).toBeUndefined();
  });

  it('setIssuableCredentials', () => {
    const issuableCredentials = 'setIssCredentials123';
    request.setIssuableCredentials(issuableCredentials);
    expect(request.getIssuableCredentials()).toBe(issuableCredentials);
  });

  it('getDpopNonce', () => {
    expect(request.getDpopNonce()).toBeUndefined();
  });

  it('setDpopNonce', () => {
    const dpopNonce = 'dpopNonce123';
    request.setDpopNonce(dpopNonce);
    expect(request.getDpopNonce()).toBe(dpopNonce);
  });
});
