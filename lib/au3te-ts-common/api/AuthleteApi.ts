import { PushedAuthReqRequest } from '../../au3te-ts-common/dto/PushedAuthReqRequest';
import { PushedAuthReqResponse } from '../../au3te-ts-common/dto/PushedAuthReqResponse';
import { AuthorizationIssueRequest } from '../dto/AuthorizationIssueRequest';
import { AuthorizationIssueResponse } from '../dto/AuthorizationIssueResponse';
import { AuthorizationRequest } from '../dto/AuthorizationRequest';
import { AuthorizationResponse } from '../dto/AuthorizationResponse';
import { CredentialIssuerMetadataRequest } from '../dto/CredentialIssuerMetadataRequest';
import { CredentialIssuerMetadataResponse } from '../dto/CredentialIssuerMetadataResponse';
import { CredentialSingleIssueRequest } from '../dto/CredentialSingleIssueRequest';
import { CredentialSingleIssueResponse } from '../dto/CredentialSingleIssueResponse';
import { CredentialSingleParseRequest } from '../dto/CredentialSingleParseRequest';
import { CredentialSingleParseResponse } from '../dto/CredentialSingleParseResponse';
import { IntrospectionRequest } from '../dto/IntrospectionRequest';
import { IntrospectionResponse } from '../dto/IntrospectionResponse';
import { TokenRequest } from '../dto/TokenRequest';
import { TokenResponse } from '../dto/TokenResponse';

interface AuthleteApi {
  /**
   * Call Authlete's {@code /auth/authorization} API.
   *
   * @param request
   *         Request parameters passed to the API.
   *
   * @return
   *         Response from the API.
   */
  authorization(request: AuthorizationRequest): Promise<AuthorizationResponse>;

  /**
   * Call Authlete's {@code /auth/authorization/fail} API.
   *
   * @param request
   *         Request parameters passed to the API.
   *
   * @return
   *         Response from the API.
   */
  // authorizationFail(
  //   request: AuthorizationFailRequest
  // ): Promise<AuthorizationFailResponse>;

  /**
   * Call Authlete's {@code /auth/authorization/issue} API.
   *
   * @param request
   *         Request parameters passed to the API.
   *
   * @return
   *         Response from the API.
   */
  authorizationIssue(
    request: AuthorizationIssueRequest
  ): Promise<AuthorizationIssueResponse>;

  token(request: TokenRequest): Promise<TokenResponse>;

  tokenDelete(token: string): void;
  /**
   * Call Authlete's `/api/pushed_auth_req` API.
   * @param request Request parameters passed to the API.
   * @return Response from the API.
   */
  pushAuthorizationRequest(
    request: PushedAuthReqRequest
  ): Promise<PushedAuthReqResponse>;

  introspection(request: IntrospectionRequest): Promise<IntrospectionResponse>;
  getCredentialIssuerMetadata(
    request: CredentialIssuerMetadataRequest
  ): Promise<CredentialIssuerMetadataResponse>;
  credentialSingleParse(
    request: CredentialSingleParseRequest
  ): Promise<CredentialSingleParseResponse>;
  credentialSingleIssue(
    request: CredentialSingleIssueRequest
  ): Promise<CredentialSingleIssueResponse>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace AuthleteApi {
  export function instanceofAuthleteApi(obj: unknown): obj is AuthleteApi {
    return (obj as AuthleteApi).pushAuthorizationRequest !== undefined;
  }
}

export { AuthleteApi };
