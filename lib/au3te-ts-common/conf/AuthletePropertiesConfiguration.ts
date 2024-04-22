import * as process from 'node:process';
import AuthleteConfiguration from './AuthleteConfiguration';

export default class AuthletePropertiesConfiguration
  implements AuthleteConfiguration
{
  public static readonly ALGORITHM: string = 'aes-256-cbc';
  public static readonly DEFAULT_KEY: string =
    'a281ac2de1195e8c91ea383d38d05d1c';
  public static readonly DEFAULT_IV: string =
    'b6f5d0f0dd7146b0e3915ebd2dd078f3';
  public static readonly DEFAULT_FILE: string = 'authlete.properties';
  // TODO Confirm this property is needed
  // public static readonly SYSTEM_PROPERTY_AUTHLETE_CONFIGURATION_FILE: string =
  //   'authlete.configuration.file';
  private static readonly PROPERTY_KEY_BASE_URL: string = 'base_url';
  private static readonly PROPERTY_KEY_SERVICE_API_KEY: string =
    'service.api_key';
  private static readonly PROPERTY_KEY_SERVICE_ACCESS_TOKEN: string =
    'service.access_token';
  private static readonly PROPERTY_KEY_API_VERSION: string = 'api_version';
  private static readonly BASE_URL_DEFAULT: string = 'https://api.authlete.com';

  // TODO Confirm if this is correct
  private mBaseUrl: string;
  private mServiceApiKey: string = '';
  private mServiceAccessToken: string = '';
  private mApiVersion: string = '';

  public constructor();
  public constructor(file: string);
  public constructor(file?: string) {
    this.mBaseUrl = process.env['BASE_URL'] || '';
    this.mServiceApiKey = process.env['API_KEY'] || '';
    this.mServiceAccessToken = process.env['ACCESS_TOKEN'] || '';
    this.mApiVersion = process.env['API_VERSION'] || '';
    // const props =
    //   typeof file === 'string'
    //     ? PropertiesLoader.load(file)
    //     : PropertiesLoader.load(
    //         path.resolve(
    //           process.cwd(),
    //           AuthletePropertiesConfiguration.DEFAULT_FILE
    //         )
    //       );
    // path.resolve(process.cwd(), AuthletePropertiesConfiguration.DEFAULT_FILE);
    // console.log(
    //   path.resolve(process.cwd(), AuthletePropertiesConfiguration.DEFAULT_FILE)
    // );
    // if (!props) {
    //   const message = `Failed to load '${file}'.`;
    //   throw new Error(message);
    // }
    // this.mBaseUrl = props.getString(
    //   AuthletePropertiesConfiguration.PROPERTY_KEY_BASE_URL,
    //   AuthletePropertiesConfiguration.BASE_URL_DEFAULT
    // );
    // this.mServiceApiKey = props.getString(
    //   AuthletePropertiesConfiguration.PROPERTY_KEY_SERVICE_API_KEY
    // );
    // this.mServiceAccessToken = props.getString(
    //   AuthletePropertiesConfiguration.PROPERTY_KEY_SERVICE_ACCESS_TOKEN
    // );
    // this.mApiVersion = props.getString(
    //   AuthletePropertiesConfiguration.PROPERTY_KEY_API_VERSION
    // );
  }

  public getApiVersion(): string {
    return this.mApiVersion;
  }

  public getBaseUrl(): string {
    return this.mBaseUrl;
  }

  public getServiceApiKey(): string {
    return this.mServiceApiKey;
  }

  public getServiceAccessToken(): string {
    return this.mServiceAccessToken;
  }
}
