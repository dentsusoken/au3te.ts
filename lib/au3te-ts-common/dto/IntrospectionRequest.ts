// TODO 安藤実装済み
export class IntrospectionRequest {
  private token?: string;
  private clientCertificate?: string;
  private dpop?: string;
  private htm?: string;
  private htu?: string;

  getToken(): string | undefined {
    return this.token;
  }
  setToken(token: string): IntrospectionRequest {
    this.token = token;
    return this;
  }
  getClientCertificate(): string | undefined {
    return this.clientCertificate;
  }
  setClientCertificate(clientCertificate: string): IntrospectionRequest {
    this.clientCertificate = clientCertificate;
    return this;
  }
  getDpop(): string | undefined {
    return this.dpop;
  }
  setDpop(dpop: string): IntrospectionRequest {
    this.dpop = dpop;
    return this;
  }
  getHtm(): string | undefined {
    return this.htm;
  }
  setHtm(htm: string): IntrospectionRequest {
    this.htm = htm;
    return this;
  }
  getHtu(): string | undefined {
    return this.htu;
  }
  setHtu(htu: string): IntrospectionRequest {
    this.htu = htu;
    return this;
  }
}
