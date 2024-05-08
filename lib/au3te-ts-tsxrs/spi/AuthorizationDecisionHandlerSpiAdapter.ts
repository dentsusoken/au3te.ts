import { VerifiedClaims } from '../../au3te-ts-common/assurance/constraint/VerifiedClaims';
import { Property } from '../../au3te-ts-common/dto/Property';
import { AuthorizationDecisionHandlerSpi } from './AuthorizationDecisionHandlerSpi';

export class AuthorizationDecisionHandlerSpiAdapter
  implements AuthorizationDecisionHandlerSpi
{
  isClientAuthorized(): boolean | undefined {
    return;
  }
  getUserSubject(): string | undefined {
    return;
  }
  getSub(): string | undefined {
    return;
  }
  getUserAuthenticatedAt(): number | undefined {
    return;
  }
  getUserClaim(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _claimName: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _languageTag?: string | undefined
  ): string | undefined {
    return;
  }
  getVerifiedClaims(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _subject?: string | undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _verifiedClaimsRequest?: unknown
  ): VerifiedClaims[] | undefined {
    return;
  }
  getProperties(): Property[] | undefined {
    return;
  }
  getScopes(): string[] | undefined {
    return;
  }

  getAcr(): string | undefined {
    return;
  }
}
