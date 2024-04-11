// import ClientAuthMethod from '../types/ClientAuthMethod';
import ApiResponse from './ApiResponse';

export enum Action {
  CREATED = 'CREATED',
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  PAYLOAD_TOO_LARGE = 'PAYLOAD_TOO_LARGE',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

export default class PushedAuthReqResponse extends ApiResponse {
  // TODO Confirm if this is needed in TypeScript
  // private static readonly serialVersionUID: number = 2;
  private action?: Action;
  private responseContent?: string;
  // private clientAuthMethod?: ClientAuthMethod;
  // private requestUri?: URL;
  private dpopNonce?: string;

  public getAction(): Action | undefined {
    return this.action;
  }

  // public setAction(action: Action): PushedAuthReqResponse | undefined {
  //   this.action = action;
  //   return this;
  // }

  public getResponseContent(): string | undefined {
    return this.responseContent;
  }

  // public setResponseContent(
  //   responseContent: string
  // ): PushedAuthReqResponse | undefined {
  //   this.responseContent = responseContent;
  //   return this;
  // }

  // public getClientAuthMethod(): ClientAuthMethod | undefined {
  //   return this.clientAuthMethod;
  // }

  // public setClientAuthMethod(
  //   clientAuthMethod: ClientAuthMethod
  // ): PushedAuthReqResponse {
  //   this.clientAuthMethod = clientAuthMethod;
  //   return this;
  // }

  // public getRequestUri(): URL | undefined {
  //   return this.requestUri;
  // }

  // public setRequestUri(requestUri: URL): PushedAuthReqResponse {
  //   this.requestUri = requestUri;
  //   return this;
  // }

  public getDpopNonce(): string | undefined {
    return this.dpopNonce;
  }

  // public setDpopNonce(dpopNonce: string): PushedAuthReqResponse {
  //   this.dpopNonce = dpopNonce;
  //   return this;
  // }

  // public summarize(): string {
  //   return `action=${this.action}, responseContent=${this.responseContent}, clientAuthMethod=${this.clientAuthMethod}, requestUri=${this.requestUri}`;
  // }
}
