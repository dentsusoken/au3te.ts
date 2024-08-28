import { User } from '../../au3te-ts-common/types/User';
import { Session } from '../../util/session';
import { UserDao } from '../db/UserDao';

export class ProcessingUtil {
  static async getUser(
    session: Session,
    parameters: Record<string, string>
  ): Promise<User> {
    const sessionUser = (await session.get('user')) as User;
    if (sessionUser) {
      return sessionUser;
    }

    const loginUser = UserDao.getByCredentials(
      parameters['loginId'],
      parameters['password']
    );

    if (loginUser) {
      console.info('Authenticated successfully :', loginUser.getLoginId());
      session.set('user', loginUser);
      session.set('authTime', Date.now());
    }
    return loginUser;
  }
}
