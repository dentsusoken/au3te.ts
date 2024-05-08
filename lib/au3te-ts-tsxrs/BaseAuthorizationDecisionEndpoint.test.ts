import { describe, expect, test, vi } from 'vitest';
import { AuthleteApi } from '../au3te-ts-common/api/AuthleteApi';
import { AuthorizationIssueResponse } from '../au3te-ts-common/dto/AuthorizationIssueResponse';
import { Params } from './AuthorizationDecisionHandler';
import { BaseAuthorizationDecisionEndpoint } from './BaseAuthorizationDecisionEndpoint';
import { AuthorizationDecisionHandlerSpi } from './spi/AuthorizationDecisionHandlerSpi';

describe('BaseAuthorizationDecisionEndpoint', () => {
  test('handle should call AuthorizationDecisionHandler.handle', async () => {
    // Mock the dependencies
    // @ts-expect-error - Mocking
    const api = {
      authorization: vi
        .fn()
        .mockReturnValue(
          new AuthorizationIssueResponse().setAction(
            AuthorizationIssueResponse.Action.LOCATION
          )
        ),
    } as AuthleteApi;

    const spi = {} as AuthorizationDecisionHandlerSpi;
    const params = new Params();

    // Mock the BaseAuthorizationDecisionEndpoint instance
    const endpoint = new BaseAuthorizationDecisionEndpoint();

    // Call the handle method
    const result = await endpoint.handle(api, spi, params);

    // Assert that the result is the new Response instance
    expect(result).toBeInstanceOf(Response);
  });
});
