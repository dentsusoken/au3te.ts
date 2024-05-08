import { describe, expect, it, vi } from 'vitest';
import { Session } from '../../util/session';
import { UserDao } from '../db/UserDao';
import { ProcessingUtil } from './ProcessingUtil';

describe('ProcessingUtil', () => {
  describe('getUser', () => {
    it('should return session user if available', async () => {
      const sessionUser = UserDao.getByCredentials('inga', 'inga');
      // @ts-expect-error - Mocking
      const session: Session = {
        get: vi.fn().mockReturnValue(sessionUser),
        set: vi.fn(),
      };
      // session.set('user', sessionUser);

      // Act
      const result = await ProcessingUtil.getUser(session, {});

      // Assert
      expect(result).toBe(sessionUser);
    });

    it('should return login user if credentials are valid', async () => {
      // @ts-expect-error - Mocking
      const session: Session = {
        get: vi.fn().mockReturnValue(undefined),
        set: vi.fn(),
      };
      const parameters = {
        loginId: 'inga',
        password: 'inga',
      };

      // Act
      const result = await ProcessingUtil.getUser(session, parameters);

      // Assert
      expect(result.getSubject()).toBe('1004');
    });

    it('should return undefined if credentials are invalid', async () => {
      // @ts-expect-error - Mocking
      const session: Session = {
        get: vi.fn().mockReturnValue(undefined),
        set: vi.fn(),
      };
      const parameters = {
        loginId: 'jane@example.com',
        password: 'wrongpassword',
      };

      // Act
      const result = await ProcessingUtil.getUser(session, parameters);

      // Assert
      expect(result).toBeUndefined();
    });
  });
});
