import { format } from '../../util/StringFormatter';

class AuthorizationFailResponse {
  private static readonly SUMMARY_FORMAT: string =
    'action={}, responseContent={}';

  public action?: AuthorizationFailResponse.Action;
  public responseContent?: string;

  public getAction(): AuthorizationFailResponse.Action | undefined {
    return this.action;
  }

  public setAction(action: AuthorizationFailResponse.Action) {
    this.action = action;
    return this;
  }

  public getResponseContent(): string | undefined {
    return this.responseContent;
  }

  public setResponseContent(responseContent: string) {
    this.responseContent = responseContent;
    return this;
  }

  public summarize(): string {
    return format(
      AuthorizationFailResponse.SUMMARY_FORMAT,
      this.action,
      this.responseContent
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace AuthorizationFailResponse {
  export enum Action {
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    BAD_REQUEST = 'BAD_REQUEST',
    LOCATION = 'LOCATION',
    FORM = 'FORM',
  }
}

export { AuthorizationFailResponse };
