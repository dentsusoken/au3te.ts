import { AuthleteApiFactory } from '../../au3te-ts-common/api/AuthleteApiFactory';
import { Client } from '../../au3te-ts-common/dto/Client';
import { Params } from '../../au3te-ts-tsxrs/AuthorizationDecisionHandler';
import { BaseAuthorizationDecisionEndpoint } from '../../au3te-ts-tsxrs/BaseAuthorizationDecisionEndpoint';
import { AuthorizationDecisionHandlerSpi } from '../../au3te-ts-tsxrs/spi/AuthorizationDecisionHandlerSpi';
import { Session } from '../../util/session';
import { ProcessingUtil } from '../util/ProcessingUtil';
import { AuthorizationDecisionHandlerSpiImpl } from './AuthorizationDecisionHandlerSpiImpl';

export class AuthorizationDecisionEndpoint extends BaseAuthorizationDecisionEndpoint {
  public async post(request: Request, session: Session): Promise<Response> {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const parameters: Record<string, string> = {};
    new URLSearchParams(await request.text()).forEach((value, key) => {
      parameters[key] = value;
    });

    const params = Object.assign(
      new Params(),
      await this.takeAttribute(session, 'params')
    );
    const acrs = (await this.takeAttribute(session, 'acrs')) as string[];
    const client = Object.assign(
      new Client(),
      await this.takeAttribute(session, 'client')
    );
    const user = await ProcessingUtil.getUser(session, parameters);
    const authTime = (await session.get('authTime')) as number;
    const spi: AuthorizationDecisionHandlerSpi =
      new AuthorizationDecisionHandlerSpiImpl(
        parameters,
        user,
        new Date(authTime),
        params.getIdTokenClaims() || '',
        acrs,
        client
      );

    return this.handle(await AuthleteApiFactory.getDefaultApi(), spi, params);
  }
}
