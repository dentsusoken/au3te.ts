import PushedAuthReqRequest from '../../au3te-ts-common/dto/PushedAuthReqRequest';
import PushedAuthReqResponse from '../../au3te-ts-common/dto/PushedAuthReqResponse';

interface AuthleteApi {
  /**
   * Call Authlete's `/api/pushed_auth_req` API.
   * @param request Request parameters passed to the API.
   * @return Response from the API.
   * @since 2.51
   */
  pushAuthorizationRequest(
    request: PushedAuthReqRequest
  ): PushedAuthReqResponse;
}

namespace AuthleteApi {
  export function instanceofAuthleteApi(obj: any): obj is AuthleteApi {
    return obj.pushAuthorizationRequest !== undefined;
  }
}

export default AuthleteApi;
