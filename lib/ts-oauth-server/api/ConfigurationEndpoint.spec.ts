import dotenv from 'dotenv';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { ConfigurationEndpoint } from './ConfigurationEndpoint';

dotenv.config({ path: path.resolve('.env.test') });

describe('ConfigurationEndpoint', () => {
  it('get', async () => {
    const endpoint = new ConfigurationEndpoint();
    const request = new Request('https://example.com');

    const res = await endpoint.get(request);
    const json = await res.json();
    expect(json).toHaveProperty('issuer');
    expect(json).toHaveProperty('authorization_endpoint');
    expect(json).toHaveProperty('token_endpoint');
    expect(json).toHaveProperty('pushed_authorization_request_endpoint');
  });
});
