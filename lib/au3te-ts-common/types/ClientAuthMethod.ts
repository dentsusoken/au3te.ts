const FLAG_SECRET_BASED = 1;
const FLAG_JWT_BASED = 2;
const FLAG_CERTIFICATE_BASED = 4;

export class ClientAuthMethod {
  private static readonly _values: ClientAuthMethod[] = [];

  static readonly NONE = new ClientAuthMethod(0, 'none', 0);
  static readonly CLIENT_SECRET_BASIC = new ClientAuthMethod(
    1,
    'client_secret_basic',
    1
  );
  static readonly CLIENT_SECRET_POST = new ClientAuthMethod(
    2,
    'client_secret_post',
    1
  );
  static readonly CLIENT_SECRET_JWT = new ClientAuthMethod(
    3,
    'client_secret_jwt',
    2
  );
  static readonly PRIVATE_KEY_JWT = new ClientAuthMethod(
    4,
    'private_key_jwt',
    2
  );
  static readonly TLS_CLIENT_AUTH = new ClientAuthMethod(
    5,
    'tls_client_auth',
    4
  );
  static readonly SELF_SIGNED_TLS_CLIENT_AUTH = new ClientAuthMethod(
    6,
    'self_signed_tls_client_auth',
    4
  );
  static readonly ATTEST_JWT_CLIENT_AUTH = new ClientAuthMethod(
    7,
    'attest_jwt_client_auth',
    2
  );

  static getByValue(value: number): ClientAuthMethod | undefined {
    return this._values.find((v) => v.value === value);
  }

  static parse(name: string): ClientAuthMethod | undefined {
    return this._values.find((v) => v.name === name);
  }

  private constructor(
    readonly value: number,
    readonly name: string,
    readonly flags: number
  ) {
    ClientAuthMethod._values.push(this);
  }

  getValue(): number {
    return this.value;
  }

  toString(): string {
    return this.name;
  }

  isSecretBased(): boolean {
    return (this.flags & FLAG_SECRET_BASED) !== 0;
  }

  isJwtBased(): boolean {
    return (this.flags & FLAG_JWT_BASED) !== 0;
  }

  isCertificateBased(): boolean {
    return (this.flags & FLAG_CERTIFICATE_BASED) !== 0;
  }
}
