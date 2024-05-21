export class CredentialRequestInfo {
  private identifier?: string;
  private format?: string;
  private details?: string;

  getIdentifier(): string | undefined {
    return this.identifier;
  }
  setIdentifier(identifier: string): CredentialRequestInfo {
    this.identifier = identifier;
    return this;
  }
  getFormat(): string | undefined {
    return this.format;
  }
  setFormat(format: string): CredentialRequestInfo {
    this.format = format;
    return this;
  }
  getDetails(): string | undefined {
    return this.details;
  }
  setDetails(details: string): CredentialRequestInfo {
    this.details = details;
    return this;
  }
}
