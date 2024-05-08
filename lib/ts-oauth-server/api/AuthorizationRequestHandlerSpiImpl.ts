import { AuthorizationResponse } from '../../au3te-ts-common/dto/AuthorizationResponse';
import { Prompt } from '../../au3te-ts-common/types/Prompt';
import { User } from '../../au3te-ts-common/types/User';
import { Params } from '../../au3te-ts-tsxrs/AuthorizationDecisionHandler';
import { AuthorizationRequestHandlerSpiAdapter } from '../../au3te-ts-tsxrs/spi/AuthorizationRequestHandlerSpiAdapter';
import { fromMilliseconds } from '../../util/Date';
import { Session } from '../../util/session';
import { FederationManager } from '../federation/FederationManager';
import { Viewable } from '../webapp';
import { AuthorizationView } from '../webapp/template/Authorization';
import { AuthzPageModel } from './AuthzPageModel';

export class AuthorizationRequestHandlerSpiImpl extends AuthorizationRequestHandlerSpiAdapter {
  // private mRequest: Request;
  private session: Session;
  // private mClient?: Client;

  constructor(_request: Request, session: Session) {
    super();
    // this.mRequest = request;
    this.session = session;
  }

  public async generateAuthorizationPage(
    info: AuthorizationResponse
  ): Promise<Response> {
    await this.session.set('params', Params.from(info));
    await this.session.set('acrs', info.getAcrs());
    await this.session.set('client', info.getClient());

    // this.mClient = info.getClient();

    this.clearCurrentUserInfoInSessionIfNecessary(info);

    const user = await this.session.get('user');

    const model = new AuthzPageModel(
      info,
      user as User,
      FederationManager.getInstance().getConfigurations()
    );

    const model2 = new AuthzPageModel(info, undefined, undefined);

    this.session.set('authzPageModel', model2);

    const viewable = Viewable({ children: AuthorizationView(model) });

    return new Response(viewable, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  }

  private async clearCurrentUserInfoInSessionIfNecessary(
    info: AuthorizationResponse
  ): Promise<void> {
    const user = await this.session.get('user');
    const authTime = fromMilliseconds(await this.session.get('authTime'));
    if (!user && !authTime) {
      return;
    }
    this.checkPrompts(info);
    this.checkAuthenticationAge(info, authTime);
  }

  private checkPrompts(info: AuthorizationResponse): void {
    const prompts = info.getPrompts();
    if (!prompts || prompts.length === 0) {
      return;
    }
    if (prompts.find((v) => v === Prompt.LOGIN)) {
      this.clearCurrentUserInfoInSession();
    }
  }
  private checkAuthenticationAge(info: AuthorizationResponse, authTime: Date) {
    const maxAge = info.getMaxAge();
    if (!maxAge || maxAge <= 0) {
      return;
    }
    const now = new Date();
    const authAge = (now.getTime() - authTime.getTime()) / 1000;

    if (authAge > maxAge) {
      this.clearCurrentUserInfoInSession();
    }
  }
  private async clearCurrentUserInfoInSession() {
    await this.session.delete('user');
    await this.session.delete('authTime');
  }
}
