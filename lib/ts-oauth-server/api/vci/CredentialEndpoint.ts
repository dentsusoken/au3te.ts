import { AuthleteApi } from '../../../au3te-ts-common/api/AuthleteApi';
import { AuthleteApiFactory } from '../../../au3te-ts-common/api/AuthleteApiFactory';
import { CredentialIssuanceOrder } from '../../../au3te-ts-common/dto/CredentialIssuanceOrder';
import { CredentialRequestInfo } from '../../../au3te-ts-common/dto/CredentialRequestInfo';
import { CredentialSingleIssueRequest } from '../../../au3te-ts-common/dto/CredentialSingleIssueRequest';
import { Action as IssueAction } from '../../../au3te-ts-common/dto/CredentialSingleIssueResponse';
import { CredentialSingleParseRequest } from '../../../au3te-ts-common/dto/CredentialSingleParseRequest';
import { Action as ParseAction } from '../../../au3te-ts-common/dto/CredentialSingleParseResponse';
import { MediaType } from '../../../util/mediaType';
import { WebApplicationException } from '../../../util/WebApplicationException';
import { ExceptionUtil } from '../../util/ExceptionUtil';
import { ResponseUtil } from '../../util/ResponseUtil';
import { OrderContext } from '../../vc/OrderContext';
import { AbstractCredentialEndpoint } from './AbstractCredentialEndpoint';

export class CredentialEndpoint extends AbstractCredentialEndpoint {
  async post(request: Request) {
    if (
      !MediaType.APPLICATION_JSON_TYPE.isEquals(
        request.headers.get('Content-Type')
      )
    ) {
      return new Response(
        `Content-Type must be ${MediaType.APPLICATION_JSON_TYPE}`
      );
    }

    const authorization = request.headers.get('Authorization') || '';
    const dpop = request.headers.get('DPoP') || '';
    const requestContent = await request.clone().json();

    const api = await AuthleteApiFactory.getDefaultApi();
    const accessToken = this.extractAccessToken(authorization, '');
    const htu = (await this.computeHtu(api, dpop, 'credential_endpoint')) || '';
    const introspection = await this.introspect(
      request,
      api,
      accessToken,
      dpop,
      htu
    );
    const headers = this.prepareHeaders(introspection);

    let info: CredentialRequestInfo;
    try {
      info = await this.parseRequest(
        api,
        JSON.stringify(requestContent),
        accessToken,
        headers
      );
    } catch (e) {
      if (e instanceof WebApplicationException) return e.getResponse();
      throw e;
    }

    const order = this.prepareOrder(
      OrderContext.SINGLE,
      introspection,
      info,
      headers
    );
    return this.issue(api, order, accessToken, headers);
  }

  private async parseRequest(
    api: AuthleteApi,
    requestContent: string,
    accessToken: string,
    headers: Record<string, unknown>
  ) {
    const request = new CredentialSingleParseRequest()
      .setRequestContent(requestContent)
      .setAccessToken(accessToken);

    const response = await api.credentialSingleParse(request);

    const content = response.getResponseContent();

    switch (response.getAction()) {
      case ParseAction.BAD_REQUEST:
        throw ExceptionUtil.badRequestExceptionJson(content, headers);

      case ParseAction.UNAUTHORIZED:
        throw ExceptionUtil.unauthorizedException(
          accessToken,
          content,
          headers
        );

      case ParseAction.FORBIDDEN:
        throw ExceptionUtil.forbiddenExceptionJson(content, headers);

      case ParseAction.OK:
        return (
          Object.assign(new CredentialRequestInfo(), response.getInfo()) ||
          new CredentialRequestInfo()
        );

      case ParseAction.INTERNAL_SERVER_ERROR:
      default:
        throw ExceptionUtil.internalServerErrorExceptionJson(content, headers);
    }
  }

  private async issue(
    api: AuthleteApi,
    order: CredentialIssuanceOrder,
    accessToken: string,
    headers: Record<string, unknown>
  ): Promise<Response> {
    const request = new CredentialSingleIssueRequest()
      .setAccessToken(accessToken)
      .setOrder(order);

    const response = await api.credentialSingleIssue(request);

    const content = response.getResponseContent() || '';

    switch (response.getAction()) {
      case IssueAction.CALLER_ERROR:
        return ResponseUtil.internalServerErrorJson(content, headers);

      case IssueAction.BAD_REQUEST:
        return ResponseUtil.badRequestJson(content, headers);

      case IssueAction.UNAUTHORIZED:
        return ResponseUtil.unauthorized(accessToken, content, headers);

      case IssueAction.FORBIDDEN:
        return ResponseUtil.forbiddenJson(content, headers);

      case IssueAction.OK:
        return ResponseUtil.okJson(content, headers);

      case IssueAction.OK_JWT:
        return ResponseUtil.okJwt(content, headers);

      case IssueAction.ACCEPTED:
        return ResponseUtil.acceptedJson(content, headers);

      case IssueAction.ACCEPTED_JWT:
        return ResponseUtil.acceptedJwt(content, headers);

      case IssueAction.INTERNAL_SERVER_ERROR:
      default:
        return ResponseUtil.internalServerErrorJson(content, headers);
    }
  }
}
