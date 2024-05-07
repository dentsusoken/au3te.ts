import { AuthorizationResponse } from '../../au3te-ts-common/dto/AuthorizationResponse';
import { User } from '../../au3te-ts-common/types/User';
import { AuthorizationPageModel } from '../../au3te-ts-tsxrs/AuthorizationPageModel';
import { FederationConfig } from '../federation/FederationConfig';

// TODO Authorization Endpoint
export class AuthzPageModel extends AuthorizationPageModel {
  private federations?: FederationConfig[];
  private federationMessage?: string;

  constructor(
    info: AuthorizationResponse,
    user?: User,
    federations?: FederationConfig[]
  ) {
    super(info, user);
    this.federations = federations;
  }
}
