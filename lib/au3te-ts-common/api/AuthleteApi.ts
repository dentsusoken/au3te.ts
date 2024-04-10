import { AuthorizationRequest } from 'authlete/common/dto/AuthorizationRequest';
import { AuthorizationResponse } from 'authlete/common/dto/AuthorizationResponse';
import { AuthorizationFailRequest } from 'authlete/common/dto/AuthorizationFailRequest';
import { AuthorizationFailResponse } from 'authlete/common/dto/AuthorizationFailResponse';
import { AuthorizationIssueRequest } from 'authlete/common/dto/AuthorizationIssueRequest';
import { AuthorizationIssueResponse } from 'authlete/common/dto/AuthorizationIssueResponse';
import { TokenRequest } from 'authlete/common/dto/TokenRequest';
import { TokenResponse } from 'authlete/common/dto/TokenResponse';
import { TokenCreateRequest } from 'authlete/common/dto/TokenCreateRequest';
import { TokenCreateResponse } from 'authlete/common/dto/TokenCreateResponse';
import { TokenFailRequest } from 'authlete/common/dto/TokenFailRequest';
import { TokenFailResponse } from 'authlete/common/dto/TokenFailResponse';
import { TokenIssueRequest } from 'authlete/common/dto/TokenIssueRequest';
import { TokenIssueResponse } from 'authlete/common/dto/TokenIssueResponse';
import { TokenRevokeRequest } from 'authlete/common/dto/TokenRevokeRequest';
import { TokenRevokeResponse } from 'authlete/common/dto/TokenRevokeResponse';
import { AuthorizationTicketUpdateRequest } from 'authlete/common/dto/AuthorizationTicketUpdateRequest';
import { AuthorizationTicketUpdateResponse } from 'authlete/common/dto/AuthorizationTicketUpdateResponse';
import { AuthleteApiException } from 'authlete/common/api/AuthleteApiException';
export interface AuthleteApi {
  authorization(request: AuthorizationRequest): Promise<AuthorizationResponse>;
  authorizationFail(
    request: AuthorizationFailRequest
  ): Promise<AuthorizationFailResponse>;
  authorizationIssue(
    request: AuthorizationIssueRequest
  ): Promise<AuthorizationIssueResponse>;
  token(request: TokenRequest): Promise<TokenResponse>;
  tokenCreate(request: TokenCreateRequest): Promise<TokenCreateResponse>;
  tokenDelete(token: string): Promise<void>;
  tokenFail(request: TokenFailRequest): Promise<TokenFailResponse>;
  tokenIssue(request: TokenIssueRequest): Promise<TokenIssueResponse>;
  tokenRevoke(request: TokenRevokeRequest): Promise<TokenRevokeResponse>;
  authorizationTicketUpdate(
    request: AuthorizationTicketUpdateRequest
  ): Promise<AuthorizationTicketUpdateResponse>;
}
