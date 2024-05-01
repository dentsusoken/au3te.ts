import AuthleteApi from '../au3te-ts-common/api/AuthleteApi';
import AuthorizationRequestHandler from './AuthorizationRequestHandler';
import BaseEndpoint from './BaseEndpoint';
import AuthorizationRequestHandlerSpi from './spi/AuthorizationRequestHandlerSpi';
// TODO Authorization Endpoint
export default class BaseAuthorizationEndpoint extends BaseEndpoint {
  handle(
    api: AuthleteApi,
    spi: AuthorizationRequestHandlerSpi,
    parameters: Record<string, string>
  ) {
    try {
      const handler: AuthorizationRequestHandler =
        new AuthorizationRequestHandler(api, spi);
      return handler.handle(parameters);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      this.onError(e);
      return e.message;
    }
  }
}
