import { CredentialRequestInfo } from './CredentialRequestInfo';

export enum Action {
  OK = 'OK',
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

export class CredentialSingleParseResponse {
  private action?: Action;
  private responseContent?: string;
  private info?: CredentialRequestInfo;

  getAction(): Action | undefined {
    return this.action;
  }

  setAction(action: Action): CredentialSingleParseResponse {
    this.action = action;
    return this;
  }

  getResponseContent(): string | undefined {
    return this.responseContent;
  }
  setResponseContent(content: string): CredentialSingleParseResponse {
    this.responseContent = content;
    return this;
  }
  getInfo(): CredentialRequestInfo | undefined {
    return this.info;
  }
  setInfo(info: CredentialRequestInfo): CredentialSingleParseResponse {
    this.info = info;
    return this;
  }
}
