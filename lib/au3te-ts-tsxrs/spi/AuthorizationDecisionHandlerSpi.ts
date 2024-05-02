// TODO à¿ì°é¿ëïçœÇ›
export interface AuthorizationDecisionHandlerSpi {
    isClientAuthorized(): boolean;
    getUserSubject(): string;
    getSub(): string;
    getUserAuthenticatedAt(): number;
    getAcr(): string;
    getUserClaim(claimName: string, languageTag?: string): string;
    getVerifiedClaims(subject?: string, verifiedClaimsRequest?: unknown): unknown;
    getProperties(): Property[];
    getScopes(): string[];
}
