import AuthleteApi from '../au3te-ts-common/api/AuthleteApi';
import AuthleteApiCaller from './AuthleteApiCaller';

export default abstract class BaseHandler {
  private readonly mApiCaller: AuthleteApiCaller;

  protected constructor(api: AuthleteApi) {
    this.mApiCaller = new AuthleteApiCaller(api);
  }

  protected getApiCaller(): AuthleteApiCaller {
    return this.mApiCaller;
  }
}
