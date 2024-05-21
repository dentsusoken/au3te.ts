import { describe, expect, it, vi } from 'vitest';
import { AuthorizationResponse } from '../../au3te-ts-common/dto/AuthorizationResponse';
import { Session } from '../../util/session';
import { AuthorizationRequestHandlerSpiImpl } from './AuthorizationRequestHandlerSpiImpl';

describe('AuthorizationRequestHandlerSpiImpl', () => {
  it('should generate authorization page', async () => {
    // Arrange
    const info = new AuthorizationResponse().setClaims(['openid']);

    const data: Record<string, unknown> = {
      authTime: Math.round(Date.now() / 1000),
    };

    // @ts-expect-error - Mocking
    const sessionMock = {
      set: vi.fn((key: string, value: unknown) => (data[key] = value)),
      get: vi.fn((key: string) => data[key]),
    } as Session;

    const handler = new AuthorizationRequestHandlerSpiImpl(
      new Request('https://example.com'),
      sessionMock
    );

    // Act
    const response = await handler.generateAuthorizationPage(info);
    expect(response.headers.get('Content-Type')).toEqual(
      'text/html;charset=utf-8'
    );
  });
});
