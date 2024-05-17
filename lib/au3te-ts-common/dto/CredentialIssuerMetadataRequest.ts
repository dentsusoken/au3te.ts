export class CredentialIssuerMetadataRequest {
  private pretty?: boolean;

  public isPretty(): boolean {
    return !!this.pretty;
  }

  public setPretty(pretty: boolean): CredentialIssuerMetadataRequest {
    this.pretty = pretty;
    return this;
  }
}
