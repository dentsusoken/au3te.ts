import { ConfigValidationHelper } from './ConfigValidationHelper';

export class ClientConfig {
  private clientId?: string;
  private clientSecret?: string;
  private redirectUri?: string;
  private idTokenSignedResponseAlg?: string;

  public getClientId(): string | undefined {
    return this.clientId;
  }

  public setClientId(clientId: string): ClientConfig {
    this.clientId = clientId;
    return this;
  }

  public getClientSecret(): string | undefined {
    return this.clientSecret;
  }

  public setClientSecret(clientSecret: string): ClientConfig {
    this.clientSecret = clientSecret;
    return this;
  }

  public getRedirectUri(): string | undefined {
    return this.redirectUri;
  }

  public setRedirectUri(redirectUri: string): ClientConfig {
    this.redirectUri = redirectUri;
    return this;
  }

  public getIdTokenSignedResponseAlg(): string | undefined {
    return this.idTokenSignedResponseAlg;
  }

  public setIdTokenSignedResponseAlg(
    idTokenSignedResponseAlg: string
  ): ClientConfig {
    this.idTokenSignedResponseAlg = idTokenSignedResponseAlg;
    return this;
  }

  public validate(): void {
    ConfigValidationHelper.ensureNotEmpty('client/clientId', this.clientId);
    ConfigValidationHelper.ensureNotEmpty(
      'client/redirectUri',
      this.redirectUri
    );
    ConfigValidationHelper.ensureUri('client/redirectUri', this.redirectUri!);
  }
}
