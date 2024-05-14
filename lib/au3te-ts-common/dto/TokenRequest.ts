import { Property } from './Property';
export class TokenRequest {
  private parameters?: string;
  private clientId?: string;
  private clientSecret?: string;
  private clientCertificate?: string;
  private properties?: Property[];
  private clientCertificatePath?: string[];
  private dpop?: string;
  private htm?: string;
  private htu?: string;

  public getParameters(): string | undefined {
    return this.parameters;
  }
  public setParameters(parameters: string) {
    this.parameters = parameters;
    return this;
  }
  public getClientId(): string | undefined {
    return this.clientId;
  }
  public setClientId(clientId: string) {
    this.clientId = clientId;
    return this;
  }
  public getClientSecret(): string | undefined {
    return this.clientSecret;
  }
  public setClientSecret(clientSecret: string) {
    this.clientSecret = clientSecret;
    return this;
  }
  public getClientCertificate(): string | undefined {
    return this.clientCertificate;
  }
  public setClientCertificate(clientCertificate: string) {
    this.clientCertificate = clientCertificate;
    return this;
  }
  public getProperties(): Property[] | undefined {
    return this.properties;
  }
  public setProperties(properties: Property[]) {
    this.properties = properties;
    return this;
  }
  public getClientCertificatePath(): string[] | undefined {
    return this.clientCertificatePath;
  }
  public setClientCertificatePath(clientCertificatePath: string[]) {
    this.clientCertificatePath = clientCertificatePath;
    return this;
  }
  public getDpop(): string | undefined {
    return this.dpop;
  }
  public setDpop(dpop: string) {
    this.dpop = dpop;
    return this;
  }
  public getHtm(): string | undefined {
    return this.htm;
  }
  public setHtm(htm: string) {
    this.htm = htm;
    return this;
  }
  public getHtu(): string | undefined {
    return this.htu;
  }
  public setHtu(htu: string) {
    this.htu = htu;
    return this;
  }
}
