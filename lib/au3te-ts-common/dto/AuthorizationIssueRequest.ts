import { Utils } from '../util/Utils';
import { AuthzDetails } from './AuthzDetails';
import { Property } from './Property';

export class AuthorizationIssueRequest {
  private ticket?: string;
  private subject?: string;
  private sub?: string;
  private authTime?: number;
  private acr?: string;
  private claims?: string;
  private properties?: Property[];
  private scopes?: string[];
  private idtHeaderParams?: string;
  private authorizationDetails?: AuthzDetails;
  private consentedClaims?: string[];
  private claimsForTx?: string;
  private verifiedClaimsForTx?: string[];
  private jwtAtClaims?: string;
  private accessToken?: string;
  private idTokenAudType?: string;
  private accessTokenDuration?: number;

  public setTicket(ticket: string): AuthorizationIssueRequest {
    this.ticket = ticket;
    return this;
  }
  public getTicket(): string | undefined {
    return this.ticket;
  }

  public setSubject(subject: string): AuthorizationIssueRequest {
    this.subject = subject;
    return this;
  }
  public getSubject(): string | undefined {
    return this.subject;
  }
  public setAuthTime(authTime: number): AuthorizationIssueRequest {
    this.authTime = authTime;
    return this;
  }
  public getAuthTime(): number | undefined {
    return this.authTime;
  }

  public setAcr(acr: string): AuthorizationIssueRequest {
    this.acr = acr;
    return this;
  }
  public getAcr(): string | undefined {
    return this.acr;
  }

  public setProperties(properties: Property[]): AuthorizationIssueRequest {
    this.properties = properties;
    return this;
  }
  public getProperties(): Property[] | undefined {
    return this.properties;
  }
  public setScopes(scopes: string[]): AuthorizationIssueRequest {
    this.scopes = scopes;
    return this;
  }
  public getScopes(): string[] | undefined {
    return this.scopes;
  }
  public setIdtHeaderParams(
    idtHeaderParams: string
  ): AuthorizationIssueRequest {
    this.idtHeaderParams = idtHeaderParams;
    return this;
  }
  public getIdtHeaderParams(): string | undefined {
    return this.idtHeaderParams;
  }
  public setAuthorizationDetails(
    authorizationDetails: AuthzDetails
  ): AuthorizationIssueRequest {
    this.authorizationDetails = authorizationDetails;
    return this;
  }
  public getAuthorizationDetails(): AuthzDetails | undefined {
    return this.authorizationDetails;
  }
  public setConsentedClaims(
    consentedClaims: string[]
  ): AuthorizationIssueRequest {
    this.consentedClaims = consentedClaims;
    return this;
  }
  public getConsentedClaims(): string[] | undefined {
    return this.consentedClaims;
  }
  public setSub(sub: string): AuthorizationIssueRequest {
    this.sub = sub;
    return this;
  }
  public getSub(): string | undefined {
    return this.sub;
  }
  public setClaims(claims: string): AuthorizationIssueRequest {
    this.claims = claims;
    return this;
  }
  public getClaims(): string | undefined {
    return this.claims;
  }

  public setClaimsForTx(claims?: string): AuthorizationIssueRequest;
  public setClaimsForTx(
    claims?: Record<string, unknown>
  ): AuthorizationIssueRequest;
  public setClaimsForTx(
    claims?: Record<string, unknown> | string
  ): AuthorizationIssueRequest {
    if (!claims && typeof claims !== 'string') {
      return this.setClaimsForTx('');
    }
    if (typeof claims === 'string') {
      this.claimsForTx = claims;
      return this;
    } else {
      const json = Utils.toJson(claims);
      return this.setClaimsForTx(json);
    }
  }
  public getClaimsForTx(): string | undefined {
    return this.claimsForTx;
  }

  public setVerifiedClaimsForTx(args: {
    claims: string[];
  }): AuthorizationIssueRequest;
  public setVerifiedClaimsForTx(args: {
    list?: Record<string, unknown>[];
  }): AuthorizationIssueRequest;
  public setVerifiedClaimsForTx({
    claims,
    list,
  }: {
    claims: string[];
    list?: Record<string, unknown>[];
  }): AuthorizationIssueRequest {
    if (claims) {
      this.verifiedClaimsForTx = claims;
      return this;
    }

    if (list == null || list.length == 0) {
      return this.setVerifiedClaimsForTx({ claims: [] });
    }

    const array = Array.from(list).map((v) => Utils.toJson(v));

    return this.setVerifiedClaimsForTx({ claims: array });
  }
  public getVerifiedClaimsForTx(): string[] | undefined {
    return this.verifiedClaimsForTx;
  }

  public setJwtAtClaims(claims: string): AuthorizationIssueRequest {
    this.jwtAtClaims = claims;
    return this;
  }
  public getJwtAtClaims(): string | undefined {
    return this.jwtAtClaims;
  }

  public setAccessToken(accessToken: string): AuthorizationIssueRequest {
    this.accessToken = accessToken;
    return this;
  }
  public getAccessToken(): string | undefined {
    return this.accessToken;
  }
  public setIdTokenAudType(idTokenAudType: string): AuthorizationIssueRequest {
    this.idTokenAudType = idTokenAudType;
    return this;
  }
  public getIdTokenAudType(): string | undefined {
    return this.idTokenAudType;
  }
  public setAccessTokenDuration(
    accessTokenDuration: number
  ): AuthorizationIssueRequest {
    this.accessTokenDuration = accessTokenDuration;
    return this;
  }
  public getAccessTokenDuration(): number | undefined {
    return this.accessTokenDuration;
  }
}
