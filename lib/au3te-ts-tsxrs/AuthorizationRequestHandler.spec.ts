import dotenv from 'dotenv';
import path from 'path';
import { describe, expect, it, vi } from 'vitest';
import { AuthleteApi } from '../au3te-ts-common/api/AuthleteApi';
import { AuthorizationResponse } from '../au3te-ts-common/dto/AuthorizationResponse';
import { AuthorizationRequestHandler } from './AuthorizationRequestHandler';
import { AuthorizationRequestHandlerSpi } from './spi/AuthorizationRequestHandlerSpi';

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

describe('AuthorizationRequestHandler', () => {
  it('should handle authorization request', () => {
    // Create a mock AuthorizationRequestHandlerSpi
    // @ts-expect-error - Mocking
    const spi = {
      generateAuthorizationPage: vi.fn(),
      isUserAuthenticated: vi.fn().mockReturnValue(true),
    } as AuthorizationRequestHandlerSpi;

    // Create a mock AuthleteApi
    // @ts-expect-error - Mocking
    const api = {
      authorization: vi
        .fn()
        .mockResolvedValue(
          new AuthorizationResponse().setAction(
            AuthorizationResponse.Action.INTERACTION
          )
        ),
    } as AuthleteApi;

    // Create an instance of AuthorizationRequestHandler
    const handler = new AuthorizationRequestHandler(api, spi);

    // Create mock parameters
    const parameters = params;

    // Call the handle method
    const result = handler.handle(parameters);

    // Assert the result
    expect(result).toBeDefined();
    // Add more assertions here
  });
});
