import { AuthleteApi } from '../../../au3te-ts-common/api/AuthleteApi';
import { CredentialIssuanceOrder } from '../../../au3te-ts-common/dto/CredentialIssuanceOrder';
import { CredentialIssuerMetadataRequest } from '../../../au3te-ts-common/dto/CredentialIssuerMetadataRequest';
import { Action } from '../../../au3te-ts-common/dto/CredentialIssuerMetadataResponse';
import { CredentialRequestInfo } from '../../../au3te-ts-common/dto/CredentialRequestInfo';
import { IntrospectionRequest } from '../../../au3te-ts-common/dto/IntrospectionRequest';
import { IntrospectionResponse } from '../../../au3te-ts-common/dto/IntrospectionResponse';
import { BaseResourceEndpoint } from '../../../au3te-ts-tsxrs/BaseResourceEndpoint';
import { OrderContext } from '../../vc/OrderContext';
import { OrderFormat } from '../../vc/OrderFormat';

export class AbstractCredentialEndpoint extends BaseResourceEndpoint {
  protected async computeHtu(
    api: AuthleteApi,
    dpop: string,
    endpointName: string
  ): Promise<string | undefined> {
    if (!dpop) {
      return;
    }
    return (await this.getCredentialIssuerMetadata(api))[endpointName];
  }

  private async getCredentialIssuerMetadata(
    api: AuthleteApi
  ): Promise<Record<string, string>> | never {
    const response = await api.credentialIssuerMetadta(
      new CredentialIssuerMetadataRequest()
    );
    const content = response.getResponseContent() || '{}';
    if (response.getAction() !== Action.OK) {
      throw new Error(content);
    }
    return JSON.parse(content);
  }

  protected async introspect(
    req: Request,
    api: AuthleteApi,
    at: string,
    dpop: string,
    htu: string
  ): Promise<IntrospectionResponse> {
    const certificate = await this.extractClientCertificate(req);
    const request = new IntrospectionRequest()
      .setToken(at)
      .setClientCertificate(certificate || '')
      .setDpop(dpop)
      .setHtm('POST')
      .setHtu(htu);

    return this.validateAccessToken(api, request);
  }
  protected prepareHeaders(
    introspection: IntrospectionResponse
  ): Record<string, unknown> {
    const headers: Record<string, unknown> = {};
    const dpopNonce = introspection.getDpopNonce();
    if (dpopNonce) {
      headers['DPoP-Nonce'] = dpopNonce;
    }
    return headers;
  }
  protected prepareOrder(
    context: OrderContext,
    introspection: IntrospectionResponse,
    info: CredentialRequestInfo,
    // エラー分岐で使うために残しておく
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _headers: Record<string, unknown>
  ): CredentialIssuanceOrder {
    try {
      const format = this.getOrderFormat(info);
      return format.getProcessor().toOrder(context, introspection, info);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      // need multiple error handling
      this.onError(e);
      throw e;
    }
  }
  protected getOrderFormat(info: CredentialRequestInfo): OrderFormat {
    console.log(
      'info is instanceof CredentialRequestInfo :>> ',
      info instanceof CredentialRequestInfo
    );
    const format = OrderFormat.byId(info.getFormat() || '');
    if (!format) {
      throw new Error(
        `The credential format '${info.getFormat()}' is not supported.`
      );
    }
    return format;
  }
}
