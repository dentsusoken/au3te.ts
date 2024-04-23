import dotenv from 'dotenv';
import path from 'path';
import { describe, expect, it } from 'vitest';
import PushedAuthReqEndpoint from './PushedAuthReqEndpoint';

dotenv.config({ path: path.resolve('.env.test') });

const params = {
  scope: 'org.iso.18013.5.1.mDL openid',
  code_challenge: '-wWUU3X62rCR7Z-zsCrfT7wPxLrticYIzI6mrXSqgzs',
  state: '7342EFBD-3D9F-4895-8445-18F365B8C66C',
  redirect_uri: process.env.REDIRECT_URI || '',
  code_challenge_method: 'S256',
  response_type: 'code',
  client_id: process.env.CLIENT_ID || '',
};

describe('PushedAuthReqEndpoint', async () => {
  it('should post application/json', async () => {
    const endpoint = new PushedAuthReqEndpoint();
    const request = new Request('https://example.com', {
      headers: [['Content-Type', 'application/json;charset=UTF-8']],
      body: JSON.stringify(params),
      method: 'POST',
    });

    const response = await endpoint.post(request);
    const body = await response.json();
    expect(response).toBeDefined();
    expect(response.status).toBe(201);
    expect(body.expires_in).toBeDefined();
    expect(body.request_uri).toBeDefined();
  });

  it('should post application/x-www-form-urlencoded', async () => {
    const endpoint = new PushedAuthReqEndpoint();
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, value);
    });
    const request = new Request('https://example.com', {
      headers: [['Content-Type', 'application/x-www-form-urlencoded']],
      body: searchParams.toString(),
      method: 'POST',
    });

    const response = await endpoint.post(request);
    const body = await response.json();
    expect(response).toBeDefined();
    expect(response.status).toBe(201);
    expect(body.expires_in).toBeDefined();
    expect(body.request_uri).toBeDefined();
  });
});
