import { beforeEach, describe, expect, it } from 'vitest';
import { CredentialIssuanceOrder } from '../dto/CredentialIssuanceOrder';
import { CredentialSingleIssueRequest } from '../dto/CredentialSingleIssueRequest';

describe('CredentialSingleIssueRequest', () => {
  let request: CredentialSingleIssueRequest;

  beforeEach(() => {
    request = new CredentialSingleIssueRequest();
  });

  it('should set and get access token', () => {
    const token = 'myAccessToken';
    request.setAccessToken(token);
    expect(request.getAccessToken()).toEqual(token);
  });

  it('should set and get order', () => {
    const order = new CredentialIssuanceOrder();
    request.setOrder(order);
    expect(request.getOrder()).toEqual(order);
  });

  it('should not have access token by default', () => {
    expect(request.getAccessToken()).toBeUndefined();
  });

  it('should not have order by default', () => {
    expect(request.getOrder()).toBeUndefined();
  });

  // Add more tests here...
});
