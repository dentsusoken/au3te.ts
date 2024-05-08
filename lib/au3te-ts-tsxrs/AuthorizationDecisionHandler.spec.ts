import { describe, expect, test, vi } from 'vitest';
import { AuthleteApi } from '../au3te-ts-common/api/AuthleteApi';
import { AuthorizationIssueResponse } from '../au3te-ts-common/dto/AuthorizationIssueResponse';
import { Client } from '../au3te-ts-common/dto/Client';
import { AuthorizationDecisionHandlerSpiImpl } from '../ts-oauth-server/api/AuthorizationDecisionHandlerSpiImpl';
import { UserDao } from '../ts-oauth-server/db/UserDao';
import {
  AuthorizationDecisionHandler,
  Params,
} from './AuthorizationDecisionHandler';

describe('AuthorizationDecisionHandler', () => {
  test('handle - should call process method', async () => {
    const user = UserDao.getByCredentials('inga', 'inga');

    // @ts-expect-error - Mocking
    const api = {
      authorizationIssue: vi
        .fn()
        .mockResolvedValue(
          new AuthorizationIssueResponse().setAction(
            AuthorizationIssueResponse.Action.LOCATION
          )
        ),
    } as AuthleteApi;

    const spi = new AuthorizationDecisionHandlerSpiImpl(
      { loginId: 'inga', password: 'inga', authorized: 'Authorize' },
      user,
      new Date(),
      '',
      [],
      new Client()
    );
    const handler = new AuthorizationDecisionHandler(api, spi);
    const params = new Params();

    // Act
    const result = await handler.handle(params);

    // Assert
    expect(result).toBeDefined();
  });
});
