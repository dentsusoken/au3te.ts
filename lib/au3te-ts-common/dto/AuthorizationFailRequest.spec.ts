import { describe, it, expect } from 'vitest';
import { AuthorizationFailRequest } from './AuthorizationFailRequest';

describe('AuthorizationFailRequest', () => {
  it('should set and get ticket', () => {
    const request = new AuthorizationFailRequest();
    request.setTicket('test-ticket');
    expect(request.getTicket()).toBe('test-ticket');
  });

  it('should set and get reason', () => {
    const request = new AuthorizationFailRequest();
    request.setReason(AuthorizationFailRequest.Reason.NOT_LOGGED_IN);
    expect(request.getReason()).toBe(
      AuthorizationFailRequest.Reason.NOT_LOGGED_IN
    );
  });

  it('should set and get description', () => {
    const request = new AuthorizationFailRequest();
    request.setDescription('test-description');
    expect(request.getDescription()).toBe('test-description');
  });

  it('should return undefined for unset properties', () => {
    const request = new AuthorizationFailRequest();
    expect(request.getTicket()).toBeUndefined();
    expect(request.getReason()).toBeUndefined();
    expect(request.getDescription()).toBeUndefined();
  });
});
