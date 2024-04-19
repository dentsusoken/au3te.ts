import AuthleteApi from '../au3te-ts-common/api/AuthleteApi';
import PushedAuthReqResponse, {
  Action,
} from '../au3te-ts-common/dto/PushedAuthReqResponse';
import BasicCredentials from '../au3te-ts-common/web/BasicCredentials';
import BaseHandler from './BaseHandler';
import ResponseUtil from './ResponseUtil';

/**
 * Handler for pushed authorization request endpoint requests.
 */
export default class PushedAuthReqHandler extends BaseHandler {
  /**
   * Constructor with an implementation of `AuthleteApi` interface.
   */
  constructor(api: AuthleteApi) {
    super(api);
  }

  /**
   * Handle a PAR request.
   */

  /**
   * Handle a PAR request.
   */
  public async handle(
    params: Params
    // authorization: string,
    // clientCertificatePath: string[]
  ): Promise<Response> {
    // const params: Params = new Params();
    // params.setparameters(parameters);
    // params.setAuthorization(authorization);
    // params.setclientCertificatePath(clientCertificatePath);
    const authorization = params.getAuthorization();
    const credentials =
      typeof authorization === 'string'
        ? BasicCredentials.parse(authorization)
        : null;

    const clientId = credentials?.getUserId();
    const clientSecret = credentials?.getPassword();
    try {
      return this.process(
        params.getParameters() ?? {},
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
  /**
   * Process the parameters of the pushed authorization request.
   */
  private async process(
    parameters?: Record<string, string>,
    clientId?: string,
    clientSecret?: string,
    clientCertificatePath?: string[],
    dpop?: string,
    htm?: string,
    htu?: string
  ): Promise<Response> {
    let clientCertificate: string | undefined = undefined;
    if (clientCertificatePath && clientCertificatePath.length > 0) {
      clientCertificate = clientCertificatePath[0];
      if (clientCertificatePath.length > 1) {
        clientCertificatePath = clientCertificatePath.slice(1);
      }
    }

    const response: PushedAuthReqResponse =
      await this.getApiCaller().callPushedAuthReq(
        parameters,
        clientId,
        clientSecret,
        clientCertificate,
        clientCertificatePath,
        dpop,
        htm,
        htu
      );

    const action: Action | undefined = response.getAction();
    const content: string | undefined = response.getResponseContent();
    const headers: Record<string, unknown> = this.prepareHeaders(response);
    switch (action) {
      case Action.BAD_REQUEST:
        return ResponseUtil.badRequest(content, headers);
      case Action.CREATED:
        return ResponseUtil.created(content, headers);
      case Action.FORBIDDEN:
        return ResponseUtil.forbidden(content, headers);
      case Action.INTERNAL_SERVER_ERROR:
        return ResponseUtil.internalServerError(content, headers);
      case Action.PAYLOAD_TOO_LARGE:
        return ResponseUtil.tooLarge(content, headers);
      case Action.UNAUTHORIZED:
        return ResponseUtil.unauthorized(content, undefined, headers);
      default:
        throw this.getApiCaller().unknownAction('/api/pushed_auth_req', action);
    }
  }

  private prepareHeaders(
    response: PushedAuthReqResponse
  ): Record<string, string> {
    // const headers: Map<string, string> = new Map<string, string>();
    const dpopNonce: string | undefined = response.getDpopNonce();
    if (dpopNonce) {
      //   headers.set('DPoP-Nonce', dpopNonce);
      return { 'DPoP-Nonce': dpopNonce };
    }
    return {};
  }
}

// namespace PushedAuthReqHandler {
export class Params {
  private parameters?: { [key: string]: string };
  private authorization?: string;
  private clientCertificatePath?: string[];
  private dpop?: string;
  private htm?: string;
  private htu?: string;

  public setParameters(parameters: { [key: string]: string }) {
    this.parameters = parameters;
  }
  public setAuthorization(authorization: string) {
    this.authorization = authorization;
  }
  public setClientCertificatePath(clientCertificatePath: string[]) {
    this.clientCertificatePath = clientCertificatePath;
  }
  public setDpop(dpop: string) {
    this.dpop = dpop;
  }
  public setHtm(htm: string) {
    this.htm = htm;
  }
  public setHtu(htu: string) {
    this.htu = htu;
  }

  public getParameters(): { [key: string]: string } | undefined {
    return this.parameters;
  }
  public getAuthorization(): string | undefined {
    return this.authorization;
  }
  public getClientCertificatePath(): string[] | undefined {
    return this.clientCertificatePath;
  }
  public getDpop(): string | undefined {
    return this.dpop;
  }
  public getHtm(): string | undefined {
    return this.htm;
  }
  public getHtu(): string | undefined {
    return this.htu;
  }
}
