import { describe, expect, it, vitest } from 'vitest';
import { AuthorizationIssueResponse } from '../au3te-ts-common/dto/AuthorizationIssueResponse';
import { AuthorizationResponse } from '../au3te-ts-common/dto/AuthorizationResponse';
import {
  Action,
  PushedAuthReqResponse,
} from '../au3te-ts-common/dto/PushedAuthReqResponse';
import { Params, PushedAuthReqHandler } from './PushedAuthReqHandler';

describe('PushedAuthReqHandler', () => {
  it('should handle a PAR request', async () => {
    // Create a mock instance of AuthleteApi
    const apiMock = {
      pushAuthorizationRequest: vitest
        .fn()
        .mockReturnValue(new PushedAuthReqResponse().setAction(Action.CREATED)),
      authorization: vitest.fn().mockResolvedValue(new AuthorizationResponse()),
      authorizationIssue: vitest
        .fn()
        .mockResolvedValue(new AuthorizationIssueResponse()),
    };

    // Create an instance of PushedAuthReqHandler
    const handler = new PushedAuthReqHandler(apiMock);

    // Create mock parameters
    const params = new Params();

    // Call the handle method
    const response = await handler.handle(params);

    expect(response instanceof Response).toBe(true);
  });

  it('should throw an error when an unexpected error occurs', async () => {
    // Create a mock instance of AuthleteApi
    const apiMock = {
      pushAuthorizationRequest: vitest
        .fn()
        .mockRejectedValue(new Error('Unexpected error')),
      authorization: vitest.fn().mockResolvedValue(new AuthorizationResponse()),
      authorizationIssue: vitest
        .fn()
        .mockResolvedValue(new AuthorizationIssueResponse()),
    };

    // Create an instance of PushedAuthReqHandler
    const handler = new PushedAuthReqHandler(apiMock);

    // Create mock parameters
    const params = new Params();

    // Call the handle method and expect it to throw an error
    await expect(handler.handle(params)).rejects.toThrow('Unexpected error');
  });
});
