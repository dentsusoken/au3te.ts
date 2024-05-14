export class Consent {
  public constructor(
    public consentId: string,
    public permissions: string[],
    public status: string,
    public creationDateTime: string,
    public expirationDateTime: string,
    public statusUpdateDateTime: string,
    public clientId: number,
    public refreshToken: string
  ) {}

  getConsentId(): string {
    return this.consentId;
  }

  getExpirationDateTime(): string {
    return this.expirationDateTime;
  }

  getStatusUpdateDateTime(): string {
    return this.statusUpdateDateTime;
  }

  setStatusUpdateDateTime(statusUpdateDateTime: string): Consent {
    this.statusUpdateDateTime = statusUpdateDateTime;
    return this;
  }

  setRefreshToken(refreshToken: string): Consent {
    this.refreshToken = refreshToken;
    return this;
  }
}
