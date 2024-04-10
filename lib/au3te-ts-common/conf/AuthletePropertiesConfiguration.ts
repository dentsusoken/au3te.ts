class AuthletePropertiesConfiguration implements AuthleteConfiguration {
  public static readonly DEFAULT_KEY: string =
    'a281ac2de1195e8c91ea383d38d05d1c';
  public static readonly DEFAULT_IV: string =
    'b6f5d0f0dd7146b0e3915ebd2dd078f3';
  public static readonly DEFAULT_FILE: string = 'authlete.properties';
  public static readonly SYSTEM_PROPERTY_AUTHLETE_CONFIGURATION_FILE: string =
    'authlete.configuration.file';
  private static readonly PROPERTY_KEY_BASE_URL: string = 'base_url';
  private static readonly PROPERTY_KEY_SERVICE_OWNER_API_KEY: string =
    'service_owner.api_key';
  private static readonly PROPERTY_KEY_SERVICE_OWNER_API_SECRET_ENCRYPTED: string =
    'service_owner.api_secret.encrypted';
  private static readonly PROPERTY_KEY_SERVICE_OWNER_API_SECRET: string =
    'service_owner.api_secret';
  private static readonly PROPERTY_KEY_SERVICE_OWNER_ACCESS_TOKEN: string =
    'service_owner.access_token';
  private static readonly PROPERTY_KEY_SERVICE_API_KEY: string =
    'service.api_key';
  private static readonly PROPERTY_KEY_SERVICE_API_SECRET_ENCRYPTED: string =
    'service.api_secret.encrypted';
  private static readonly PROPERTY_KEY_SERVICE_API_SECRET: string =
    'service.api_secret';
  private static readonly PROPERTY_KEY_SERVICE_ACCESS_TOKEN: string =
    'service.access_token';
  private static readonly PROPERTY_KEY_DPOP_KEY: string = 'service.dpop_key';
  private static readonly PROPERTY_KEY_CLIENT_CERTIFICATE: string =
    'service.client_certificate';
  private static readonly PROPERTY_KEY_API_VERSION: string = 'api_version';
  private static readonly BASE_URL_DEFAULT: string = 'https://api.authlete.com';
  private mBaseUrl: string;
  private mServiceOwnerApiKey: string;
  private mServiceOwnerApiSecret: string;
  private mServiceOwnerAccessToken: string;
  private mServiceApiKey: string;
  private mServiceApiSecret: string;
  private mServiceAccessToken: string;
  private mDpopKey: string;
  private mClientCertificate: string;
  private mApiVersion: string;

  constructor(key: string, iv: string);
  constructor(key: Uint8Array, iv: Uint8Array);
  constructor(
    file: string,
    key?: string | Uint8Array,
    iv?: string | Uint8Array
  ) {
    if (typeof key === 'string' && typeof iv === 'string') {
      this.constructorWithStringKeyAndIv(file, key, iv);
    } else if (key instanceof Uint8Array && iv instanceof Uint8Array) {
      this.constructorWithByteArrayKeyAndIv(file, key, iv);
    } else if (typeof file === 'string') {
      this.constructorWithFile(file);
    } else {
      this.constructorWithDefaultFile();
    }
  }

  private constructorWithStringKeyAndIv(file: string, key: string, iv: string) {
    this.constructorWithByteArrayKeyAndIv(
      file,
      this.convertHexStringToBytes(key),
      this.convertHexStringToBytes(iv)
    );
  }

  private constructorWithByteArrayKeyAndIv(
    file: string,
    key: Uint8Array,
    iv: Uint8Array
  ) {
    const props = PropertiesLoader.load(file);

    if (!props) {
      const message = `Failed to load '${file}'.`;
      Logger.getLogger(AuthletePropertiesConfiguration.name).severe(message);
      return;
    }

    this.mBaseUrl = props.getString(PROPERTY_KEY_BASE_URL, BASE_URL_DEFAULT);
    this.mServiceOwnerApiKey = props.getString(
      PROPERTY_KEY_SERVICE_OWNER_API_KEY
    );
    const encryptedServiceOwnerApiSecret = props.getString(
      PROPERTY_KEY_SERVICE_OWNER_API_SECRET_ENCRYPTED
    );
    if (encryptedServiceOwnerApiSecret) {
      this.mServiceOwnerApiSecret = createCipher(key, iv).decrypt(
        encryptedServiceOwnerApiSecret
      );
    } else {
      this.mServiceOwnerApiSecret = props.getString(
        PROPERTY_KEY_SERVICE_OWNER_API_SECRET
      );
    }
    this.mServiceApiKey = props.getString(PROPERTY_KEY_SERVICE_API_KEY);
    const encryptedServiceApiSecret = props.getString(
      PROPERTY_KEY_SERVICE_API_SECRET_ENCRYPTED
    );
    if (encryptedServiceApiSecret) {
      this.mServiceApiSecret = createCipher(key, iv).decrypt(
        encryptedServiceApiSecret
      );
    } else {
      this.mServiceApiSecret = props.getString(PROPERTY_KEY_SERVICE_API_SECRET);
    }
    this.mServiceAccessToken = props.getString(
      PROPERTY_KEY_SERVICE_ACCESS_TOKEN
    );
    this.mServiceOwnerAccessToken = props.getString(
      PROPERTY_KEY_SERVICE_OWNER_ACCESS_TOKEN
    );
    this.mDpopKey = props.getString(PROPERTY_KEY_DPOP_KEY);
    this.mClientCertificate = props.getString(PROPERTY_KEY_CLIENT_CERTIFICATE);
    this.mApiVersion = props.getString(PROPERTY_KEY_API_VERSION);
  }

  private constructorWithFile(file: string) {
    this.constructorWithByteArrayKeyAndIv(
      file,
      this.convertHexStringToBytes(AuthletePropertiesConfiguration.DEFAULT_KEY),
      this.convertHexStringToBytes(AuthletePropertiesConfiguration.DEFAULT_IV)
    );
  }

  private constructorWithDefaultFile() {
    this.constructorWithFile(AuthletePropertiesConfiguration.DEFAULT_FILE);
  }

  private static getFile(): string {
    const file = System.getProperty(
      AuthletePropertiesConfiguration.SYSTEM_PROPERTY_AUTHLETE_CONFIGURATION_FILE
    );

    if (file && file.length !== 0) {
      return file;
    }

    return AuthletePropertiesConfiguration.DEFAULT_FILE;
  }

  private static createCipher(key: Uint8Array, iv: Uint8Array): AESCipher {
    this.ensureNonNull('key', key);
    this.ensureNonNull('iv', iv);
    return new AESCipher().setKey(key, iv);
  }

  private static convertHexStringToBytes(value: string): Uint8Array {
    this.ensureNonNull('value', value);
    const len = value.length;
    const bytes = new Uint8Array((len + 1) / 2);

    for (let i = 0; i < len; ++i) {
      const c = value.charAt(i);
      const n = this.convertHexCharToInt(c);

      if (i % 2 === 0) {
        bytes[i / 2] = (n << 4) & 0xff;
      } else {
        bytes[i / 2] |= n & 0xff;
      }
    }

    return bytes;
  }

  private static convertHexCharToInt(c: string): number {
    if ('0' <= c && c <= '9') {
      return c.charCodeAt(0) - '0'.charCodeAt(0);
    } else if ('a' <= c && c <= 'f') {
      return c.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
    } else {
      return c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
    }
  }

  private static ensureNonNull(name: string, value: any): void {
    if (value === null) {
      throw new Error(`${name} is null.`);
    }
  }

  public getApiVersion(): string {
    return this.mApiVersion;
  }

  public getBaseUrl(): string {
    return this.mBaseUrl;
  }

  public getServiceOwnerApiKey(): string {
    return this.mServiceOwnerApiKey;
  }

  public getServiceOwnerApiSecret(): string {
    return this.mServiceOwnerApiSecret;
  }

  public getServiceOwnerAccessToken(): string {
    return this.mServiceOwnerAccessToken;
  }

  public getServiceApiKey(): string {
    return this.mServiceApiKey;
  }

  public getServiceApiSecret(): string {
    return this.mServiceApiSecret;
  }

  public getServiceAccessToken(): string {
    return this.mServiceAccessToken;
  }

  public getDpopKey(): string {
    return this.mDpopKey;
  }

  public getClientCertificate(): string {
    return this.mClientCertificate;
  }
}
