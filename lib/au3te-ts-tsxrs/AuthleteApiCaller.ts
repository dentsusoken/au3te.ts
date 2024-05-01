import { AuthleteApi } from '../au3te-ts-common/api/AuthleteApi';
import { AuthorizationRequest } from '../au3te-ts-common/dto/AuthorizationRequest';
import { AuthorizationResponse } from '../au3te-ts-common/dto/AuthorizationResponse';
import { PushedAuthReqRequest } from '../au3te-ts-common/dto/PushedAuthReqRequest';
import { PushedAuthReqResponse } from '../au3te-ts-common/dto/PushedAuthReqResponse';
import { URLCoder } from '../au3te-ts-common/web/URLCoder';

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
  // TODO Authorization Endpoint
  public async callAuthorization(
    parameters: Record<string, string>
  ): Promise<AuthorizationResponse> {
    const params = URLCoder.formUrlEncode(parameters);
    return this.callAuthorizationInternal(params);
  }

  private async callAuthorizationInternal(
    parameters?: string
  ): Promise<AuthorizationResponse> {
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

  /**
   * Call Authlete's {@code /api/auth/authorization/issue} API.
   */
  // TODO Authorization Endpoint
  private async callAuthorizationIssue() {
    // return this.mApi.authorizationIssue(new AuthorizationIssueRequest());
  }

  /**
   * Issue an authorization code, an ID token and/or an access token.
   * This method calls Authlete's {@code /api/auth/authorization/issue} API.
   */
  // TODO Authorization Endpoint
  public async authorizationIssue() {}

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

  public unknownAction(path: string, action: unknown): Error {
    // Error message.
    const message = `Authlete ${path} API returned an unknown action: ${action}`;

    // 500 Internal Server Error
    return new Error(message);
  }
}
