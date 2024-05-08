import { ConfigValidationHelper } from './ConfigValidationHelper';

export class ServerConfig {
  private name?: string;
  private issuer?: string;

  public getName(): string | undefined {
    return this.name;
  }

  public setName(name: string): ServerConfig {
    this.name = name;
    return this;
  }

  public getIssuer(): string | undefined {
    return this.issuer;
  }

  public setIssuer(issuer: string): ServerConfig {
    this.issuer = issuer;
    return this;
  }

  public validate(): void {
    ConfigValidationHelper.ensureNotEmpty('server/name', this.name);
    ConfigValidationHelper.ensureNotEmpty('server/issuer', this.issuer);
    ConfigValidationHelper.ensureUri('server/issuer', this.issuer!);
  }
}
