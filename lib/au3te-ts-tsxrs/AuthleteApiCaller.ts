import { AuthleteApi } from '../au3te-ts-common/api/AuthleteApi';
import { AuthorizationIssueRequest } from '../au3te-ts-common/dto/AuthorizationIssueRequest';
import { AuthorizationIssueResponse } from '../au3te-ts-common/dto/AuthorizationIssueResponse';
import { AuthorizationRequest } from '../au3te-ts-common/dto/AuthorizationRequest';
import { AuthorizationResponse } from '../au3te-ts-common/dto/AuthorizationResponse';
import { IntrospectionRequest } from '../au3te-ts-common/dto/IntrospectionRequest';
import { IntrospectionResponse } from '../au3te-ts-common/dto/IntrospectionResponse';
import { Property } from '../au3te-ts-common/dto/Property';
import { PushedAuthReqRequest } from '../au3te-ts-common/dto/PushedAuthReqRequest';
import { PushedAuthReqResponse } from '../au3te-ts-common/dto/PushedAuthReqResponse';
import { ServiceConfigurationRequest } from '../au3te-ts-common/dto/ServiceConfigurationRequest';
import { TokenRequest } from '../au3te-ts-common/dto/TokenRequest';
import { TokenResponse } from '../au3te-ts-common/dto/TokenResponse';
import { URLCoder } from '../au3te-ts-common/web/URLCoder';
import { ResponseUtil } from './ResponseUtil';

export class AuthleteApiCaller {
  private readonly mApi: AuthleteApi;

  constructor(api: AuthleteApi) {
    this.mApi = api;
  }

  /**
   * Create an {@link InternalServerErrorException} instance to indicate
   * that an Authlete API call failed.
   */
  private apiFailure(path: string, e: Error): Error {
    // Error message.
    const message = `Authlete ${path} API failed: ${e.message}`;

    // // Response body in the response from the Authlete server.
    // if (e() != null) {
    //   // Append the content of the response body to the error message.
    //   message = `${message}: ${e.getResponseBody()}`;
    // }

    // 500 Internal Server Error
    return new Error(message);
  }
  /**
   * Call Authlete's {@code /api/auth/authorization} API.
   */
  public async callAuthorization(
    parameters: Record<string, string>
  ): Promise<AuthorizationResponse> {
    const params = URLCoder.formUrlEncode(parameters);
    return this.callAuthorizationInternal(params);
  }

  private async callAuthorizationInternal(
    parameters?: string
  ): Promise<AuthorizationResponse> {
    // set.has()
    if (!parameters) {
      parameters = '';
    }
    const request: AuthorizationRequest =
      new AuthorizationRequest().setParameters(parameters);
    try {
      return await this.mApi.authorization(request);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      throw this.apiFailure('/api/auth/authorization', e);
    }
  }

