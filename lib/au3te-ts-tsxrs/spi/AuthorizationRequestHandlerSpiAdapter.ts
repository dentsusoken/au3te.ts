import { AuthorizationResponse } from '../../au3te-ts-common/dto/AuthorizationResponse';
import { Property } from '../../au3te-ts-common/dto/Property';
import { AuthorizationRequestHandlerSpi } from './AuthorizationRequestHandlerSpi';

// TODO Authorization Endpoint
export class AuthorizationRequestHandlerSpiAdapter
  implements AuthorizationRequestHandlerSpi
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  generateAuthorizationPage(_: AuthorizationResponse): Promise<Response> {
    throw new Error('Method not implemented.');
  }
  public isUserAuthenticated(): boolean {
    return false;
  }

  public getUserAuthenticatedAt(): number {
    return 0;
  }

  public getUserSubject(): string {
    return '';
  }

  public getAcr(): string {
    return '';
  }

  public getProperties(): Property[] {
    return [];
  }

  public getScopes(): string[] {
    return [];
  }

  public getSub(): string {
    return '';
  }
}
