import dotenv from 'dotenv';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { CredentialMetadataEndpoint } from './CredentialMetadataEndpoint';

dotenv.config({ path: path.resolve('.env.test') });

describe('CredentialMetadataEndpoint', () => {
  it('get', async () => {
    const endpoint = new CredentialMetadataEndpoint();
    // const request = new Request('https://example.com');

    const res = await endpoint.get();
    const json = await res.json();
    expect(json).toHaveProperty('credential_issuer');
    expect(json).toHaveProperty('credential_endpoint');
  });
});
