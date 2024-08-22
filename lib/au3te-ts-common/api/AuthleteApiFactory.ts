import { AuthleteApiImplV3 } from '../../au3te-ts-tsxrs/api/AuthleteApiImplV3';
import { AuthleteApiVersion } from '../conf/AuthleteApiVersion';
import { AuthleteConfiguration } from '../conf/AuthleteConfiguration';
import { AuthletePropertiesConfiguration } from '../conf/AuthletePropertiesConfiguration';
import { AuthleteApi } from './AuthleteApi';

export class AuthleteApiFactory {
  private static sDefaultApi: AuthleteApi | undefined = undefined;

  private constructor() {}

  public static async create(
    configuration: AuthleteConfiguration
  ): Promise<AuthleteApi | undefined> {
    const version = AuthleteApiVersion.parse(configuration.getApiVersion());

    if (version === AuthleteApiVersion.V3) {
      return await AuthleteApiFactory.createImpl(configuration);
    } else {
      // must be V3
      return undefined;
    }
  }

  private static async createImpl(
    configuration: AuthleteConfiguration
  ): Promise<AuthleteApi | undefined> {
    try {
      return await AuthleteApiFactory.createInstance(configuration);
    } catch (e) {
      // Ignore.
    }

    return undefined;
  }

  public static async createInstance(
    configuration: AuthleteConfiguration
  ): Promise<AuthleteApi> {
    if (!configuration) {
      throw new Error('configuration is undefined.');
    }

    return new AuthleteApiImplV3(configuration);
  }

  public static async getDefaultApi(): Promise<AuthleteApi> {
    console.log(
      'AuthleteApiFactory.sDefaultApi :>> ',
      AuthleteApiFactory.sDefaultApi
    );

    if (AuthleteApiFactory.sDefaultApi) {
      return AuthleteApiFactory.sDefaultApi;
    }

    const ac = new AuthletePropertiesConfiguration();
    const api = await AuthleteApiFactory.create(ac);
    if (!api) {
      throw new Error('Failed to create an instance of AuthleteApi.');
    }
    AuthleteApiFactory.sDefaultApi = api;
    return AuthleteApiFactory.sDefaultApi;
  }
}
