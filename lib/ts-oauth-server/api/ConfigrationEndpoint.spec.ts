import dotenv from 'dotenv';
import { it } from 'node:test';
import path from 'path';
import { describe, expect } from 'vitest';
import { ConfigrationEndpoint } from './ConfigrationEndpoint';

dotenv.config({ path: path.resolve('.env.test') });

describe('ConfigrationEndpoint', () => {
  it('get', async () => {
    const endpoint = new ConfigrationEndpoint();
    const request = new Request('https://example.com');

    const res = await endpoint.get(request);
    console.log('res :>> ', res);
    expect(res).toBeDefined();
  });
});
