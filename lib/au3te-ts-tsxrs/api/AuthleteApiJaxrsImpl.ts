import { AuthleteApi } from '../../au3te-ts-common/api/AuthleteApi';
import { AuthleteConfiguration } from '../../au3te-ts-common/conf/AuthleteConfiguration';
import { AuthorizationIssueRequest } from '../../au3te-ts-common/dto/AuthorizationIssueRequest';
import { AuthorizationIssueResponse } from '../../au3te-ts-common/dto/AuthorizationIssueResponse';
import { AuthorizationRequest } from '../../au3te-ts-common/dto/AuthorizationRequest';
import { AuthorizationResponse } from '../../au3te-ts-common/dto/AuthorizationResponse';
import { CredentialIssuerMetadataRequest } from '../../au3te-ts-common/dto/CredentialIssuerMetadataRequest';
import { CredentialIssuerMetadataResponse } from '../../au3te-ts-common/dto/CredentialIssuerMetadataResponse';
import { CredentialSingleIssueRequest } from '../../au3te-ts-common/dto/CredentialSingleIssueRequest';
import { CredentialSingleIssueResponse } from '../../au3te-ts-common/dto/CredentialSingleIssueResponse';
import { CredentialSingleParseRequest } from '../../au3te-ts-common/dto/CredentialSingleParseRequest';
import { CredentialSingleParseResponse } from '../../au3te-ts-common/dto/CredentialSingleParseResponse';
import { IntrospectionRequest } from '../../au3te-ts-common/dto/IntrospectionRequest';
import { IntrospectionResponse } from '../../au3te-ts-common/dto/IntrospectionResponse';
import { PushedAuthReqRequest } from '../../au3te-ts-common/dto/PushedAuthReqRequest';
import { PushedAuthReqResponse } from '../../au3te-ts-common/dto/PushedAuthReqResponse';
import { ServiceConfigurationRequest } from '../../au3te-ts-common/dto/ServiceConfigurationRequest';
import { TokenRequest } from '../../au3te-ts-common/dto/TokenRequest';
import { TokenResponse } from '../../au3te-ts-common/dto/TokenResponse';
import { MediaType } from '../../util/mediaType';

export abstract class AuthleteApiJaxrsImpl implements AuthleteApi {
  private static readonly JSON_UTF8_TYPE =
    MediaType.APPLICATION_JSON_TYPE.withCharset('UTF-8');

  private readonly mBaseUrl: string;
  // private readonly mSettings: Settings;

  constructor(configuration: AuthleteConfiguration) {
    if (!configuration) {
      throw new Error('configuration is null.');
    }

    this.mBaseUrl = configuration.getBaseUrl();
    // this.mSettings = new Settings();
  }
  abstract authorization(
    request: AuthorizationRequest
  ): Promise<AuthorizationResponse>;

  abstract authorizationIssue(
    request: AuthorizationIssueRequest
  ): Promise<AuthorizationIssueResponse>;

  abstract token(request: TokenRequest): Promise<TokenResponse>;
  abstract tokenDelete(token: string): void;

  abstract pushAuthorizationRequest(
    request: PushedAuthReqRequest
  ): Promise<PushedAuthReqResponse>;

  abstract credentialSingleParse(
    request: CredentialSingleParseRequest
  ): Promise<CredentialSingleParseResponse>;
  abstract credentialSingleIssue(
    request: CredentialSingleIssueRequest
  ): Promise<CredentialSingleIssueResponse>;
  abstract introspection(
    request: IntrospectionRequest
  ): Promise<IntrospectionResponse>;
  abstract getServiceConfiguration(
    request?: ServiceConfigurationRequest,
    pretty?: boolean
  ): Promise<string>;
  abstract credentialIssuerMetadata(
    request: CredentialIssuerMetadataRequest
  ): Promise<CredentialIssuerMetadataResponse>;

  protected getTarget(): string {
    return this.mBaseUrl;
  }

  protected async executeApiCall(apiCall: AuthleteApiCall): Promise<Response> {
    try {
      return await apiCall.call();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const message = `Failed to call Authlete API.: ${e.message}`;
      throw new Error(message);
    }
  }

  protected async callPostApi(
    auth: string,
    path: string,
    request: unknown
  ): Promise<Response> {
    const url = `${this.getTarget()}${path}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': AuthleteApiJaxrsImpl.JSON_UTF8_TYPE,
        Authorization: auth,
      },
      body: JSON.stringify(request),
    });

    return response;
  }

  protected async callGetApi(
    auth: string,
    path: string,
    request: Record<string, unknown[]>
  ): Promise<Response> {
    const url = new URL(`${this.getTarget()}${path}`);

    Object.entries(request).forEach(([key, value]) => {
      url.searchParams.append(
        key,
        typeof value === 'string' ? value : JSON.stringify(value)
      );
    });
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': AuthleteApiJaxrsImpl.JSON_UTF8_TYPE,
        Authorization: auth,
      },
    });
    return response;
  }
}

export interface AuthleteApiCall {
  call(): Promise<Response>;
}
