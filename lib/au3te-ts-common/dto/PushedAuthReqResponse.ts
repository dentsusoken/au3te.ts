export enum Action {
  CREATED = 'CREATED',
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  PAYLOAD_TOO_LARGE = 'PAYLOAD_TOO_LARGE',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

export class PushedAuthReqResponse extends ApiResponse {
  private action: Action;
  private responseContent: string;
  private clientAuthMethod: ClientAuthMethod;
  private requestUri: URI;
  private dpopNonce: string;

  public getAction(): Action {
    return this.action;
  }

  public setAction(action: Action): PushedAuthReqResponse {
    this.action = action;
    return this;
  }

  public getResponseContent(): string {
    return this.responseContent;
  }

  public setResponseContent(responseContent: string): PushedAuthReqResponse {
    this.responseContent = responseContent;
    return this;
  }

  public getClientAuthMethod(): ClientAuthMethod {
    return this.clientAuthMethod;
  }

  public setClientAuthMethod(
    clientAuthMethod: ClientAuthMethod
  ): PushedAuthReqResponse {
    this.clientAuthMethod = clientAuthMethod;
    return this;
  }

  public getRequestUri(): URI {
    return this.requestUri;
  }

  public setRequestUri(requestUri: URI): PushedAuthReqResponse {
    this.requestUri = requestUri;
    return this;
  }

  public getDpopNonce(): string {
    return this.dpopNonce;
  }

  public setDpopNonce(dpopNonce: string): PushedAuthReqResponse {
    this.dpopNonce = dpopNonce;
    return this;
  }

  public summarize(): string {
    return `action=${this.action}, responseContent=${this.responseContent}, clientAuthMethod=${this.clientAuthMethod}, requestUri=${this.requestUri}`;
  }
}
