import { describe, it } from 'vitest';

// TODO Token Endpoint
describe('TokenEndpoint', () => {
  it('post', async () => {
    const params = new URLSearchParams();
    params.set('grant_type', 'authorization_code');
    params.set('code', 'code');

    const request = new Request('http://localhost:3000', {
      method: 'POST',
      body: params.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const data = await request.formData();
    // console.log(await request.formData());
    // console.log(await request.text());
  });
});
