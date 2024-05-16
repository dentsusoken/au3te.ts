// TODO 安藤実装済み

export class CredentialSingleParseRequest {
  private accessToken?: string;
  private requestContent?: string

  getAccessToken(): string | undefined {
    return this.accessToken;
  }
  setAccessToken(accessToken: string): CredentialSingleParseRequest {
    this.accessToken = accessToken;
    return this;
  }
  getRequestContent(): string | undefined {
    return this.requestContent;
  }
  setRequestContent(requestContent: string): CredentialSingleParseRequest {
    this.requestContent = requestContent;
    return this;
  }
}
