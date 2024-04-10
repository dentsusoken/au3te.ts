import { AuthleteApi, AuthleteApiException } from 'authlete';
import { AuthorizationFailRequest, AuthorizationFailResponse } from 'authlete';
import {
  AuthorizationIssueRequest,
  AuthorizationIssueResponse,
} from 'authlete';
import { AuthorizationRequest, AuthorizationResponse } from 'authlete';
import {
  BackchannelAuthenticationCompleteRequest,
  BackchannelAuthenticationCompleteResponse,
} from 'authlete';
import {
  BackchannelAuthenticationFailRequest,
  BackchannelAuthenticationFailResponse,
} from 'authlete';
import {
  BackchannelAuthenticationIssueRequest,
  BackchannelAuthenticationIssueResponse,
} from 'authlete';
import {
  BackchannelAuthenticationRequest,
  BackchannelAuthenticationResponse,
} from 'authlete';
import {
  ClientRegistrationRequest,
  ClientRegistrationResponse,
} from 'authlete';
import {
  CredentialIssuerMetadataRequest,
  CredentialIssuerMetadataResponse,
} from 'authlete';

class AuthleteApiCaller {
  private readonly mApi: AuthleteApi;

  constructor(api: AuthleteApi) {
    this.mApi = api;
  }

  /**
   * Create an {@link InternalServerErrorException} instance to indicate
   * that an Authlete API call failed.
   */
  private apiFailure(
    path: string,
    e: AuthleteApiException
  ): InternalServerErrorException {
    // Error message.
    const message = `Authlete ${path} API failed: ${e.getMessage()}`;

    // Response body in the response from the Authlete server.
    if (e.getResponseBody() != null) {
      // Append the content of the response body to the error message.
      message = `${message}: ${e.getResponseBody()}`;
    }

    // 500 Internal Server Error
    return internalServerError(message, e);
  }

  /**
   * Call Authlete's `/api/pushed_auth_req` API.
   */
  public callPushedAuthReq(
    parameters: string | Record<string, string>,
    clientId: string,
    clientSecret: string,
    clientCertificate: string,
    clientCertificatePath: string[],
    dpop: string,
    htm: string,
    htu: string
  ): PushedAuthReqResponse {
    const params =
      typeof parameters === 'string' ? parameters : formUrlEncode(parameters);

    return this.callPushedAuthReqInternal(
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

  private callPushedAuthReqInternal(
    parameters: string,
    clientId: string,
    clientSecret: string,
    clientCertificate: string,
    clientCertificatePath: string[],
    dpop: string,
    htm: string,
    htu: string
  ): PushedAuthReqResponse {
    const request: PushedAuthReqRequest = {
      parameters,
      clientId,
      clientSecret,
      clientCertificate,
      clientCertificatePath,
      dpop,
      htm,
      htu,
    };

    try {
      return this.mApi.pushAuthorizationRequest(request);
    } catch (e: AuthleteApiException) {
      // the API call failed
      throw apiFailure('/api/pushed_auth_req', e);
    }
  }
}
