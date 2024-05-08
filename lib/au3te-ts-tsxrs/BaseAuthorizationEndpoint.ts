import { AuthleteApi } from '../au3te-ts-common/api/AuthleteApi';
import { AuthorizationRequestHandler } from './AuthorizationRequestHandler';
import { BaseEndpoint } from './BaseEndpoint';
import { AuthorizationRequestHandlerSpi } from './spi/AuthorizationRequestHandlerSpi';

export class BaseAuthorizationEndpoint extends BaseEndpoint {
  async handleInternal(
    api: AuthleteApi,
    spi: AuthorizationRequestHandlerSpi,
    parameters: Record<string, string>
  ): Promise<Response> {
    try {
      const handler: AuthorizationRequestHandler =
        new AuthorizationRequestHandler(api, spi);
      return await handler.handle(parameters);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      this.onError(e);
      return new Response(e.message, { status: 500 });
    }
  }
}
