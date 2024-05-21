export enum Action {
  OK = 'OK',
  OK_JWT = 'OK_JWT',
  ACCEPTED = 'ACCEPTED',
  ACCEPTED_JWT = 'ACCEPTED_JWT',
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  CALLER_ERROR = 'CALLER_ERROR',
}

export class CredentialSingleIssueResponse {
  private action?: Action;
  private responseContent?: string;
  getAction(): Action | undefined {
    return this.action;
  }
  setAction(action: Action): CredentialSingleIssueResponse {
    this.action = action;
    return this;
  }
  getResponseContent(): string | undefined {
    return this.responseContent;
  }
  setResponseContent(responseContent: string): CredentialSingleIssueResponse {
    this.responseContent = responseContent;
    return this;
  }
}
