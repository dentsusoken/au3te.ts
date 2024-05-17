export class CredentialIssuanceOrder {
  private requestIdentifier?: string;
  private credentialPayload?: string;
  private issuanceDeferred?: boolean;
  private credentialDuration?: number;

  getrequestIdentifier(): string | undefined {
    return this.requestIdentifier;
  }

  setRequestIdentifier(identifer: string): CredentialIssuanceOrder {
    this.requestIdentifier = identifer;
    return this;
  }

  getCredentialPayload(): string | undefined {
    return this.credentialPayload;
  }

  setCredentialPayload(payload: string): CredentialIssuanceOrder {
    this.credentialPayload = payload;
    return this;
  }
  getIssuanceDeferred(): boolean | undefined {
    return this.issuanceDeferred;
  }

  setIssuanceDeferred(deferred: boolean): CredentialIssuanceOrder {
    this.issuanceDeferred = deferred;
    return this;
  }
  getCredentialDuration(): number | undefined {
    return this.credentialDuration;
  }
  setCredentialDuration(duration: number): CredentialIssuanceOrder {
    this.credentialDuration = duration;
    return this;
  }
}
