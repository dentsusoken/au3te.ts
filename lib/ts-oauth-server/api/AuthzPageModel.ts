import { AuthorizationResponse } from '../../au3te-ts-common/dto/AuthorizationResponse';
import { User } from '../../au3te-ts-common/types/User';
import { AuthorizationPageModel } from '../../au3te-ts-tsxrs/AuthorizationPageModel';
import { FederationConfig } from '../federation/FederationConfig';

export class AuthzPageModel extends AuthorizationPageModel {
  // private federations?: FederationConfig[];
  // private federationMessage?: string;

  constructor(
    info: AuthorizationResponse,
    user?: User,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _federations?: FederationConfig[]
  ) {
    super(info, user);
    // this.federations = federations;
  }
}
