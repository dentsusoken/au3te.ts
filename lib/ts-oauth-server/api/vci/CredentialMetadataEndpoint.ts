import { AuthleteApi } from '../../../au3te-ts-common/api/AuthleteApi';
import { AuthleteApiFactory } from '../../../au3te-ts-common/api/AuthleteApiFactory';
import { CredentialIssuerMetadataRequest } from '../../../au3te-ts-common/dto/CredentialIssuerMetadataRequest';
import { ExceptionUtil } from '../../util/ExceptionUtil';
import { ResponseUtil } from '../../util/ResponseUtil';
import { Action } from '../../../au3te-ts-common/dto/CredentialIssuerMetadataResponse';

export class CredentialMetadataEndpoint {
  async get(): Promise<Response> {
    const api = await AuthleteApiFactory.getDefaultApi();

    return this.metadata(api);
  }

  async metadata(api: AuthleteApi): Promise<Response> {
    const request = new CredentialIssuerMetadataRequest().setPretty(true);
    const response = await api.credentialIssuerMetadta(request);
    const content = response.getResponseContent();

    switch (response.getAction()) {
      case Action.NOT_FOUND:
        return ResponseUtil.notFoundJson(content);
      case Action.OK:
        return ResponseUtil.okJson(content);
      case Action.INTERNAL_SERVER_ERROR:
      default:
        throw ExceptionUtil.internalServerErrorExceptionJson(content);
    }
  }
}
