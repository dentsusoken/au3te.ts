import { describe, expect, it, vi } from 'vitest';
import { AuthleteApi } from '../au3te-ts-common/api/AuthleteApi';
import { Action, TokenResponse } from '../au3te-ts-common/dto/TokenResponse';
import { Params, TokenRequestHandler } from './TokenRequestHandler';
import { TokenRequestHandlerSpi } from './spi/TokenRequestHandlerSpi';

describe('TokenRequestHandler', () => {
  const spiMock: TokenRequestHandlerSpi = {
    getProperties: vi.fn().mockReturnValue([]),
  };

  describe('prosess method', () => {
    it('should return 401 Response if Action is INVALID_CLIENT', async () => {
      // @ts-expect-error - Mocking
      const apiMock: AuthleteApi = {
        token: vi
          .fn()
          .mockReturnValue(
            new TokenResponse().setAction(Action.INVALID_CLIENT)
          ),
      };
      const handler = new TokenRequestHandler(apiMock, spiMock);
      const response = await handler.handle(new Params());
      expect(response.status).toBe(401);
    });
    it('should return 500 Response if Action is INTERNAL_SERVER_ERROR', async () => {
      // @ts-expect-error - Mocking
      const apiMock: AuthleteApi = {
        token: vi
          .fn()
          .mockReturnValue(
            new TokenResponse().setAction(Action.INTERNAL_SERVER_ERROR)
          ),
      };
      const handler = new TokenRequestHandler(apiMock, spiMock);
      const response = await handler.handle(new Params());
      expect(response.status).toBe(500);
    });
    it('should return 400 Response if Action is BAD_REQUEST', async () => {
      // @ts-expect-error - Mocking
      const apiMock: AuthleteApi = {
        token: vi
          .fn()
          .mockReturnValue(new TokenResponse().setAction(Action.BAD_REQUEST)),
      };
      const handler = new TokenRequestHandler(apiMock, spiMock);
      const response = await handler.handle(new Params());
      expect(response.status).toBe(400);
    });
    it('should return 200 Response if Action is OK', async () => {
      // @ts-expect-error - Mocking
      const apiMock: AuthleteApi = {
        token: vi
          .fn()
          .mockReturnValue(new TokenResponse().setAction(Action.OK)),
      };
      const handler = new TokenRequestHandler(apiMock, spiMock);
      const response = await handler.handle(new Params());
      expect(response.status).toBe(200);
    });
    it('should throw error if Action is unknown', async () => {
      // @ts-expect-error - Mocking
      const apiMock: AuthleteApi = {
        token: vi.fn().mockReturnValue(new TokenResponse()),
      };
      const handler = new TokenRequestHandler(apiMock, spiMock);
      expect(() => handler.handle(new Params())).rejects.toThrowError(
        'Authlete /api/auth/token API returned an unknown action:'
      );
    });
  });
});
