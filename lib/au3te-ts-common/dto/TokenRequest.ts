// TODO 安藤実装済み
import { Property } from './Property';
// それぞれgetも書く
export class TokenRequest {
  private parameters?: string;
  private clientId?: string;
  private clientSecret?: string;
  private clientCertificate?: string
  private properties?: Property[];
  private clientCertificatePath?: string[];
  private dpop?: string;
  private htm?: string;
  private htu?: string


  public getParameters(): string | undefined {
    return this.parameters;
  }
  public setParameters(parameters: string | undefined) {
    this.parameters = parameters;
    return parameters
  }
  public getClientId(): string | undefined {
    return this.clientId;
  }
  public setClientId(clientId: string | undefined) {
    this.clientId = clientId;
    return this;
  }
  public getClientSecret(): string | undefined {
    return this.clientSecret;
  }
  public setClientSecret(clientSecret: string | undefined) {
    this.clientSecret = clientSecret;
    return clientSecret;
  }
  public getClientCertificate(): string | undefined {
    return this.clientCertificate;
  }
  public setClientCertificate(clientCertificate: string | undefined) {
    this.clientCertificate = clientCertificate;
    return this;
  }
  public getProperties(): Property[] | undefined {
    return this.properties;
  }
  public setProperties(properties: Property[] | undefined) {
    this.properties = properties;
    return this;
  }
  public getClientCertificatePath(): string[] | undefined {
    return this.clientCertificatePath
  }
  public setClientCertificatePath(clientCertificatePath: string[] | undefined) {
    this.clientCertificatePath = clientCertificatePath
    return this;
  }
  public getDpop(): string | undefined {
    return this.dpop;
  }
  public setDpop(dpop: string | undefined) {
    this.dpop = dpop;
    return this;
  }
  public getHtm(): string | undefined {
    return this.htm;
  }
  public setHtm(htm: string | undefined) {
    this.htm = htm;
    return this;
  }
  public getHtu(): string | undefined {
    return this.htu;
  }
  public setHtu(htu: string | undefined) {
    this.htu = htu;
    return htu;
  }
}
