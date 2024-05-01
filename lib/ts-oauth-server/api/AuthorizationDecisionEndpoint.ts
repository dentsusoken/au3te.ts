import { BaseAuthorizationDecisionEndpoint } from '../../au3te-ts-tsxrs/BaseAuthorizationDecisionEndpoint';
import { Session } from '../../util/session';

// TODO Authorization Endpoint
export class AuthorizationDecisionEndpoint extends BaseAuthorizationDecisionEndpoint {
  public async post(request: Request, session: Session): Promise<Response> {}
}
