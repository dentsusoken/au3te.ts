import { VerifiedClaims } from '../../au3te-ts-common/assurance/constraint/VerifiedClaims';
import { Property } from '../../au3te-ts-common/dto/Property';

export interface AuthorizationDecisionHandlerSpi {
  isClientAuthorized(): boolean | undefined;
  getUserSubject(): string | undefined;
  getSub(): string | undefined;
  getUserAuthenticatedAt(): number | undefined;
  getAcr(): string | undefined;
  getUserClaim(claimName: string, languageTag?: string): string | undefined;
  getVerifiedClaims(
    subject?: string,
    verifiedClaimsRequest?: unknown
  ): VerifiedClaims[] | undefined;
  getProperties(): Property[] | undefined;
  getScopes(): string[] | undefined;
}
