import dotenv from 'dotenv';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { Session } from '../../util/session';
import { AuthorizationDecisionEndpoint } from './AuthorizationDecisionEndpoint';
import { AuthorizationEndpoint } from './AuthorizationEndpoint';
import { TokenEndpoint } from './TokenEndpoint';

dotenv.config({ path: path.resolve('.env.test') });

describe('TokenEndpoint', () => {
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

  it('post', async () => {
    const authEndpoint = new AuthorizationEndpoint();
    const dicisionEndpoint = new AuthorizationDecisionEndpoint();
    const tokenEndpoint = new TokenEndpoint();

    // Authorization Request
    const authParams = new URLSearchParams({
      scope: 'org.iso.18013.5.1.mDL openid',
      code_challenge: '-wWUU3X62rCR7Z-zsCrfT7wPxLrticYIzI6mrXSqgzs',
      state: '7342EFBD-3D9F-4895-8445-18F365B8C66C',
      redirect_uri: process.env.REDIRECT_URI || '',
      code_challenge_method: 'plain',
      response_type: 'code',
      client_id: process.env.CLIENT_ID || '',
    });
    session.set('authTime', Date.now());
    await authEndpoint.get(
      new Request(`https://example.com?${authParams.toString()}`),
      session
    );

    // Authorization Decision Request
    const decisionParams = new URLSearchParams({
      loginId: 'inga',
      password: 'inga',
      authorized: 'authorized',
    });
    const authDecisionRequest = new Request(`https://example.com`, {
      method: 'POST',
      body: decisionParams.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const response = await dicisionEndpoint.post(authDecisionRequest, session);

    // Token Request
    const redirectUri = new URL(response.headers.get('Location')!);
    const tokenParams = new URLSearchParams(redirectUri.search);
    tokenParams.set('grant_type', 'authorization_code');
    tokenParams.set('client_id', process.env.CLIENT_ID || '');
    tokenParams.set('redirect_uri', process.env.REDIRECT_URI || '');
    tokenParams.set('code_verifier', authParams.get('code_challenge')!);
    const tokenRequest = new Request(`https://example.com`, {
      method: 'POST',
      body: tokenParams.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const tokenResponse = await tokenEndpoint.post(tokenRequest);
    const result = await tokenResponse.json();

    expect(result.access_token).toBeDefined();
  });
});
