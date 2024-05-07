import { describe, it } from 'vitest';
import { AuthorizationEndpoint } from './AuthorizationEndpoint';

describe('AuthorizationEndpoint', () => {
  it('get', () => {
    const endpoint = new AuthorizationEndpoint();
    endpoint.get(
      new Request(
        'http://localhost:3000/authorize?response_type=code&client_id=client_id&redirect_uri=http://localhost:3000/callback&scope=profile'
      )
    );
  });

  //   it('handle', () => {
  //     // return this.get(request);
  //   });
});
