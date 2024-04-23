import { describe, expect, it, vitest } from 'vitest';
import PushedAuthReqResponse, {
  Action,
} from '../au3te-ts-common/dto/PushedAuthReqResponse';
import PushedAuthReqHandler, { Params } from './PushedAuthReqHandler';

describe('PushedAuthReqHandler', () => {
  it('should handle a PAR request', async () => {
    // Create a mock instance of AuthleteApi
    const apiMock = {
      pushAuthorizationRequest: vitest
        .fn()
        .mockReturnValue(new PushedAuthReqResponse().setAction(Action.CREATED)),
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
    };

    // Create an instance of PushedAuthReqHandler
    const handler = new PushedAuthReqHandler(apiMock);

    // Create mock parameters
    const params = new Params();

    // Call the handle method and expect it to throw an error
    await expect(handler.handle(params)).rejects.toThrow('Unexpected error');
  });
});
