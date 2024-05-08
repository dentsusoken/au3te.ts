import { PushedAuthReqRequest } from '../../au3te-ts-common/dto/PushedAuthReqRequest';
import { PushedAuthReqResponse } from '../../au3te-ts-common/dto/PushedAuthReqResponse';
import { AuthorizationIssueRequest } from '../dto/AuthorizationIssueRequest';
import { AuthorizationIssueResponse } from '../dto/AuthorizationIssueResponse';
import { AuthorizationRequest } from '../dto/AuthorizationRequest';
import { AuthorizationResponse } from '../dto/AuthorizationResponse';

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
  /**
   * Call Authlete's `/api/pushed_auth_req` API.
   * @param request Request parameters passed to the API.
   * @return Response from the API.
   */
  pushAuthorizationRequest(
    request: PushedAuthReqRequest
  ): Promise<PushedAuthReqResponse>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace AuthleteApi {
  export function instanceofAuthleteApi(obj: unknown): obj is AuthleteApi {
    return (obj as AuthleteApi).pushAuthorizationRequest !== undefined;
  }
}

export { AuthleteApi };
