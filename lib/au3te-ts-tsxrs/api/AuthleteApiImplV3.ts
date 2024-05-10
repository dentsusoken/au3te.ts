import { AuthleteApiVersion } from '../../au3te-ts-common/conf/AuthleteApiVersion';
import { AuthleteConfiguration } from '../../au3te-ts-common/conf/AuthleteConfiguration';
import { AuthorizationFailRequest } from '../../au3te-ts-common/dto/AuthorizationFailRequest';
import { AuthorizationFailResponse } from '../../au3te-ts-common/dto/AuthorizationFailResponse';
import { AuthorizationIssueRequest } from '../../au3te-ts-common/dto/AuthorizationIssueRequest';
import { AuthorizationIssueResponse } from '../../au3te-ts-common/dto/AuthorizationIssueResponse';
import { AuthorizationRequest } from '../../au3te-ts-common/dto/AuthorizationRequest';
import { AuthorizationResponse } from '../../au3te-ts-common/dto/AuthorizationResponse';
import { PushedAuthReqRequest } from '../../au3te-ts-common/dto/PushedAuthReqRequest';
import { PushedAuthReqResponse } from '../../au3te-ts-common/dto/PushedAuthReqResponse';
import { ClientAuthMethod } from '../../au3te-ts-common/types/ClientAuthMethod';
import { AuthleteApiCall, AuthleteApiJaxrsImpl } from './AuthleteApiJaxrsImpl';

export class AuthleteApiImplV3 extends AuthleteApiJaxrsImpl {
  private static readonly AUTH_AUTHORIZATION_API_PATH: string =
    '/api/%d/auth/authorization';
  private static readonly AUTH_AUTHORIZATION_FAIL_API_PATH: string =
    '/api/%d/auth/authorization/fail';
  private static readonly PUSHED_AUTH_REQ_API_PATH: string =
    '/api/%d/pushed_auth_req';
  private static readonly AUTH_AUTHORIZATION_ISSUE_API_PATH: string =
    '/api/%d/auth/authorization/issue';

  private readonly mAuth: string;
  private readonly mServiceId: number | undefined;
  /**
   * The constructor with an instance of {@link AuthleteConfiguration}.
   *
   * <p>
   * The existence of a constructor of this type is a required by
   * </p>
   *
   * @param configuration
   *         An instance of {@link AuthleteConfiguration}.
   */
  constructor(configuration: AuthleteConfiguration) {
    super(configuration);

    // Authlete API version specified by the configuration.
    const version: AuthleteApiVersion | undefined = AuthleteApiVersion.parse(
      configuration.getApiVersion()
    );

    if (version !== AuthleteApiVersion.V3) {
      throw new Error(
        'Configuration must be set to V3 for this implementation.'
      );
    }

    this.mAuth = this.createCredentials(configuration);
    if (configuration.getServiceApiKey() !== undefined) {
      this.mServiceId = parseInt(configuration.getServiceApiKey());
    } else {
      this.mServiceId = undefined;
    }
  }

  /**
   * Create an authorization header for the access token.
   */
  private createCredentials(configuration: AuthleteConfiguration): string {
    if (configuration.getServiceAccessToken() !== undefined) {
      // TODO implement DPoP
      // if (this.isDpopEnabled()) {
      //   return 'DPoP ' + configuration.getServiceAccessToken();
      // } else {
      return 'Bearer ' + configuration.getServiceAccessToken();
      // }
    } else {
      throw new Error('V3 API requires an access token, not a key and secret');
    }
  }

  private PostApiCaller = class extends ApiCaller {
    public api: AuthleteApiImplV3;
    constructor(
      api: AuthleteApiImplV3,
      request: unknown,
      path?: string,
      format?: string,
      ...args: unknown[]
    ) {
      if (typeof path === 'string') {
        super(request, path);
      } else {
        super(request, path!, format!, args);
      }
      this.api = api;
    }

    async call(): Promise<Response> {
      return await this.api.callPostApi(this.mPath, this.mRequest);
    }
  };

  protected async callPostApi(
    path: string,
    request: unknown
  ): Promise<Response> {
    return await super.callPostApi(this.mAuth, path, request);
  }

