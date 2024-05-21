export enum Action {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  OK = 'OK',
}

export class IntrospectionResponse {
  private action?: Action;
  private subject?: string;
  private responseContent?: string;
  private issuableCredentials?: string;
  private dpopNonce?: string;

  getAction(): Action | undefined {
    return this.action;
  }
  setAction(action: Action): IntrospectionResponse {
    this.action = action;
    return this;
  }
  getSubject(): string | undefined {
    return this.subject;
  }
  setSubject(subject: string): IntrospectionResponse {
    this.subject = subject;
    return this;
  }
  getResponseContent(): string | undefined {
    return this.responseContent;
  }
  setResponseContent(responseContent: string): IntrospectionResponse {
    this.responseContent = responseContent;
    return this;
  }
  getIssuableCredentials(): string | undefined {
    return this.issuableCredentials;
  }
  setIssuableCredentials(credentials: string): IntrospectionResponse {
    this.issuableCredentials = credentials;
    return this;
  }
  getDpopNonce(): string | undefined {
    return this.dpopNonce;
  }
  setDpopNonce(dpopNonce: string): IntrospectionResponse {
    this.dpopNonce = dpopNonce;
    return this;
  }
}
