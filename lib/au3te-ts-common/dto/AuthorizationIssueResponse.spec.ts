import { describe, it, expect } from 'vitest';
import { AuthorizationIssueResponse } from './AuthorizationIssueResponse';

describe('AuthorizationIssueResponse', () => {
  it('should set and get action', () => {
    const response = new AuthorizationIssueResponse();
    response.setAction(AuthorizationIssueResponse.Action.BAD_REQUEST);
    expect(response.getAction()).toBe(
      AuthorizationIssueResponse.Action.BAD_REQUEST
    );
  });

  it('should set and get responseContent', () => {
    const response = new AuthorizationIssueResponse();
    response.setResponseContent('test-content');
    expect(response.getResponseContent()).toBe('test-content');
  });
});
