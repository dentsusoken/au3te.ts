import { AuthleteApi } from '../au3te-ts-common/api/AuthleteApi';
import { ServiceConfigurationRequest } from '../au3te-ts-common/dto/ServiceConfigurationRequest';
import { BaseHandler } from './BaseHandler';
import { ResponseUtil } from './ResponseUtil';

export class ConfigurationRequestHandler extends BaseHandler {
  /**
   * Constructor with an implementation of {@link AuthleteApi} interface.
   *
   * @param api
   *         Implementation of {@link AuthleteApi} interface.
   *
   */
  constructor(api: AuthleteApi) {
    super(api);
  }

  /**
   * Handle a request to an OpenID Provider configuration endpoint. This
   * method is an alias of {@link #handle(boolean) handle}{@code (true)}.
   *
   * @param pretty
   *         {@code true} to return the output JSON in pretty format.
   *
   * @return
   *         A response that should be returned from the endpoint to
   *         the client application.
   *
   * @throws WebApplicationException
   *         An error occurred.
   */
  public async handle(
    request?: ServiceConfigurationRequest,
    pretty?: boolean
  ): Promise<Response> {
    if (!request && !pretty) {
      return this.handle(undefined, true);
    }
    try {
      const json = request
        ? await this.getApiCaller().callServiceConfiguration(request)
        : await this.getApiCaller().callServiceConfiguration(
            undefined,
            pretty as boolean
          );
      return ResponseUtil.ok(json);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      throw new Error(
        `Unexpected error in ConfigurationRequestHandler:  ${e.message}`
      );
    }
  }
}
