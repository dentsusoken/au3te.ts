import { AuthleteApi } from '../au3te-ts-common/api/AuthleteApi';
import { ServiceConfigurationRequest } from '../au3te-ts-common/dto/ServiceConfigurationRequest';
import { BaseEndpoint } from './BaseEndpoint';
import { ConfigurationRequestHandler } from './ConfigurationRequestHandler';

export class BaseConfigurationEndpoint extends BaseEndpoint {
  /**
   * Handle a request for OpenID Provider configuration.
   *
   * <p>
   * This method internally creates a {@link ConfigurationRequestHandler}
   * instance and calls its {@link ConfigurationRequestHandler#handle()} method.
   * Then, this method uses the value returned from the {@code handle()} method
   * as a response from this method.
   * </p>
   *
   * <p>
   * When {@code ConfigurationRequestHandler.handle()} method raises a {@link
   * WebApplicationException}, this method calls {@link #onError(WebApplicationException)
   * onError()} method with the exception. The default implementation of {@code onError()}
   * does nothing. You
   * can override the method as necessary. After calling {@code onError()} method,
   * this method calls {@code getResponse()} method of the exception and uses the
   * returned value as a response from this method.
   * </p>
   *
   * @param api
   *         An implementation of {@link AuthleteApi}.
   *
   * @return
   *         A response that should be returned to the client application.
   */
  public async handle(
    api: AuthleteApi,
    request?: ServiceConfigurationRequest
  ): Promise<Response> {
    try {
      const handler = new ConfigurationRequestHandler(api);

      if (request) {
        return handler.handle(request);
      }
      return handler.handle();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      this.onError(e);
      return new Response(e.message, { status: 500 });
    }
  }
}
