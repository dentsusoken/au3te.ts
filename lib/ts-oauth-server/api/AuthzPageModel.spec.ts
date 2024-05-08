import { describe, expect, it } from 'vitest';
// import { AuthorizationResponse } from '../types/AuthorizationResponse';
// import { FederationConfig } from '../types/FederationConfig';
import { AuthorizationResponse } from '../../au3te-ts-common/dto/AuthorizationResponse';
import { UserDao } from '../db/UserDao';
import { FederationConfig } from '../federation/FederationConfig';
import { AuthzPageModel } from './AuthzPageModel';

describe('AuthzPageModel', () => {
  it('should create an instance of AuthzPageModel', () => {
    const info = new AuthorizationResponse();
    const user = UserDao.getByCredentials('inga', 'inga');

    const authzPageModel = new AuthzPageModel(info, user, [
      new FederationConfig(),
    ]);

    expect(authzPageModel).toBeInstanceOf(AuthzPageModel);
  });

  it('should create an instance of AuthzPageModel without federations', () => {
    const info = new AuthorizationResponse();
    const user = UserDao.getByCredentials('inga', 'inga');

    const authzPageModel = new AuthzPageModel(info, user);

    expect(authzPageModel).toBeInstanceOf(AuthzPageModel);
  });
});
