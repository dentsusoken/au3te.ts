import { describe, it, expect } from 'vitest';
import { AuthorizationIssueRequest } from './AuthorizationIssueRequest';
import { Property } from './Property';
import { AuthzDetails } from './AuthzDetails';

describe('AuthorizationIssueRequest', () => {
  it('should set and get ticket', () => {
    const request = new AuthorizationIssueRequest();
    request.setTicket('test-ticket');
    expect(request.getTicket()).toBe('test-ticket');
  });

  it('should set and get subject', () => {
    const request = new AuthorizationIssueRequest();
    request.setSubject('test-subject');
    expect(request.getSubject()).toBe('test-subject');
  });

  it('should set and get authTime', () => {
    const request = new AuthorizationIssueRequest();
    request.setAuthTime(1234567890);
    expect(request.getAuthTime()).toBe(1234567890);
  });

  it('should set and get acr', () => {
    const request = new AuthorizationIssueRequest();
    request.setAcr('test-acr');
    expect(request.getAcr()).toBe('test-acr');
  });

  it('should set and get properties', () => {
    const properties: Property[] = [
      new Property({ key: 'key1', value: 'value1' }),
    ];
    const request = new AuthorizationIssueRequest();
    request.setProperties(properties);
    expect(request.getProperties()).toEqual(properties);
  });

  it('should set and get scopes', () => {
    const scopes = ['scope1', 'scope2'];
    const request = new AuthorizationIssueRequest();
    request.setScopes(scopes);
    expect(request.getScopes()).toEqual(scopes);
  });

  it('should set and get idtHeaderParams', () => {
    const request = new AuthorizationIssueRequest();
    request.setIdtHeaderParams('test-idtHeaderParams');
    expect(request.getIdtHeaderParams()).toBe('test-idtHeaderParams');
  });

  it('should set and get authorizationDetails', () => {
    const authzDetails = new AuthzDetails();
    const request = new AuthorizationIssueRequest();
    request.setAuthorizationDetails(authzDetails);
    expect(request.getAuthorizationDetails()).toBe(authzDetails);
  });

  it('should set and get consentedClaims', () => {
    const consentedClaims = ['claim1', 'claim2'];
    const request = new AuthorizationIssueRequest();
    request.setConsentedClaims(consentedClaims);
    expect(request.getConsentedClaims()).toEqual(consentedClaims);
  });

  it('should set and get sub', () => {
    const request = new AuthorizationIssueRequest();
    request.setSub('test-sub');
    expect(request.getSub()).toBe('test-sub');
  });

  it('should set and get claims', () => {
    const request = new AuthorizationIssueRequest();
    request.setClaims('test-claims');
    expect(request.getClaims()).toBe('test-claims');
  });

  it('should set and get claimsForTx', () => {
    const request = new AuthorizationIssueRequest();
    request.setClaimsForTx('test-claimsForTx');
    expect(request.getClaimsForTx()).toBe('test-claimsForTx');
  });

  it('should set and get verifiedClaimsForTx', () => {
    const verifiedClaims = ['claim1', 'claim2'];
    const request = new AuthorizationIssueRequest();
    request.setVerifiedClaimsForTx({ claims: verifiedClaims });
    expect(request.getVerifiedClaimsForTx()).toEqual(verifiedClaims);
  });

  it('should set and get jwtAtClaims', () => {
    const request = new AuthorizationIssueRequest();
    request.setJwtAtClaims('test-jwtAtClaims');
    expect(request.getJwtAtClaims()).toBe('test-jwtAtClaims');
  });

  it('should set and get accessToken', () => {
    const request = new AuthorizationIssueRequest();
    request.setAccessToken('test-accessToken');
    expect(request.getAccessToken()).toBe('test-accessToken');
  });

  it('should set and get idTokenAudType', () => {
    const request = new AuthorizationIssueRequest();
    request.setIdTokenAudType('test-idTokenAudType');
    expect(request.getIdTokenAudType()).toBe('test-idTokenAudType');
  });

  it('should set and get accessTokenDuration', () => {
    const request = new AuthorizationIssueRequest();
    request.setAccessTokenDuration(3600);
    expect(request.getAccessTokenDuration()).toBe(3600);
  });
});
