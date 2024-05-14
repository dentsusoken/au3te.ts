import { AuthleteApi } from '../au3te-ts-common/api/AuthleteApi';
import { BaseEndpoint } from './BaseEndpoint';
import { Params, TokenRequestHandler } from './TokenRequestHandler';
import { TokenRequestHandlerSpi } from './spi/TokenRequestHandlerSpi';

export class BaseTokenEndpoint extends BaseEndpoint {
  handle(api: AuthleteApi, spi: TokenRequestHandlerSpi, params: Params) {
    try {
      const handler = new TokenRequestHandler(api, spi);
      return handler.handle(params);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      // An error occurred in the handler.
      this.onError(e);
      // Convert the error to a Response.
      return new Response(e.message, { status: 500 });
    }
  }
}
