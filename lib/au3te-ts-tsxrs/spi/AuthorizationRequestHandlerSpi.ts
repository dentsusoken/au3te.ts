import { AuthorizationResponse } from '../../au3te-ts-common/dto/AuthorizationResponse';
import { Property } from '../../au3te-ts-common/dto/Property';

export interface AuthorizationRequestHandlerSpi {
  isUserAuthenticated(): boolean;
  generateAuthorizationPage(info: AuthorizationResponse): Promise<Response>;
  isUserAuthenticated(): boolean;
  getUserAuthenticatedAt(): number;
  getUserSubject(): string;
  getAcr(): string;
  getProperties(): Property[];
  getScopes(): string[];
  getSub(): string;
}
