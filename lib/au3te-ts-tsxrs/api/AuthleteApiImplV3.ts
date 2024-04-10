export class AuthleteApiImplV3 extends AuthleteApiJaxrsImpl {
  /**
   * The constructor with an instance of {@link AuthleteConfiguration}.
   *
   * <p>
   * The existence of a constructor of this type is a required by
   * {@link com.authlete.common.api.AuthleteApiFactory AuthleteApiFactory}.
   * </p>
   *
   * @param configuration
   *         An instance of {@link AuthleteConfiguration}.
   */
  constructor(configuration: AuthleteConfiguration) {
    super(configuration);

    // Authlete API version specified by the configuration.
    const version: AuthleteApiVersion = AuthleteApiVersion.parse(
      configuration.getApiVersion()
    );

    if (version !== AuthleteApiVersion.V3) {
      throw new Error(
        'Configuration must be set to V3 for this implementation.'
      );
    }

    this.mAuth = createCredentials(configuration);
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
      if (this.isDpopEnabled()) {
        return 'DPoP ' + configuration.getServiceAccessToken();
      } else {
        return 'Bearer ' + configuration.getServiceAccessToken();
      }
    } else {
      throw new Error('V3 API requires an access token, not a key and secret');
    }
  }

  private abstract class ApiCaller<TResponse> implements AuthleteApiCall<TResponse> {
    protected readonly mPath: string;
    protected readonly mRequest: any;
    protected readonly mResponseClass: new () => TResponse;
    protected readonly mParams: Map<string, any[]> = new Map<string, any[]>();

    constructor(responseClass: new () => TResponse, request: any, path: string) {
        this.mPath = path;
        this.mRequest = request;
        this.mResponseClass = responseClass;
    }

    constructor(responseClass: new () => TResponse, request: any, format: string, ...args: any[]) {
        this(responseClass, request, format.replace(/\{(\d+)\}/g, (_, index) => args[index]));
    }

    public addParam(name: string, ...values: any[]): ApiCaller<TResponse> {
        this.mParams.set(name, values);
        return this;
    }
}


  private class PostApiCaller<TResponse> extends ApiCaller<TResponse> {
    constructor(responseClass: new () => TResponse, request: any, path: string) {
        super(responseClass, request, path);
    }

    constructor(responseClass: new () => TResponse, request: any, format: string, ...args: any[]) {
        super(responseClass, request, format, args);
    }

    call(): TResponse {
        return this.callPostApi(this.mPath, this.mRequest, this.mResponseClass);
    }
}


  private callPostApi<TResponse>(
    path: string,
    request: any,
    responseClass: new () => TResponse
  ): TResponse {
    return this.callPostApi(this.mAuth, path, request, responseClass);
  }

  public pushAuthorizationRequest(
    request: PushedAuthReqRequest
  ): Promise<PushedAuthReqResponse> {
    return this.executeApiCall<PushedAuthReqResponse>(
      new PostApiCaller<PushedAuthReqResponse>(
        PushedAuthReqResponse,
        request,
        PUSHED_AUTH_REQ_API_PATH,
        this.mServiceId
      )
    );
  }
}
