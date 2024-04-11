import AuthleteApiVersion from '../conf/AuthleteApiVersion';
import AuthleteConfiguration from '../conf/AuthleteConfiguration';
import AuthletePropertiesConfiguration from '../conf/AuthletePropertiesConfiguration';
import AuthleteApi from './AuthleteApi';

export default class AuthleteApiFactory {
  private static readonly IMPL_JAX_RS_V3 =
    '../../au3te-ts-tsxrs/api/AuthleteApiImplV3';

  private static readonly sKnownImplsV3 = [AuthleteApiFactory.IMPL_JAX_RS_V3];

  private static sDefaultApi: AuthleteApi | null = null;

  private constructor() {}

  public static async create(
    configuration: AuthleteConfiguration
  ): Promise<AuthleteApi | null> {
    const version = AuthleteApiVersion.parse(configuration.getApiVersion());

    if (version === AuthleteApiVersion.V3) {
      return await AuthleteApiFactory.createImpl(
        configuration,
        AuthleteApiFactory.sKnownImplsV3
      );
    } else {
      // must be V3
      return null;
    }
  }

  private static async createImpl(
    configuration: AuthleteConfiguration,
    implementations: string[]
  ): Promise<AuthleteApi | null> {
    for (const className of implementations) {
      try {
        return await AuthleteApiFactory.createInstance(
          configuration,
          className
        );
      } catch (e) {
        // Ignore.
      }
    }

    return null;
  }

  public static async createInstance(
    configuration: AuthleteConfiguration,
    className: string
  ): Promise<AuthleteApi> {
    if (!configuration) {
      throw new Error('configuration is null.');
    }

    if (!className) {
      throw new Error('className is null.');
    }

    let clazz: any;

    try {
      clazz = await import(className);
    } catch (e) {
      throw new Error(`${className} is not found.`);
    }

    let constructor: any;
    constructor = clazz.default;

    let api: AuthleteApi;

    try {
      api = new constructor(configuration);
      if (!AuthleteApi.instanceofAuthleteApi(api)) {
        throw new Error(
          `${className} does not implement AuthleteApi interface.`
        );
      }
    } catch (e) {
      throw new Error(`Failed to create an instance of ${className}.`);
    }

    return api;
  }

  public static async getDefaultApi(): Promise<AuthleteApi> {
    if (AuthleteApiFactory.sDefaultApi) {
      return AuthleteApiFactory.sDefaultApi;
    }

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
