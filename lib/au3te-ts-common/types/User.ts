// TODO Authorization Endpoint
export interface User {
  getSubject(): string;
  getClaim(claimName: string, languageTag: string): unknown;
  getAttrinute(attributeName: string): unknown;
}
