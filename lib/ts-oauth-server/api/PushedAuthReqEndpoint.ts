import { Request, Response } from 'express';
import { AuthleteApi, AuthleteApiFactory } from 'authlete-js';
import { BasePushedAuthReqEndpoint, Params } from 'authlete-js';

/**
 * An implementation of a pushed authorization endpoint.
 *
 * @see <a href="https://tools.ietf.org/html/draft-lodderstedt-oauth-par"
 *      >OAuth 2.0 Pushed Authorization Requests</a>
 *
 *
 */
export class PushedAuthReqEndpoint extends BasePushedAuthReqEndpoint {
  /**
   * The pushed authorization request endpoint. This uses the
   * `POST` method and the same client authentication as
   * is available on the Token Endpoint.
   */
  public post(request: Request, response: Response): Response {
    // Authlete API
    const authleteApi: AuthleteApi = AuthleteApiFactory.getDefaultApi();

    // Parameters for Authlete's pushed_auth_req API.
    const params: Params = this.buildParams(request);

    // Handle the PAR request.
    return this.handle(authleteApi, params);
  }

  private buildParams(request: Request): Params {
    const params: Params = new Params();

    // RFC 6749
    // The OAuth 2.0 Authorization Framework
    params
      .setParameters(request.body)
      .setAuthorization(request.headers.authorization);

    // MTLS
    // RFC 8705 : OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens
    params.setClientCertificatePath(
      this.extractClientCertificateChain(request)
    );

    // DPoP
    // RFC 9449 : OAuth 2.0 Demonstrating Proof of Possession (DPoP)
    params.setDpop(request.headers['DPoP']).setHtm('POST');
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
