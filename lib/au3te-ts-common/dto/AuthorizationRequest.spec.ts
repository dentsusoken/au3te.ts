import { describe, it, expect } from 'vitest';
import { AuthorizationRequest } from './AuthorizationRequest';

describe('AuthorizationRequest', () => {
  it('should set and get parameters', () => {
    const request = new AuthorizationRequest();
    request.setParameters('test-parameters');
    expect(request.getParameters()).toBe('test-parameters');
  });
});
