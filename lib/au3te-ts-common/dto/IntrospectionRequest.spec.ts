import { describe, expect, it } from 'vitest';
import { IntrospectionRequest } from './IntrospectionRequest';

describe('IntrospectionRequest', () => {
  const request = new IntrospectionRequest();

  it('getToken', () => {
    expect(request.getToken()).toBeUndefined();
  });

  it('setToken', () => {
    const token = 'token123';
    request.setToken(token);
    expect(request.getToken()).toBe(token);
  });

  it('getClientCertificate', () => {
    expect(request.getClientCertificate()).toBeUndefined();
  });

  it('setClientCertificate', () => {
    const clientCertificate = 'clientCertificate123';
    request.setClientCertificate(clientCertificate);
    expect(request.getClientCertificate()).toBe(clientCertificate);
  });

  it('getDpop', () => {
    expect(request.getDpop()).toBeUndefined();
  });

  it('setDpop', () => {
    const dpop = 'dpop123';
    request.setDpop(dpop);
    expect(request.getDpop()).toBe(dpop);
  });

  it('getHtm', () => {
    expect(request.getHtm()).toBeUndefined();
  });

  it('setHtm', () => {
    const htm = 'htm123';
    request.setHtm(htm);
    expect(request.getHtm()).toBe(htm);
  });

  it('getHtu', () => {
    expect(request.getHtu()).toBeUndefined();
  });

  it('setHtu', () => {
    const htu = 'htu123';
    request.setHtu(htu);
    expect(request.getHtu()).toBe(htu);
  });
});
