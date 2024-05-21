import { beforeEach, describe, expect, it } from 'vitest';
import {
  Action,
  CredentialSingleIssueResponse,
} from '../dto/CredentialSingleIssueResponse';

describe('CredentialSingleIssueResponse', () => {
  let response: CredentialSingleIssueResponse;

  beforeEach(() => {
    response = new CredentialSingleIssueResponse();
  });

  it('should set and get the action', () => {
    response.setAction(Action.OK);
    expect(response.getAction()).toBe(Action.OK);
  });

  it('should set and get the response content', () => {
    const content = 'Sample response content';
    response.setResponseContent(content);
    expect(response.getResponseContent()).toBe(content);
  });

  it('should default to undefined action and response content', () => {
    expect(response.getAction()).toBeUndefined();
    expect(response.getResponseContent()).toBeUndefined();
  });

  // Add more tests here
});
