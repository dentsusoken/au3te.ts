import { AuthorizationResponse } from '../../au3te-ts-common/dto/AuthorizationResponse';

// TODO Authorization Endpoint
export interface AuthorizationRequestHandlerSpi {
  isUserAuthenticated(): boolean;
  generateAuthorizationPage(info: AuthorizationResponse): Response;
}
