import dotenv from 'dotenv';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { Session } from '../../util/session';
import { AuthorizationEndpoint } from './AuthorizationEndpoint';

dotenv.config({ path: path.resolve('.env.test') });

describe('AuthorizationEndpoint', () => {
  // const session: Session = () => {
  const data: Record<string, unknown> = {};
  const session: Session = {
    get: async (key: string) => {
      return data[key];
    },
    set: async (key: string, value: unknown) => {
      data[key] = value;
    },
    delete: async (key: string) => {
      delete data[key];
    },
    clear: async () => {
      Object.keys(data).forEach((key) => {
        delete data[key];
      });
    },
  };

  const params = {
    scope: 'org.iso.18013.5.1.mDL openid',
    code_challenge: '-wWUU3X62rCR7Z-zsCrfT7wPxLrticYIzI6mrXSqgzs',
    state: '7342EFBD-3D9F-4895-8445-18F365B8C66C',
    redirect_uri: process.env.REDIRECT_URI || '',
    code_challenge_method: 'S256',
    response_type: 'code',
    client_id: process.env.CLIENT_ID || '',
  };

  const searchParams = new URLSearchParams(params);

  it('get', async () => {
    const endpoint = new AuthorizationEndpoint();
    session.set('authTime', Date.now());
    const response = await endpoint.get(
      new Request(`https://example.com?${searchParams.toString()}`),
      session
    );
    expect(response.status).toBe(200);
  });

  it('post', async () => {
    const endpoint = new AuthorizationEndpoint();
    session.set('authTime', Date.now());
    const response = await endpoint.post(
      new Request(`https://example.com`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      session
    );
    expect(response.status).toBe(200);
  });
});
