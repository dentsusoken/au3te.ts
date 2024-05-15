import { AuthleteApi } from '../../au3te-ts-common/api/AuthleteApi';
import { format } from '../../util/StringFormatter';
import { ConsentDao } from '../obb/database/ConsentDao';
import { Consent } from '../obb/model/Consent';
import { ObbUtils } from '../obb/util/ObbUtils';

export class OBBTokenTask {
  public process(
    authleteApi: AuthleteApi,
    _request: Request,
    requestParams: Record<string, string>,
    response: Response,
    responseParams: Record<string, unknown>
  ) {
    if (
      !OBBTokenTask.needsProcessing(requestParams, response, responseParams)
    ) {
      return;
    }

    const consentId = OBBTokenTask.extractConsentId(responseParams);
    if (!consentId) {
      return;
    }

    const consent = ConsentDao.getInstance().read(consentId);

    if (!consent) {
      OBBTokenTask.deleteAccessToken(authleteApi, responseParams);
      throw new Error(
        `invalid_request: 
        ${format(
          "There is no consent corresponding to the consent ID '{}'.",
          consentId
        )}
        `
      );
    }
    OBBTokenTask.doConsentTaskOnRefreshToken(
      authleteApi,
      responseParams,
      consent
    );
  }
  private static needsProcessing(
    requestParams: Record<string, string>,
    response: Response,
    responseParams: Record<string, unknown>
  ) {
    if (response.status !== 200) {
      return false;
    }
    const grantType = requestParams['grant_type'];
    if (grantType && grantType === 'refresh_token') {
      return false;
    }
    if (!Object.keys(responseParams).find((key) => key === 'refresh_token')) {
      return false;
    }
    return true;
  }

  private static extractConsentId(responseParams: Record<string, unknown>) {
    const scope = responseParams['scope'] as string;

    if (!scope) {
      return;
    }

    const scopes = scope.split(' +');
    const consentScope = ObbUtils.extractConsentScope(scopes);

    if (!consentScope) {
      return;
    }
    return consentScope.substring(8);
  }

  private static deleteAccessToken(
    authleteApi: AuthleteApi,
    responseParams: Record<string, unknown>
  ) {
    const accessToken = responseParams['access_token'] as string;
    if (!accessToken) {
      return;
    }
    try {
      authleteApi.tokenDelete(accessToken);
    } catch (_) {
      // ignore
    }
  }

  private static doConsentTaskOnRefreshToken(
    authleteApi: AuthleteApi,
    responseParams: Record<string, unknown>,
    consent: Consent
  ) {
    const refreshToken = responseParams['refresh_token'] as string;
    this.changeRefreshTokenExpirationDate(
      authleteApi,
      refreshToken,
      consent.getExpirationDateTime()
    );

    consent.setRefreshToken(refreshToken);
    ConsentDao.getInstance().update(consent);
  }

  private static changeRefreshTokenExpirationDate(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _authleteApi: AuthleteApi,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _refreshToken: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _expirationDate: string
  ) {
    // TODO
    // Authlete will provide an API whereby to change the expiration date
    // of a refresh token.
  }
}
