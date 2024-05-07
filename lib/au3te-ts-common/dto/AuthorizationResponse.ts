import { Prompt } from '../types/Prompt';
import { AuthzDetails } from './AuthzDetails';
import { Client } from './Client';
import { DynamicScope } from './DynamicScope';
import { Scope } from './Scope';
import { Service } from './Service';
import { StringArray } from './StringArray';

class AuthorizationResponse {
  private action?: AuthorizationResponse.Action;
  private responseContent?: string;
  private service?: Service;
  private client?: Client;
  private maxAge?: number;
  private scopes?: Scope[];
  private dynamicScopes?: DynamicScope[];
  private claims?: string[];
  private claimsAtUserInfo?: string[];
  private acrs?: string[];
  private subject?: string;
  private loginHint?: string;
  private prompts?: Prompt[];
  private idTokenClaims?: string;
  private authorizationDetails?: AuthzDetails;
  private purpose?: string;
  private userInfoClaims?: string;
  private ticket?: string;
  private claimsLocales?: string[];
  private requestedClaimsForTx?: string[];
  private requestedVerifiedClaimsForTx?: StringArray[];

  public getAction(): AuthorizationResponse.Action | undefined {
    return this.action;
  }
  public setAction(
    action: AuthorizationResponse.Action
  ): AuthorizationResponse {
    this.action = action;
    return this;
  }

  public getService(): Service | undefined {
    return this.service;
  }
  public setService(service: Service): AuthorizationResponse {
    this.service = service;
    return this;
  }
  public getClient(): Client | undefined {
    return this.client;
  }
  public setClient(client: Client): AuthorizationResponse {
    this.client = client;
    return this;
  }
  public getMaxAge(): number | undefined {
    return this.maxAge;
  }
  public setMaxAge(maxAge: number): AuthorizationResponse {
    this.maxAge = maxAge;
    return this;
  }
  public getScopes(): Scope[] | undefined {
    return this.scopes;
  }
  public setScopes(scopes: Scope[]): AuthorizationResponse {
    this.scopes = scopes;
    return this;
  }
  public getUserInfoClaims(): string | undefined {
    return this.userInfoClaims;
  }
  public setUserInfoClaims(userInfoClaims: string) {
    this.userInfoClaims = userInfoClaims;
    return this;
  }
  public getDynamicScopes(): DynamicScope[] | undefined {
    return this.dynamicScopes;
  }
  public setDynamicScopes(dynamicScopes: DynamicScope[]) {
    this.dynamicScopes = dynamicScopes;
    return this;
  }
  public getClaims(): string[] | undefined {
    return this.claims;
  }
  public setClaims(claims: string[]): AuthorizationResponse {
    this.claims = claims;
    return this;
  }
  public getClaimsAtUserInfo(): string[] | undefined {
    return this.claimsAtUserInfo;
  }
  public setClaimsAtUserInfo(
    claimsAtUserInfo: string[]
  ): AuthorizationResponse {
    this.claimsAtUserInfo = claimsAtUserInfo;
    return this;
  }
  public getAcrs(): string[] | undefined {
    return this.acrs;
  }
  public setAcrs(acrs: string[]): AuthorizationResponse {
    this.acrs = acrs;
    return this;
  }
  public getSubject(): string | undefined {
    return this.subject;
  }
  public setSubject(subject: string): AuthorizationResponse {
    this.subject = subject;
    return this;
  }
  public getLoginHint(): string | undefined {
    return this.loginHint;
  }
  public setLoginHint(loginHint: string): AuthorizationResponse {
    this.loginHint = loginHint;
    return this;
  }
  public getPrompts(): Prompt[] | undefined {
    return this.prompts;
  }
  public setPrompts(prompts: Prompt[]): AuthorizationResponse {
    this.prompts = prompts;
    return this;
  }
  public getIdTokenClaims(): string | undefined {
    return this.idTokenClaims;
  }
  public setIdTokenClaims(idTokenClaims: string): AuthorizationResponse {
    this.idTokenClaims = idTokenClaims;
    return this;
  }
  public getAuthorizationDetails(): AuthzDetails | undefined {
    return this.authorizationDetails;
  }
  public setAuthorizationDetails(
    authorizationDetails: AuthzDetails
  ): AuthorizationResponse {
    this.authorizationDetails = authorizationDetails;
    return this;
  }
  public getPurpose(): string | undefined {
    return this.purpose;
  }
  public setPurpose(purpose: string): AuthorizationResponse {
    this.purpose = purpose;
    return this;
  }

  public getResponseContent(): string | undefined {
    return this.responseContent;
  }
  public setResponseContent(responseContent: string): AuthorizationResponse {
    this.responseContent = responseContent;
    return this;
  }
  public getTicket(): string | undefined {
    return this.ticket;
  }
  public setTicket(ticket: string): AuthorizationResponse {
    this.ticket = ticket;
    return this;
  }
  public getClaimsLocales(): string[] | undefined {
    return this.claimsLocales;
  }

  public setClaimsLocales(claimLocales: string[]): AuthorizationResponse {
    this.claimsLocales = claimLocales;
    return this;
  }

  public getRequestedClaimsForTx(): string[] | undefined {
    return this.requestedClaimsForTx;
  }

  public setRequestedClaimsForTx(claims: string[]): AuthorizationResponse {
    this.requestedClaimsForTx = claims;
    return this;
  }

  public getRequestedVerifiedClaimsForTx(): StringArray[] | undefined {
    return this.requestedVerifiedClaimsForTx;
  }

  public setRequestedVerifiedClaimsForTx(
    claims: StringArray[]
  ): AuthorizationResponse {
    this.requestedVerifiedClaimsForTx = claims;
    return this;
  }
}
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace AuthorizationResponse {
  export enum Action {
    INTERNAL_SERVER_ERROR,
    BAD_REQUEST,
    LOCATION,
    FORM,
    NO_INTERACTION,
    INTERACTION,
  }
}

export { AuthorizationResponse };
