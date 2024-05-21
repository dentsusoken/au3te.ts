import { AuthleteApi } from '../au3te-ts-common/api/AuthleteApi';
import { IntrospectionRequest } from '../au3te-ts-common/dto/IntrospectionRequest';
import { BearerToken } from '../au3te-ts-common/web/BearerToken';
import { DpopToken } from '../au3te-ts-common/web/DpopToken';
import { AccessTokenValidator } from './AccessTokenValidator';
import { BaseEndpoint } from './BaseEndpoint';

export class BaseResourceEndpoint extends BaseEndpoint {
  public extractAccessToken(
    authorization: string,
    accessTokenInRequestParameters: string
  ) {
    let accessToken = DpopToken.parse(authorization);

    if (!accessToken) {
      accessToken = BearerToken.parse(authorization);
    }

    if (!accessToken) {
      accessToken = accessTokenInRequestParameters;
    }
    return accessToken;
  }

  validateAccessToken(api: AuthleteApi, request: IntrospectionRequest) {
    try {
      return new AccessTokenValidator(api).validate(request);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      this.onError(e);
      throw e;
    }
  }
}
