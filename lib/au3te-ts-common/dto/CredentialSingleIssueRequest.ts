import { CredentialIssuanceOrder } from './CredentialIssuanceOrder';

export class CredentialSingleIssueRequest {
  private accessToken?: string;
  private order?: CredentialIssuanceOrder;

  getAccessToken(): string | undefined {
    return this.accessToken;
  }
  setAccessToken(token: string): CredentialSingleIssueRequest {
    this.accessToken = token;
    return this;
  }
  getOrder(): CredentialIssuanceOrder | undefined {
    return this.order;
  }
  setOrder(order: CredentialIssuanceOrder): CredentialSingleIssueRequest {
    this.order = order;
    return this;
  }
}
