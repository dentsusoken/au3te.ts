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

  // protected unexpected(
  //   message: string,
  //   cause: Error
  // ): InternalServerErrorException {
  //   if (cause != null && cause.message != null) {
  //     // Append the message of the cause.
  //     message += ': ' + cause.message;
  //   }

  //   // Response having a response body.
  //   const response: Response = ResponseUtil.internalServerError(
  //     message,
  //     'text/plain'
  //   );

  //   return new InternalServerErrorException(message, response, cause);
  // }
}
