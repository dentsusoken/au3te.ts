import { describe, expect, it } from 'vitest';
import { PushedAuthReqRequest } from './PushedAuthReqRequest';

describe('PushedAuthReqRequest', () => {
  const request = new PushedAuthReqRequest();

  it('getParameters', () => {
    expect(request.getParameters()).toBeUndefined();
  });

  it('setParameters', () => {
    const parameters = 'param1=value1&param2=value2';
    request.setParameters(parameters);
    expect(request.getParameters()).toBe(parameters);
  });

  it('getClientId', () => {
    expect(request.getClientId()).toBeUndefined();
  });

  it('setClientId', () => {
    const clientId = 'client123';
    request.setClientId(clientId);
    expect(request.getClientId()).toBe(clientId);
  });

  it('getClientSecret', () => {
    expect(request.getClientSecret()).toBeUndefined();
  });

  it('setClientSecret', () => {
    const clientSecret = 'secret123';
    request.setClientSecret(clientSecret);
    expect(request.getClientSecret()).toBe(clientSecret);
  });

  it('getClientCertificate', () => {
    expect(request.getClientCertificate()).toBeUndefined();
  });

  it('setClientCertificate', () => {
    const clientCertificate = 'certificate123';
    request.setClientCertificate(clientCertificate);
    expect(request.getClientCertificate()).toBe(clientCertificate);
  });

  it('getClientCertificatePath', () => {
    expect(request.getClientCertificatePath()).toBeUndefined();
  });

  it('setClientCertificatePath', () => {
    const clientCertificatePath = ['path1', 'path2'];
    request.setClientCertificatePath(clientCertificatePath);
    expect(request.getClientCertificatePath()).toBe(clientCertificatePath);
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
    const htm = 'POST';
    request.setHtm(htm);
    expect(request.getHtm()).toBe(htm);
  });

  it('getHtu', () => {
    expect(request.getHtu()).toBeUndefined();
  });

  it('setHtu', () => {
    const htu = 'https://example.com/par';
    request.setHtu(htu);
    expect(request.getHtu()).toBe(htu);
  });

  it('isDpopNonceRequired', () => {
    expect(request.isDpopNonceRequired()).toBeUndefined();
  });

  it('setDpopNonceRequired', () => {
    const required = true;
    request.setDpopNonceRequired(required);
    expect(request.isDpopNonceRequired()).toBe(required);
  });
});
