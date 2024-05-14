import { describe, expect, it, vi } from 'vitest';
import { AuthleteApi } from '../au3te-ts-common/api/AuthleteApi';
import { TokenResponse } from '../au3te-ts-common/dto/TokenResponse';
import { BaseTokenEndpoint } from './BaseTokenEndpoint';
import { Params, TokenRequestHandler } from './TokenRequestHandler';
import { TokenRequestHandlerSpi } from './spi/TokenRequestHandlerSpi';

describe('BaseTokenEndpoint', () => {
  it('handle method should return Response Object', async () => {
    // @ts-expect-error - Mocking
    const apiMock: AuthleteApi = {
      token: vi.fn().mockReturnValue(new TokenResponse()),
    };

    const spiMock: TokenRequestHandlerSpi = {
      getProperties: vi.fn().mockReturnValue([]),
    };

    const params = new Params();

    const spy = vi
      .spyOn(TokenRequestHandler.prototype, 'handle')
      .mockImplementation(vi.fn().mockReturnValue(new Response()));

    const endpoint = new BaseTokenEndpoint();
    const response = await endpoint.handle(apiMock, spiMock, params);

    expect(response).toBeInstanceOf(Response);
    expect(spy).toHaveBeenCalledOnce();
  });
});