  // TODO Implement authorizationFail
  // public async authorizationFail(
  //   ticket: string,
  //   reason: AuthorizationFailRequest.Reason
  // ) {
  //   const request = new AuthorizationFailRequest()
  //     .setTicket(ticket)
  //     .setReason(reason);
  //   try {
  //     return await this.mApi.authorizationFail(request);
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   } catch (e: any) {
  //     throw this.apiFailure('/api/auth/authorization/fail', e);
  //   }
  // }

  /**
   * Call Authlete's {@code /api/auth/authorization/issue} API.
   */
  private async callAuthorizationIssue(
    ticket: string,
    subject: string,
    authTime: number,
    acr: string,
    claims: Record<string, unknown>,
    properties: Property[],
    scopes: string[],
    sub: string,
    claimsForTx?: Record<string, unknown>,
    verifiedClaimsForTx?: Record<string, unknown>[]
  ): Promise<AuthorizationIssueResponse> {
    const request: AuthorizationIssueRequest = new AuthorizationIssueRequest()
      .setTicket(ticket)
      .setSubject(subject)
      .setAuthTime(authTime)
      .setAcr(acr)
      .setProperties(properties)
      .setScopes(scopes)
      .setSub(sub)
      .setClaimsForTx(claimsForTx)
      .setVerifiedClaimsForTx({ list: verifiedClaimsForTx });

    if (!claims && Object.keys(claims).length > 0) {
      request.setClaims(claims);
    }
    try {
      return await this.mApi.authorizationIssue(request);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      throw this.apiFailure('/api/auth/authorization/issue', e);
    }
  }

  /**
   * Issue an authorization code, an ID token and/or an access token.
   * This method calls Authlete's {@code /api/auth/authorization/issue} API.
   */
  public async authorizationIssue(
    ticket: string,
    subject: string,
    authTime: number,
    acr: string,
    claims: Record<string, unknown>,
    properties: Property[],
    scopes: string[],
    sub: string,
    claimsForTx?: Record<string, unknown>,
    verifiedClaimsForTx?: Record<string, unknown>[]
  ): Promise<Response> {
    const response: AuthorizationIssueResponse =
      await this.callAuthorizationIssue(
        ticket,
        subject,
        authTime,
        acr,
        claims,
        properties,
        scopes,
        sub,
        claimsForTx,
        verifiedClaimsForTx
      );

    const action: AuthorizationIssueResponse.Action | undefined =
      response.getAction();
    const content: string | undefined = response.getResponseContent();

    switch (action) {
      case AuthorizationIssueResponse.Action.INTERNAL_SERVER_ERROR:
        return ResponseUtil.internalServerError(content);
      case AuthorizationIssueResponse.Action.BAD_REQUEST:
        return ResponseUtil.badRequest(content);
      case AuthorizationIssueResponse.Action.LOCATION:
        return ResponseUtil.location(content);
      case AuthorizationIssueResponse.Action.FORM:
        return ResponseUtil.form(content);
      default:
        throw this.unknownAction('/api/auth/authorization/issue', action);
    }
  }

  public async callToken(
    parameters: Record<string, string>,
    clientId: string,
    clientSecret: string,
    properties: Property[],
    clientCertificate: string,
    clientCertificatePath: string[],
    dpop: string,
    htm: string,
    htu: string
  ): Promise<TokenResponse> {
    const params = URLCoder.formUrlEncode(parameters);
    return await this.callTokenInternal(
      params,
      clientId,
      clientSecret,
      properties,
      clientCertificate,
      clientCertificatePath,
      dpop,
      htm,
      htu
    );
  }

  public async callTokenInternal(
    parameters: string | undefined,
    clientId: string,
    clientSecret: string,
    properties: Property[],
    clientCertificate: string,
    clientCertificatePath: string[],
    dpop: string,
    htm: string,
    htu: string
  ): Promise<TokenResponse> {
    if (!parameters) {
      parameters = '';
    }
    const request = new TokenRequest()
      .setParameters(parameters)
      .setClientId(clientId)
      .setClientSecret(clientSecret)
      .setProperties(properties)
      .setClientCertificate(clientCertificate)
      .setClientCertificatePath(clientCertificatePath)
      .setDpop(dpop)
      .setHtm(htm)
      .setHtu(htu);
    try {
      return await this.mApi.token(request);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      throw this.apiFailure('/api/auth/token', e);
    }
  }

  /**
   * Call Authlete's `/api/pushed_auth_req` API.
   */
  public async callPushedAuthReq(
    parameters?: string | Record<string, string>,
    clientId?: string,
    clientSecret?: string,
    clientCertificate?: string,
    clientCertificatePath?: string[],
    dpop?: string,
    htm?: string,
    htu?: string
  ): Promise<PushedAuthReqResponse> {
    const params =
      typeof parameters === 'string'
        ? parameters
        : typeof parameters !== 'undefined'
        ? URLCoder.formUrlEncode(parameters)
        : '';

    return await this.callPushedAuthReqInternal(
      params,
      clientId,
      clientSecret,
      clientCertificate,
      clientCertificatePath,
      dpop,
      htm,
      htu
    );
  }

  private async callPushedAuthReqInternal(
    parameters?: string,
    clientId?: string,
    clientSecret?: string,
    clientCertificate?: string,
    clientCertificatePath?: string[],
    dpop?: string,
    htm?: string,
    htu?: string
  ): Promise<PushedAuthReqResponse> {
    const request: PushedAuthReqRequest = new PushedAuthReqRequest();
    parameters && request.setParameters(parameters);
    clientId && request.setClientId(clientId);
    clientSecret && request.setClientSecret(clientSecret);
    clientCertificate && request.setClientCertificate(clientCertificate);
    clientCertificatePath &&
      request.setClientCertificatePath(clientCertificatePath);
    dpop && request.setDpop(dpop);
    htm && request.setHtm(htm);
    htu && request.setHtu(htu);

    try {
      return await this.mApi.pushAuthorizationRequest(request);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      // the API call failed
      throw this.apiFailure('/api/pushed_auth_req', e);
    }
  }

  public callIntrospection(
    accessToken: string,
    scopes: string[],
    subject: string,
    clientCertificate: string,
    dpop: string,
    htm: string,
    htu: string
  ): Promise<IntrospectionResponse> {
    const request = new IntrospectionRequest()
      .setToken(accessToken)
      .setScopes(scopes)
      .setSubject(subject)
      .setClientCertificate(clientCertificate)
      .setDpop(dpop)
      .setHtm(htm)
      .setHtu(htu);
    return this.callIntrospectionInternal(request);
  }

  public async callIntrospectionInternal(
    request: IntrospectionRequest
  ): Promise<IntrospectionResponse> {
    try {
      return await this.mApi.introspection(request);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      // the API call failed
      throw this.apiFailure('/api/auth/introspection', e);
    }
  }

  public unknownAction(path: string, action: unknown): Error {
    // Error message.
    const message = `Authlete ${path} API returned an unknown action: ${action}`;

    // 500 Internal Server Error
    return new Error(message);
  }

  public async callServiceConfiguration(
    request?: ServiceConfigurationRequest,
    pretty?: boolean
  ): Promise<string> {
    if (!request && !pretty) {
      throw new Error('Either request or pretty must be set');
    }
    try {
      if (pretty) {
        return await this.mApi.getServiceConfiguration(undefined, pretty);
      } else {
        return await this.mApi.getServiceConfiguration(request);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      throw this.apiFailure('/api/service/configuration', e);
    }
  }
}
