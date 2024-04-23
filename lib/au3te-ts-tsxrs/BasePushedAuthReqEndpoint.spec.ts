import { beforeEach, describe, expect, it, vitest } from 'vitest';
import AuthleteApi from '../au3te-ts-common/api/AuthleteApi';
import BasePushedAuthReqEndpoint from './BasePushedAuthReqEndpoint';
import { Params } from './PushedAuthReqHandler';

describe('BasePushedAuthReqEndpoint', () => {
  let api: AuthleteApi;
  let params: Params;
  let endpoint: BasePushedAuthReqEndpoint;

  beforeEach(() => {
    api = {} as AuthleteApi;
    params = {} as Params;
    endpoint = new BasePushedAuthReqEndpoint();
  });

  it('should handle PAR request', async () => {
    const handlerMock = {
      handle: vitest.fn().mockResolvedValue({} as Response),
    };

    vitest
      .spyOn(endpoint, 'handle')
      .mockReturnValue(
        new Promise(() => new Response('Error', { status: 500 }))
      );
    vitest.spyOn(endpoint, 'handle').mockImplementation(async () => {
      return await handlerMock.handle(params);
    });

    const response = await endpoint.handle(api, params);

    expect(endpoint.handle).toHaveBeenCalledWith(api, params);
    expect(handlerMock.handle).toHaveBeenCalledWith(params);
    expect(response).toEqual({} as Response);
  });
});
