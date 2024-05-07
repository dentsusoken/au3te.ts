import { AuthleteApiFactory } from '../../au3te-ts-common/api/AuthleteApiFactory';
import { BaseAuthorizationEndpoint } from '../../au3te-ts-tsxrs/BaseAuthorizationEndpoint';
import { getQueryParams } from '../../util/queryParams';
import { Session } from '../../util/session';
import { AuthorizationRequestHandlerSpiImpl } from './AuthorizationRequestHandlerSpiImpl';

export class AuthorizationEndpoint extends BaseAuthorizationEndpoint {
  // get() {
  //   // const a = page();
  //   const aaa = App({ text: 'This is App !!' });
  //   return new Response(page({ children: aaa }), {
  //     headers: {
  //       'Content-Type': 'text/html',
  //     },
  //   });
  // }
  public async get(request: Request, session: Session): Promise<Response> {
    const parameters = getQueryParams(request.url);
    return await this.handle(request, session, parameters);
  }

  public async post(request: Request, session: Session): Promise<Response> {
    const parameters = await request.json();
    return await this.handle(request, session, parameters);
  }

  public async handle(
    request: Request,
    session: Session,
    parameters: Record<string, string>
  ): Promise<Response> {
    // return this.get(request);
    return super.handleInternal(
      await AuthleteApiFactory.getDefaultApi(),
      new AuthorizationRequestHandlerSpiImpl(request, session),
      parameters
    );
  }
}
