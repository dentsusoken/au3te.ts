import { describe, expect, it } from 'vitest';
import { UserDao } from './UserDao';

describe('UserDao', () => {
  it('should return user when credentials are valid', () => {
    // Arrange
    const loginId = 'inga';
    const password = 'inga';

    // Act
    const result = UserDao.getByCredentials(loginId, password);

    // Assert
    expect(result.getSubject()).toEqual('1004');
    expect(result.getLoginId()).toEqual('inga');
    expect(result.getPassword()).toEqual('inga');
  });

  it('should return undefined when credentials are invalid', () => {
    // Arrange
    const loginId = 'testUser';
    const password = 'invalidPassword';

    // Act
    const result = UserDao.getByCredentials(loginId, password);

    // Assert
    expect(result).toBeUndefined();
  });
});
