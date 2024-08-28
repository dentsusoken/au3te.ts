import { AuthleteApi } from '../../au3te-ts-common/api/AuthleteApi';
import { AuthleteApiFactory } from '../../au3te-ts-common/api/AuthleteApiFactory';
import { BaseTokenEndpoint } from '../../au3te-ts-tsxrs/BaseTokenEndpoint';
import { Params } from '../../au3te-ts-tsxrs/TokenRequestHandler';
import { MediaType } from '../../util/mediaType';
import { getQueryParams } from '../../util/queryParams';
import { OBBTokenTask } from './OBBTokenTask';
import { TokenRequestHandlerSpiImpl } from './TokenRequestHandlerSpiImpl';
export class TokenEndpoint extends BaseTokenEndpoint {
  public async post(request: Request): Promise<Response> {
    if (
      !MediaType.APPLICATION_FORM_URLENCODED.isEquals(
        request.headers.get('Content-Type')
      )
    ) {
      return new Response(null, { status: 400 });
    }
    const parameters = await getQueryParams(request);
    const authleteApi: AuthleteApi = await AuthleteApiFactory.getDefaultApi();
    const response: Response = await this.processTokenRequest(
      authleteApi,
      request,
      parameters
    );

    this.doTasks(authleteApi, request, parameters, response.clone());

    return response;
  }
  private async processTokenRequest(
    authleteApi: AuthleteApi,
    request: Request,
    parameters: Record<string, string>
  ): Promise<Response> {
    const params = await this.buildParams(request, parameters);
    return this.handle(
      authleteApi,
      new TokenRequestHandlerSpiImpl(authleteApi),
      params
    );
  }
  private async buildParams(
    request: Request,
    parameters: Record<string, string>
  ) {
    const params = new Params();
    params
      .setParameters(parameters)
      .setAuthorization(request.headers.get('Authorization') || '');

    // params.setClientCertificatePath(
    //   (await this.extractClientCertificateChain(request)) || []
    // );

    params.setDpop(request.headers.get('DPoP') || '').setHtm('POST');

    return params;
  }

  private async doTasks(
    authleteApi: AuthleteApi,
    request: Request,
    requestParams: Record<string, string>,
    response: Response
  ): Promise<void> {
    const responseParams = await response.json();
    const { access_token } = responseParams;
    if (access_token) {
      console.info('Access Token issued successfully');
    }
    new OBBTokenTask().process(
      authleteApi,
      request,
      requestParams,
      response,
      responseParams
    );
  }
}
