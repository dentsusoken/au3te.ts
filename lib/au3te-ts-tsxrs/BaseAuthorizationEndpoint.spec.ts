import { describe, expect, test, vi } from 'vitest';
import { AuthleteApi } from '../au3te-ts-common/api/AuthleteApi';
import { AuthorizationResponse } from '../au3te-ts-common/dto/AuthorizationResponse';
import { AuthorizationRequestHandler } from './AuthorizationRequestHandler';
import { BaseAuthorizationEndpoint } from './BaseAuthorizationEndpoint';
import { AuthorizationRequestHandlerSpi } from './spi/AuthorizationRequestHandlerSpi';

describe('BaseAuthorizationEndpoint', () => {
  test('handleInternal should call AuthorizationRequestHandler.handle', async () => {
    // Mock dependencies
    // @ts-expect-error - Mocking
    const api = {
      authorization: vi.fn().mockResolvedValue(new AuthorizationResponse()),
    } as AuthleteApi;
    const spi = {} as AuthorizationRequestHandlerSpi;
    const parameters = {};

    // Mock AuthorizationRequestHandler
    const handleMock = vi.fn().mockResolvedValue({});
    vi.spyOn(
      AuthorizationRequestHandler.prototype,
      'handle'
    ).mockImplementation(handleMock);

    // Create an instance of BaseAuthorizationEndpoint
    const baseAuthorizationEndpoint = new BaseAuthorizationEndpoint();

    // Call handleInternal method
    await baseAuthorizationEndpoint.handleInternal(api, spi, parameters);

    // Expect AuthorizationRequestHandler.handle to be called with the provided parameters
    expect(handleMock).toHaveBeenCalledWith(parameters);
  });

  test('handleInternal should return a Response object with status 500 on error', async () => {
    // Mock dependencies
    // @ts-expect-error - Mocking
    const api = {
      authorization: vi.fn().mockResolvedValue(new AuthorizationResponse()),
    } as AuthleteApi;
    const spi = {} as AuthorizationRequestHandlerSpi;
    const parameters = {};

    // Mock AuthorizationRequestHandler
    const handleMock = vi.fn().mockRejectedValue(new Error('Some error'));
    vi.spyOn(
      AuthorizationRequestHandler.prototype,
      'handle'
    ).mockImplementation(handleMock);

    // Create an instance of BaseAuthorizationEndpoint
    const baseAuthorizationEndpoint = new BaseAuthorizationEndpoint();

    // Call handleInternal method
    const response = await baseAuthorizationEndpoint.handleInternal(
      api,
      spi,
      parameters
    );

    // Expect the response to be a Response object with status 500
    expect(response.status).toBe(500);
  });
});
