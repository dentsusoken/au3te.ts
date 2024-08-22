import { describe, it, expect } from 'vitest';
import { AuthorizationResponse } from './AuthorizationResponse';
import { Service } from './Service';
import { Client } from './Client';
import { Scope } from './Scope';
import { DynamicScope } from './DynamicScope';
import { Prompt } from '../types/Prompt';
import { AuthzDetails } from './AuthzDetails';
import { StringArray } from './StringArray';

describe('AuthorizationResponse', () => {
  it('should set and get action', () => {
    const response = new AuthorizationResponse();
    response.setAction(AuthorizationResponse.Action.BAD_REQUEST);
    expect(response.getAction()).toBe(AuthorizationResponse.Action.BAD_REQUEST);
  });

  it('should set and get service', () => {
    const response = new AuthorizationResponse();
    const service = new Service();
    response.setService(service);
    expect(response.getService()).toBe(service);
  });

  it('should set and get client', () => {
    const response = new AuthorizationResponse();
    const client = new Client();
    response.setClient(client);
    expect(response.getClient()).toBe(client);
  });

  it('should set and get maxAge', () => {
    const response = new AuthorizationResponse();
    response.setMaxAge(3600);
    expect(response.getMaxAge()).toBe(3600);
  });

  it('should set and get scopes', () => {
    const response = new AuthorizationResponse();
    const scopes: Scope[] = [new Scope()];
    response.setScopes(scopes);
    expect(response.getScopes()).toBe(scopes);
  });

  it('should set and get dynamicScopes', () => {
    const response = new AuthorizationResponse();
    const dynamicScopes: DynamicScope[] = [new DynamicScope()];
    response.setDynamicScopes(dynamicScopes);
    expect(response.getDynamicScopes()).toBe(dynamicScopes);
  });

  it('should set and get claims', () => {
    const response = new AuthorizationResponse();
    const claims: string[] = ['claim1', 'claim2'];
    response.setClaims(claims);
    expect(response.getClaims()).toBe(claims);
  });

  it('should set and get claimsAtUserInfo', () => {
    const response = new AuthorizationResponse();
    const claimsAtUserInfo: string[] = ['claim1', 'claim2'];
    response.setClaimsAtUserInfo(claimsAtUserInfo);
    expect(response.getClaimsAtUserInfo()).toBe(claimsAtUserInfo);
  });

  it('should set and get acrs', () => {
    const response = new AuthorizationResponse();
    const acrs: string[] = ['acr1', 'acr2'];
    response.setAcrs(acrs);
    expect(response.getAcrs()).toBe(acrs);
  });

  it('should set and get subject', () => {
    const response = new AuthorizationResponse();
    response.setSubject('subject');
    expect(response.getSubject()).toBe('subject');
  });

  it('should set and get loginHint', () => {
    const response = new AuthorizationResponse();
    response.setLoginHint('loginHint');
    expect(response.getLoginHint()).toBe('loginHint');
  });

  it('should set and get prompts', () => {
    const response = new AuthorizationResponse();
    const prompts: Prompt[] = [Prompt.NONE];
    response.setPrompts(prompts);
    expect(response.getPrompts()).toBe(prompts);
  });

  it('should set and get idTokenClaims', () => {
    const response = new AuthorizationResponse();
    response.setIdTokenClaims('idTokenClaims');
    expect(response.getIdTokenClaims()).toBe('idTokenClaims');
  });

  it('should set and get authorizationDetails', () => {
    const response = new AuthorizationResponse();
    const authzDetails = new AuthzDetails();
    response.setAuthorizationDetails(authzDetails);
    expect(response.getAuthorizationDetails()).toBe(authzDetails);
  });

  it('should set and get purpose', () => {
    const response = new AuthorizationResponse();
    response.setPurpose('purpose');
    expect(response.getPurpose()).toBe('purpose');
  });

  it('should set and get responseContent', () => {
    const response = new AuthorizationResponse();
    response.setResponseContent('responseContent');
    expect(response.getResponseContent()).toBe('responseContent');
  });

  it('should set and get ticket', () => {
    const response = new AuthorizationResponse();
    response.setTicket('ticket');
    expect(response.getTicket()).toBe('ticket');
  });

  it('should set and get claimsLocales', () => {
    const response = new AuthorizationResponse();
    const claimsLocales: string[] = ['en', 'fr'];
    response.setClaimsLocales(claimsLocales);
    expect(response.getClaimsLocales()).toBe(claimsLocales);
  });

  it('should set and get requestedClaimsForTx', () => {
    const response = new AuthorizationResponse();
    const requestedClaimsForTx: string[] = ['claim1', 'claim2'];
    response.setRequestedClaimsForTx(requestedClaimsForTx);
    expect(response.getRequestedClaimsForTx()).toBe(requestedClaimsForTx);
  });

  it('should set and get requestedVerifiedClaimsForTx', () => {
    const response = new AuthorizationResponse();
    const requestedVerifiedClaimsForTx: StringArray[] = [new StringArray()];
    response.setRequestedVerifiedClaimsForTx(requestedVerifiedClaimsForTx);
    expect(response.getRequestedVerifiedClaimsForTx()).toBe(
      requestedVerifiedClaimsForTx
    );
  });
});
