import { describe, expect, it } from 'vitest';
import PushedAuthReqEndpoint from './PushedAuthReqEndpoint';

describe('PushedAuthReqEndpoint', async () => {
  it('should post', async () => {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
    const endpoint = new PushedAuthReqEndpoint();
    const params = {
      scope: 'org.iso.18013.5.1.mDL',
      code_challenge: '-wWUU3X62rCR7Z-zsCrfT7wPxLrticYIzI6mrXSqgzs',
      state: '7342EFBD-3D9F-4895-8445-18F365B8C66C',
      redirect_uri: 'eudi-openid4ci://authorize/',
      code_challenge_method: 'S256',
      response_type: 'code',
      client_id: 'tw24.wallet.dentsusoken.com',
    };

    const request = new Request('https://example.com', {
      body: JSON.stringify(params),
      method: 'POST',
    });

    // Call the post method and assert the response
    const response = await endpoint.post(request);
    const body = await response.json();
    console.log('response :>> ', body);
    expect(response).toBeDefined();
    expect(response.status).toBe(201);
    expect(body.expires_in).toBeDefined();
    expect(body.request_uri).toBeDefined();
    // Add more assertions as needed
  });
});
