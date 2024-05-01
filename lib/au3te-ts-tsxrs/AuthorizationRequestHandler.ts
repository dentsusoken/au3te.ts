import AuthleteApi from '../au3te-ts-common/api/AuthleteApi';
import AuthorizationResponse from '../au3te-ts-common/dto/AuthorizationResponse';
import BaseHandler from './BaseHandler';
import ResponseUtil from './ResponseUtil';
import AuthorizationRequestHandlerSpi from './spi/AuthorizationRequestHandlerSpi';

// TODO Authorization Endpoint
export default class AuthorizationRequestHandler extends BaseHandler {
  private readonly mSpi: AuthorizationRequestHandlerSpi;
  constructor(api: AuthleteApi, spi: AuthorizationRequestHandlerSpi) {
    super(api);
    this.mSpi = spi;
  }
  handle(parameters: Record<string, string>) {
    try {
      return this.process(parameters);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      throw new Error(
        e.message || 'Unexpected error in AuthorizationRequestHandler'
      );
    }
  }
  public async process(parameters: Record<string, string>): Promise<Response> {
    const response: AuthorizationResponse =
      await this.getApiCaller().callAuthorization(parameters);

    const action: AuthorizationResponse.Action | undefined =
      response.getAction();
    const content: string | undefined = response.getResponseContent();

    switch (action) {
      case AuthorizationResponse.Action.INTERNAL_SERVER_ERROR:
        return ResponseUtil.internalServerError(content);
      case AuthorizationResponse.Action.BAD_REQUEST:
        return ResponseUtil.badRequest(content);
      case AuthorizationResponse.Action.LOCATION:
        return ResponseUtil.location(content);
      case AuthorizationResponse.Action.FORM:
        return ResponseUtil.form(content);
      case AuthorizationResponse.Action.INTERACTION:
        return this.handleInteraction(response);
      // case AuthorizationResponse.Action.NO_INTERACTION:
      //   return handleNoInteraction(response);
      // return ResponseUtil.createResponse(action, content);
      default:
        throw new Error('Unknown action: ' + action);
    }
  }

  handleInteraction(response: AuthorizationResponse) {
    return this.mSpi.generateAuthorizationPage(response);
  }
}