  public async authorization(
    request: AuthorizationRequest
  ): Promise<AuthorizationResponse> {
    const response = await this.executeApiCall(
      new this.PostApiCaller(
        this,
        request,
        undefined,
        AuthleteApiImplV3.AUTH_AUTHORIZATION_API_PATH,
        this.mServiceId
      )
    );
    const params = await response.json();

    const authResponse = new AuthorizationResponse();
    authResponse
      .setAcrs(params.acrs)
      .setAction(params.action as AuthorizationResponse.Action)
      .setAuthorizationDetails(params.authorizationDetails)
      .setClaims(params.claims)
      .setClaimsAtUserInfo(params.claimsAtUserInfo)
      .setClient(params.client)
      .setDynamicScopes(params.dynamicScopes)
      .setIdTokenClaims(params.idTokenClaims)
      .setLoginHint(params.loginHint)
      .setMaxAge(params.maxAge)
      .setPrompts(params.prompts)
      .setPurpose(params.purpose)
      .setResponseContent(params.responseContent)
      .setScopes(params.scopes)
      .setService(params.service)
      .setSubject(params.subject)
      .setTicket(params.ticket)
      .setUserInfoClaims(params.userInfoClaims)
      .setClaimsLocales(params.claimLocales)
      .setRequestedClaimsForTx(params.requestedClaimsForTx)
      .setRequestedVerifiedClaimsForTx(params.requestedVerifiedClaimsForTx);

    return authResponse;
  }

  public async authorizationFail(
    request: AuthorizationFailRequest
  ): Promise<AuthorizationFailResponse> {
    const response = await this.executeApiCall(
      new this.PostApiCaller(
        this,
        request,
        undefined,
        AuthleteApiImplV3.AUTH_AUTHORIZATION_FAIL_API_PATH,
        this.mServiceId
      )
    );
    const params = await response.json();

    const authFailResponse = new AuthorizationFailResponse()
      .setAction(params.action)
      .setResponseContent(params.responseContent);

    return authFailResponse;
  }

  public async authorizationIssue(
    request: AuthorizationIssueRequest
  ): Promise<AuthorizationIssueResponse> {
    const response = await this.executeApiCall(
      new this.PostApiCaller(
        this,
        request,
        undefined,
        AuthleteApiImplV3.AUTH_AUTHORIZATION_ISSUE_API_PATH,
        this.mServiceId
      )
    );
    const params = await response.json();

    const authIssueResponse = new AuthorizationIssueResponse()
      .setAction(params.action)
      .setResponseContent(params.responseContent);

    return authIssueResponse;
  }

  // TODO Token Endpoint
  public async token() {}

  public async pushAuthorizationRequest(
    request: PushedAuthReqRequest
  ): Promise<PushedAuthReqResponse> {
    const response = await this.executeApiCall(
      new this.PostApiCaller(
        this,
        request,
        undefined,
        AuthleteApiImplV3.PUSHED_AUTH_REQ_API_PATH,
        this.mServiceId
      )
    );

    const params = await response.json();

    const parResonse = new PushedAuthReqResponse();
    // TODO Comfirm is this correct
    const clientAuthMethod = ClientAuthMethod.parse(params.clientAuthMethod);
    parResonse.setAction(params.action);
    parResonse.setDpopNonce(params.dpopNonce);
    parResonse.setResponseContent(params.responseContent);
    parResonse.setResultCode(response.status.toString());
    parResonse.setResultMessage(response.statusText);
    clientAuthMethod && parResonse.setClientAuthMethod(clientAuthMethod);
    parResonse.setRequestUri(new URL(params.requestUri));

    return parResonse;
  }
}

abstract class ApiCaller implements AuthleteApiCall {
  protected readonly mPath: string;
  protected readonly mRequest: unknown;
  protected readonly mParams: Map<string, unknown[]> = new Map<
    string,
    unknown[]
  >();

  constructor(request: unknown, path: string);
  constructor(request: unknown, format: string, ...args: unknown[]);
  constructor(
    request: unknown,
    path?: string,
    format?: string,
    ...args: unknown[]
  ) {
    if (!path && !format) {
      throw new Error('Either path or format must be provided');
    }
    if (path) {
      this.mPath = path;
    } else if (format && args.length > 0) {
      let replaced = '';
      args.forEach((arg) => {
        replaced = format.replace(/%d/g, arg as string);
      });
      this.mPath = replaced;
    } else {
      this.mPath = '';
    }
    this.mRequest = request;
  }

  abstract call(): Promise<Response>;

  public addParam(name: string, ...values: unknown[]): ApiCaller {
    this.mParams.set(name, values);
    return this;
  }
}
