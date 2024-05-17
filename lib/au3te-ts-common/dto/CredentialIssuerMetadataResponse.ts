export enum Action {
  OK = 'OK',
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

export class CredentialIssuerMetadataResponse {
  private action?: Action;
  private responseContent?: string;

  getAction(): Action | undefined {
    return this.action;
  }
  setAction(action: Action): CredentialIssuerMetadataResponse {
    this.action = action;
    return this;
  }
  getResponseContent(): string | undefined {
    return this.responseContent;
  }
  setResponseContent(
    responseContent: string
  ): CredentialIssuerMetadataResponse {
    this.responseContent = responseContent;
    return this;
  }
}
