import Client from '../../au3te-ts-common/dto/Client';
import User from '../../au3te-ts-common/types/User';
import AuthorizationDecisionHandlerSpiAdapter from '../../au3te-ts-tsxrs/spi/AuthorizationDecisionHandlerSpiAdapter';

// TODO Authorization Endpoint
export default class AuthorizationDecisionHandlerSpiImpl extends AuthorizationDecisionHandlerSpiAdapter {
  private mUser: User;
  private mUserAuthenticatedAt: number;
  private mIdTokenClaims: Record<string, string>;
  private mAcrs: string[];
  private mClient: Client;
  private mUserSubject: string;

  constructor(
    parameters: Record<string, string>,
    user: User,
    userAuthenticatedAt: Date,
    idTokenClaims: string,
    acrs: string[],
    client: Client
  ) {
    super();
  }
  isClientAuthorized() {}
  getUserSubject() {}
  getSub() {}
  getUserAuthenticatedAt() {}
  getAcr() {}
  getCustomClaim() {}
  getProperties() {}
  parseJson() {}
}
