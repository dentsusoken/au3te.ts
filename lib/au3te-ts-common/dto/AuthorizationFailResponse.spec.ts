import { describe, it, expect } from 'vitest';
import { AuthorizationFailResponse } from './AuthorizationFailResponse';

describe('AuthorizationFailResponse', () => {
  it('should set and get action', () => {
    const response = new AuthorizationFailResponse();
    response.setAction(AuthorizationFailResponse.Action.BAD_REQUEST);
    expect(response.getAction()).toBe(
      AuthorizationFailResponse.Action.BAD_REQUEST
    );
  });

  it('should set and get responseContent', () => {
    const response = new AuthorizationFailResponse();
    response.setResponseContent('test-content');
    expect(response.getResponseContent()).toBe('test-content');
  });

  it('should summarize correctly', () => {
    const response = new AuthorizationFailResponse();
    response.setAction(AuthorizationFailResponse.Action.INTERNAL_SERVER_ERROR);
    response.setResponseContent('error occurred');
    const summary = response.summarize();
    expect(summary).toBe(
      'action=INTERNAL_SERVER_ERROR, responseContent=error occurred'
    );
  });

  it('should return undefined for unset properties', () => {
    const response = new AuthorizationFailResponse();
    expect(response.getAction()).toBeUndefined();
    expect(response.getResponseContent()).toBeUndefined();
  });
});
