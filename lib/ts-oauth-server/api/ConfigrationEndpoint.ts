import { AuthleteApiFactory } from '../../au3te-ts-common/api/AuthleteApiFactory';
import { ServiceConfigurationRequest } from '../../au3te-ts-common/dto/ServiceConfigurationRequest';
import { BaseConfigurationEndpoint } from '../../au3te-ts-tsxrs/BaseConfigurationEndpoint';

export class ConfigrationEndpoint extends BaseConfigurationEndpoint {
  public async get(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const queryParams = url.searchParams;
    const pretty = queryParams.get('pretty') || undefined;
    const patch = queryParams.get('patch') || undefined;

    const api = await AuthleteApiFactory.getDefaultApi();
    if (!!pretty || !!patch) {
      return this.handle(
        api,
        ConfigrationEndpoint.createRequest(pretty, patch)
      );
    }
    return this.handle(api);
  }

  private static createRequest(pretty?: string, patch?: string) {
    return new ServiceConfigurationRequest()
      .setPretty(this.determinPretty(pretty))
      .setPatch(patch);
  }

  private static determinPretty(pretty?: string) {
    if (!pretty) {
      return true;
    }
    return Boolean(pretty);
  }
}
