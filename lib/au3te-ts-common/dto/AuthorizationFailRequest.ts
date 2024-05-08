class AuthorizationFailRequest {
  public ticket?: string;
  public reason?: AuthorizationFailRequest.Reason;
  public description?: string;

  public getTicket(): string | undefined {
    return this.ticket;
  }

  public setTicket(ticket: string) {
    this.ticket = ticket;
    return this;
  }

  public getReason(): AuthorizationFailRequest.Reason | undefined {
    return this.reason;
  }

  public setReason(reason: AuthorizationFailRequest.Reason) {
    this.reason = reason;
    return this;
  }

  public getDescription(): string | undefined {
    return this.description;
  }

  public setDescription(description: string) {
    this.description = description;
    return this;
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace AuthorizationFailRequest {
  export enum Reason {
    UNKNOWN,
    NOT_LOGGED_IN,
    MAX_AGE_NOT_SUPPORTED,
    EXCEEDS_MAX_AGE,
    DIFFERENT_SUBJECT,
    ACR_NOT_SATISFIED,
    DENIED,
    SERVER_ERROR,
    NOT_AUTHENTICATED,
    ACCOUNT_SELECTION_REQUIRED,
    CONSENT_REQUIRED,
    INTERACTION_REQUIRED,
    INVALID_TARGET,
  }
}

export { AuthorizationFailRequest };
