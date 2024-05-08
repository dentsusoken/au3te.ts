export interface User {
  getLoginId(): string;
  getPassword(): string;
  getSubject(): string;
  getClaim(claimName: string, languageTag: string): unknown;
  getAttribute(attributeName: string): unknown;
  setAttribute(attributeName: string, attributeValue: unknown): User;
}
