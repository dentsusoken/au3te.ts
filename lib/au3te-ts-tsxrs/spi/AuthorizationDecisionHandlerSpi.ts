import { VerifiedClaims } from '../../au3te-ts-common/assurance/constraint/VerifiedClaims';
import { Property } from '../../au3te-ts-common/dto/Property';

// TODO Authorization Endpoint
export interface AuthorizationDecisionHandlerSpi {
  isClientAuthorized(): boolean;
  getUserSubject(): string;
  getSub(): string;
  getUserAuthenticatedAt(): number;
  getAcr(): string;
  getUserClaim(claimName: string, languageTag?: string): string;
  getVerifiedClaims(
    subject?: string,
    verifiedClaimsRequest?: unknown
  ): VerifiedClaims[];
  getProperties(): Property[];
  getScopes(): string[];
}
