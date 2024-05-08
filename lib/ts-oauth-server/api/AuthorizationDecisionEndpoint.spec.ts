import dotenv from 'dotenv';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { Session } from '../../util/session';
import { AuthorizationDecisionEndpoint } from './AuthorizationDecisionEndpoint';
import { AuthorizationEndpoint } from './AuthorizationEndpoint';

dotenv.config({ path: path.resolve('.env.test') });

describe('AuthorizationEndpoint', () => {
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

  const params = new URLSearchParams({
    scope: 'org.iso.18013.5.1.mDL openid',
    code_challenge: '-wWUU3X62rCR7Z-zsCrfT7wPxLrticYIzI6mrXSqgzs',
    state: '7342EFBD-3D9F-4895-8445-18F365B8C66C',
    redirect_uri: process.env.REDIRECT_URI || '',
    code_challenge_method: 'S256',
    response_type: 'code',
    client_id: process.env.CLIENT_ID || '',
  });

  it('post', async () => {
    const authEndpoint = new AuthorizationEndpoint();
    const dicisionEndpoint = new AuthorizationDecisionEndpoint();
    session.set('authTime', Date.now());
    await authEndpoint.get(
      new Request(`https://example.com?${params.toString()}`),
      session
    );
    const request = new Request(`https://example.com`, {
      method: 'POST',
      body: JSON.stringify({
        loginId: 'inga',
        password: 'inga',
        authorized: 'Authorize',
      }),
    });
    const response = await dicisionEndpoint.post(request, session);
    expect(response.headers.get('Location')).not.toBe(undefined);
  });

  //   it('handle', () => {
  //     // return this.get(request);
  //   });
});
