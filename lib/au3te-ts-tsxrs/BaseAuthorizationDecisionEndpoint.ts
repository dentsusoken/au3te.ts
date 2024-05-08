import { AuthleteApi } from '../au3te-ts-common/api/AuthleteApi';
import {
  AuthorizationDecisionHandler,
  Params,
} from './AuthorizationDecisionHandler';
import { BaseEndpoint } from './BaseEndpoint';
import { AuthorizationDecisionHandlerSpi } from './spi/AuthorizationDecisionHandlerSpi';

export class BaseAuthorizationDecisionEndpoint extends BaseEndpoint {
  // public async handle(
  //   api: AuthleteApi,
  //   spi: AuthorizationDecisionHandlerSpi,
  //   ticket: string,
  //   claimNames: string[],
  //   claimLocales: string[]
  // ) {
  //   const params: Params = new Params()
  //     .setTicket(ticket)
  //     .setClaimNames(claimNames)
  //     .setClaimLocales(claimLocales);

  //   return await this.handleInternal(api, spi, params);
  // }

  public async handle(
    api: AuthleteApi,
    spi: AuthorizationDecisionHandlerSpi,
    params: Params
  ): Promise<Response> {
    try {
      const handler = new AuthorizationDecisionHandler(api, spi);

      return await handler.handle(params);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      this.onError(e);
      return new Response(e.message, { status: 500 });
    }
  }
}
