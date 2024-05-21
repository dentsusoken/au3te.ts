import { AuthleteApi } from '../../au3te-ts-common/api/AuthleteApi';
import { AuthleteApiFactory } from '../../au3te-ts-common/api/AuthleteApiFactory';
import { BasePushedAuthReqEndpoint } from '../../au3te-ts-tsxrs/BasePushedAuthReqEndpoint';
import { Params } from '../../au3te-ts-tsxrs/PushedAuthReqHandler';
import { MediaType } from '../../util/MediaType';

/**
 * An implementation of a pushed authorization endpoint.
 *
 * @see <a href="https://tools.ietf.org/html/draft-lodderstedt-oauth-par"
 *      >OAuth 2.0 Pushed Authorization Requests</a>
 */
export class PushedAuthReqEndpoint extends BasePushedAuthReqEndpoint {
  public async post(request: Request): Promise<Response> {
    // Authlete API
    const authleteApi: AuthleteApi = await AuthleteApiFactory.getDefaultApi();

    // Parameters for Authlete's pushed_auth_req API.
    const params: Params = await this.buildParams(request);

    // Handle the PAR request.
    return this.handle(authleteApi, params);
  }

  private async buildParams(request: Request): Promise<Params> {
    if (!request) {
      throw new Error('request is null.');
    }
    if (!request.body) {
      throw new Error('request.body is null.');
    }
    const params: Params = new Params();

    // RFC 6749
    // The OAuth 2.0 Authorization Framework
    if (
      MediaType.APPLICATION_JSON_TYPE.isEquals(
        request.headers.get('Content-Type')
      )
    ) {
      params.setParameters(await request.json());
    } else if (
      MediaType.APPLICATION_FORM_URLENCODED.isEquals(
        request.headers.get('Content-Type')
      )
    ) {
      const query = new URLSearchParams(await request.text());
      params.setParameters(Object.fromEntries(query.entries()));
    }
    params.setAuthorization(request.headers.get('Authorization') || '');

    // MTLS
    // RFC 8705 : OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens
    // params.setClientCertificatePath(
    //   this.extractClientCertificateChain(request)
    // );

    // DPoP
    // RFC 9449 : OAuth 2.0 Demonstrating Proof of Possession (DPoP)
    // params.setDpop(request.headers['DPoP']).setHtm('POST');
    //.setHtu(request.url)

    // We can reconstruct the URL of the PAR endpoint by calling
    // request.url and set it to params by the
    // setHtu(String) method. However, the calculated URL may be invalid
    // behind proxies.
    //
    // If "htu" is not set here, the "pushedAuthReqEndpoint" property of
    // "Service" (which can be configured by using Authlete's web console)
    // is referred to as the default value. Therefore, we don't call the
    // setHtu(String) method here intentionally. Note that this means you
    // have to set "pushedAuthReqEndpoint" properly to support DPoP.

    // Even the call of the setHtm(String) method can be omitted, too.
    // When "htm" is not set, "POST" is used as the default value.

    return params;
  }
}
