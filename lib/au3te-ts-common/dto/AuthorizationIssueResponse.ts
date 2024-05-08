class AuthorizationIssueResponse {
  private action?: AuthorizationIssueResponse.Action;
  private responseContent?: string;
  public getAction(): AuthorizationIssueResponse.Action | undefined {
    return this.action;
  }
  public setAction(
    action: AuthorizationIssueResponse.Action
  ): AuthorizationIssueResponse {
    this.action = action;
    return this;
  }
  public getResponseContent(): string | undefined {
    return this.responseContent;
  }
  public setResponseContent(
    responseContent: string
  ): AuthorizationIssueResponse {
    this.responseContent = responseContent;
    return this;
  }
}
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace AuthorizationIssueResponse {
  export enum Action {
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    BAD_REQUEST = 'BAD_REQUEST',
    LOCATION = 'LOCATION',
    FORM = 'FORM',
  }
}
export { AuthorizationIssueResponse };
