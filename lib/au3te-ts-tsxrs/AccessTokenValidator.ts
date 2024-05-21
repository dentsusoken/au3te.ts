import { AuthleteApi } from '../au3te-ts-common/api/AuthleteApi';
import { IntrospectionRequest } from '../au3te-ts-common/dto/IntrospectionRequest';
import {
  Action,
  IntrospectionResponse,
} from '../au3te-ts-common/dto/IntrospectionResponse';
import { Status } from '../util/status';
import { BaseHandler } from './BaseHandler';
import { ResponseUtil } from './ResponseUtil';

export class AccessTokenValidator extends BaseHandler {
  constructor(api: AuthleteApi) {
    super(api);
  }

  validate(request: IntrospectionRequest) {
    try {
      return this.process(request);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (!e.message) {
        throw e;
      } else {
        throw this.unexpected('Unexpected error in AccessTokenValidator', e);
      }
    }
  }
  async process(request: IntrospectionRequest) {
    const response: IntrospectionResponse =
      await this.getApiCaller().callIntrospectionInternal(request);
    this.handleIntrospectionResponse(response);

    return response;
  }
  handleIntrospectionResponse(response: IntrospectionResponse) {
    const action = response.getAction();
    const content = response.getResponseContent() || '';

    const headers = this.prepareHeaders(response);

    switch (action as Action) {
      case Action.INTERNAL_SERVER_ERROR:
        // 500 Internal Server Error
        throw this.toException(Status.INTERNAL_SERVER_ERROR, content, headers);

      case Action.BAD_REQUEST:
        // 400 Bad Request
        throw this.toException(Status.BAD_REQUEST, content, headers);

      case Action.UNAUTHORIZED:
        // 401 Unauthorized
        throw this.toException(Status.UNAUTHORIZED, content, headers);

      case Action.FORBIDDEN:
        // 403 Forbidden
        throw this.toException(Status.FORBIDDEN, content, headers);

      case Action.OK:
        return;

      default:
        // This never happens.
        throw this.getApiCaller().unknownAction(
          '/api/auth/introspection',
          action
        );
    }
  }
  prepareHeaders(response: IntrospectionResponse) {
    const headers: Record<string, unknown> = {};

    const dpopNonce = response.getDpopNonce();
    if (dpopNonce) {
      headers['DPoP-Nonce'] = dpopNonce;
    }

    return headers;
  }
  toException(
    status: number,
    challenge: string,
    headers: Record<string, unknown>
  ) {
    const response = ResponseUtil.bearerError(status, challenge, headers);
    // TODO check if this method is correct
    return new Error(JSON.stringify(response));
  }
}
