import { AuthleteApi } from '../au3te-ts-common/api/AuthleteApi';
import { BaseEndpoint } from './BaseEndpoint';
import { Params, PushedAuthReqHandler } from './PushedAuthReqHandler';

/**
 * A base class for pushed authorization endpoints.
 *
 * @since 2.21
 *
 * @see <a href="https://tools.ietf.org/html/draft-lodderstedt-oauth-par"
 *      >OAuth 2.0 Pushed Authorization Requests</a>
 *
 */
export class BasePushedAuthReqEndpoint extends BaseEndpoint {
  /**
   * Handle a PAR request.
   *
   * This method internally creates a `PushedAuthReqHandler` instance and
   * calls its `handle(PushedAuthReqHandler.Params)` method.
   * Then, this method uses the value returned from the `handle()` method
   * as a response from this method.
   *
   * When `PushedAuthReqHandler.handle()` method raises a `WebApplicationException`,
   * this method calls `onError(WebApplicationException)` method with the exception.
   * The default implementation of `onError()` does nothing. You can override the method as necessary.
   * After calling `onError()` method, this method calls `getResponse()` method of
   * the exception and uses the returned value as a response from this method.
   *
   * @param api
   *         An implementation of `AuthleteApi`.
   *
   * @param params
   *         Parameters needed to handle the PAR request.
   *
   * @return
   *         A response that should be returned to the client application.
   *
   * @since 2.70
   */
  public async handle(api: AuthleteApi, params: Params): Promise<Response> {
    try {
      // Create a handler.
      const handler: PushedAuthReqHandler = new PushedAuthReqHandler(api);

      // Delegate the task to the handler.
      return await handler.handle(params);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      // An error occurred in the handler.
      this.onError(e);
      // Convert the error to a Response.
      return new Response(e.message, { status: 500 });
    }
  }
}
