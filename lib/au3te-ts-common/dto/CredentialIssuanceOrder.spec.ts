import { beforeEach, describe, expect, it } from 'vitest';
import { CredentialIssuanceOrder } from '../dto/CredentialIssuanceOrder';

describe('CredentialIssuanceOrder', () => {
  let order: CredentialIssuanceOrder;

  beforeEach(() => {
    order = new CredentialIssuanceOrder();
  });

  it('should set and get request identifier', () => {
    const identifier = '123456';
    order.setRequestIdentifier(identifier);
    expect(order.getrequestIdentifier()).toBe(identifier);
  });

  it('should set and get credential payload', () => {
    const payload = 'Lorem ipsum dolor sit amet';
    order.setCredentialPayload(payload);
    expect(order.getCredentialPayload()).toBe(payload);
  });

  it('should set and get issuance deferred', () => {
    const deferred = true;
    order.setIssuanceDeferred(deferred);
    expect(order.getIssuanceDeferred()).toBe(deferred);
  });

  it('should set and get credential duration', () => {
    const duration = 3600;
    order.setCredentialDuration(duration);
    expect(order.getCredentialDuration()).toBe(duration);
  });

  it('should default to undefined values', () => {
    expect(order.getrequestIdentifier()).toBeUndefined();
    expect(order.getCredentialPayload()).toBeUndefined();
    expect(order.getIssuanceDeferred()).toBeUndefined();
    expect(order.getCredentialDuration()).toBeUndefined();
  });
});
