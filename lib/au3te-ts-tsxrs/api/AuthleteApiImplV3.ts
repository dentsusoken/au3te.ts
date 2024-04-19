import AuthleteApiVersion from '../../au3te-ts-common/conf/AuthleteApiVersion';
import AuthleteConfiguration from '../../au3te-ts-common/conf/AuthleteConfiguration';
import PushedAuthReqRequest from '../../au3te-ts-common/dto/PushedAuthReqRequest';
import PushedAuthReqResponse from '../../au3te-ts-common/dto/PushedAuthReqResponse';
import ClientAuthMethod from '../../au3te-ts-common/types/ClientAuthMethod';
import AuthleteApiJaxrsImpl, { AuthleteApiCall } from './AuthleteApiJaxrsImpl';

export default class AuthleteApiImplV3 extends AuthleteApiJaxrsImpl {
  private static readonly PUSHED_AUTH_REQ_API_PATH: string =
    '/api/%d/pushed_auth_req';
  // '/api/3586851703/pushed_auth_req';

  private readonly mAuth: string;
  // TODO Java Long -> TypeScript number?
  private readonly mServiceId: number | null;
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
    const version: AuthleteApiVersion | null = AuthleteApiVersion.parse(
      configuration.getApiVersion()
    );

    if (version !== AuthleteApiVersion.V3) {
      throw new Error(
        'Configuration must be set to V3 for this implementation.'
      );
    }

    this.mAuth = this.createCredentials(configuration);
    if (configuration.getServiceApiKey() !== null) {
      this.mServiceId = parseInt(configuration.getServiceApiKey());
    } else {
      this.mServiceId = null;
    }
  }

  /**
   * Create an authorization header for the access token.
   */
  private createCredentials(configuration: AuthleteConfiguration): string {
    if (configuration.getServiceAccessToken() !== null) {
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
      // responseClass: new () => TResponse,
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
      return await this.api.callPostApi(
        this.mPath,
        this.mRequest
        // this.mResponseClass
      );
    }
  };

  // TODO private method in Java
  protected async callPostApi(
    path: string,
    request: unknown
  ): Promise<Response> {
    return await super.callPostApi(this.mAuth, path, request);
  }

  // TODO implement this method
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
    parResonse.setAction(params.action);
    parResonse.setDpopNonce(params.dpopNonce);
    parResonse.setResponseContent(params.responseContent);
    parResonse.setResultCode(response.status.toString());
    parResonse.setResultMessage(response.statusText);
    parResonse.setClientAuthMethod(ClientAuthMethod[params.clientAuthMethod]);
    parResonse.setRequestUri(new URL(params.requestUri));

    return parResonse;
  }
}

// private class(do not export)
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
    // Throw Error when both path and format are not provided
    // if path is not provided, format must be provided
    // TODO implment logic to check args[index] is string
    // this.mPath = path ? path : '';

    // this.mPath =
    //   Array.isArray(args) && typeof format === 'string'
    //     ? format.replace(/\{(\d+)\}/g, (_, index) => args[index] as string)
    //     : path!;
    if (path) {
      this.mPath = path;
    } else if (format && args.length > 0) {
      // this.mPath = format.replace(/%d/g, (_, index) => args[index] as string);
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
