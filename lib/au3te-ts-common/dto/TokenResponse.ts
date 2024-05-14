export class TokenResponse {
  private action?: Action;
  private responseContent?: string;
  private dpopNonce?: string;

  public getAction(): Action | undefined {
    return this.action;
  }
  public setAction(action: Action): TokenResponse {
    this.action = action;
    return this;
  }
  public getResponseContent(): string | undefined {
    return this.responseContent;
  }
  public setResponseContent(responseContent: string): TokenResponse {
    this.responseContent = responseContent;
    return this;
  }
  public getDpopNonce(): string | undefined {
    return this.dpopNonce;
  }
  public setDpopNonce(dpopNonce: string): TokenResponse {
    this.dpopNonce = dpopNonce;
    return this;
  }
}
export enum Action {
  INVALID_CLIENT = 'INVALID_CLIENT',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  BAD_REQUEST = 'BAD_REQUEST',
  PASSWORD = 'PASSWORD',
  OK = 'OK',
  TOKEN_EXCHANGE = 'TOKEN_EXCHANGE',
  JWT_BEARER = 'JWT_BEARER',
  ID_TOKEN_REISSUABLE = 'ID_TOKEN_REISSUABLE',
}
