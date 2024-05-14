import { AuthleteApi } from '../au3te-ts-common/api/AuthleteApi';
import { Action, TokenResponse } from '../au3te-ts-common/dto/TokenResponse';
import { BasicCredentials } from '../au3te-ts-common/web/BasicCredentials';
import { BaseHandler } from './BaseHandler';
import { ResponseUtil } from './ResponseUtil';
import { TokenRequestHandlerSpi } from './spi/TokenRequestHandlerSpi';

export class TokenRequestHandler extends BaseHandler {
  private static readonly CHALLENGE = 'Basic realm="token"';
  private readonly mSpi: TokenRequestHandlerSpi;

  constructor(api: AuthleteApi, spi: TokenRequestHandlerSpi) {
    super(api);
    this.mSpi = spi;
  }
  handle(params: Params) {
    const credentials = BasicCredentials.parse(params.getAuthorization() || '');
    const clientId = credentials ? credentials.getUserId() : '';
    const clientSecret = credentials ? credentials.getPassword() : '';

    try {
      return this.process(
        params.getParameters(),
        clientId,
        clientSecret,
        params.getClientCertificatePath(),
        params.getDpop(),
        params.getHtm(),
        params.getHtu()
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.message) {
        throw e;
      } else {
        throw new Error('Unexpected error in PushedAuthReqHandler');
      }
    }
  }
  async process(
    parameters?: Record<string, string>,
    clientId?: string,
    clientSecret?: string,
    clientCertificatePath?: string[],
    dpop?: string,
    htm?: string,
    htu?: string
  ) {
    const properties = this.mSpi.getProperties();
    let clientCertificate = '';
    if (clientCertificatePath && clientCertificatePath.length > 0) {
      clientCertificate = clientCertificatePath[0];
      if (clientCertificatePath.length > 1) {
        clientCertificatePath = clientCertificatePath.slice(
          1,
          clientCertificatePath.length
        );
      }
    }
    const response = await this.getApiCaller().callToken(
      parameters || {},
      clientId || '',
      clientSecret || '',
      properties || [],
      clientCertificate,
      clientCertificatePath || [],
      dpop || '',
      htm || '',
      htu || ''
    );

    const action = response.getAction();
    const content = response.getResponseContent();

    const headers = this.prepareHeaders(response);

    switch (action) {
      case Action.INVALID_CLIENT:
        // 401 Unauthorized
        return ResponseUtil.unauthorized(
          content,
          TokenRequestHandler.CHALLENGE,
          headers
        );

      case Action.INTERNAL_SERVER_ERROR:
        // 500 Internal Server Error
        return ResponseUtil.internalServerError(content, headers);

      case Action.BAD_REQUEST:
        // 400 Bad Request
        return ResponseUtil.badRequest(content, headers);

      // case Action.PASSWORD:
      //   // Process the token request whose flow is "Resource Owner Password Credentials".
      //   return handlePassword(response, headers);

      case Action.OK:
        // 200 OK
        return ResponseUtil.ok(content, headers);

      // TODO Token Endpoint - Add more cases
      // case Action.TOKEN_EXCHANGE:
      //   // Process the token exchange request (RFC 8693)
      //   return handleTokenExchange(response, headers);

      // case Action.JWT_BEARER:
      //   // Process the token request which uses the grant type
      //   // urn:ietf:params:oauth:grant-type:jwt-bearer (RFC 7523).
      //   return handleJwtBearer(response, headers);

      // case Action.ID_TOKEN_REISSUABLE:
      //   // The flow of the token request is the refresh token flow
      //   // and an ID token can be reissued.
      //   return handleIdTokenReissuable(response, headers);

      default:
        // This never happens.
        throw this.getApiCaller().unknownAction('/api/auth/token', action);
    }
  }
  prepareHeaders(response: TokenResponse): Record<string, unknown> {
    const headers: Record<string, unknown> = {};

    const dpopNonce = response.getDpopNonce();
    if (dpopNonce) {
      headers['DPoP-Nonce'] = dpopNonce;
    }
    return headers;
  }
}

export class Params {
  private parameters?: Record<string, string>;
  private authorization?: string;
  private clientCertificatePath?: string[];
  private dpop?: string;
  private htm?: string;
  private htu?: string;

  getParameters(): Record<string, string> | undefined {
    return this.parameters;
  }
  setParameters(parameters: Record<string, string>): Params {
    this.parameters = parameters;
    return this;
  }
  getAuthorization(): string | undefined {
    return this.authorization;
  }
  setAuthorization(authorization: string): Params {
    this.authorization = authorization;
    return this;
  }
  getClientCertificatePath(): string[] | undefined {
    return this.clientCertificatePath;
  }
  setClientCertificatePath(clientCertificatePath: string[]): Params {
    this.clientCertificatePath = clientCertificatePath;
    return this;
  }
  getDpop(): string | undefined {
    return this.dpop;
  }
  setDpop(dpop: string): Params {
    this.dpop = dpop;
    return this;
  }
  getHtm(): string | undefined {
    return this.htm;
  }
  setHtm(htm: string): Params {
    this.htm = htm;
    return this;
  }
  getHtu(): string | undefined {
    return this.htu;
  }
}
