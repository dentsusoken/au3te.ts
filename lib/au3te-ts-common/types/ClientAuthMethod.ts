export type ClientAuthMethodProperty = [number, string, string];

const prefix = '0x';

const ClientAuthMethod: Record<string, ClientAuthMethodProperty> = {
  NONE: [0, 'none', prefix + Number(0).toString(16)],
  CLIENT_SECRET_BASIC: [
    1,
    'client_secret_basic',
    prefix + Number(1).toString(16),
  ],
  CLIENT_SECRET_POST: [
    2,
    'client_secret_post',
    prefix + Number(1).toString(16),
  ],
  CLIENT_SECRET_JWT: [3, 'client_secret_jwt', prefix + Number(2).toString(16)],
  PRIVATE_KEY_JWT: [4, 'private_key_jwt', prefix + Number(2).toString(16)],
  TLS_CLIENT_AUTH: [5, 'tls_client_auth', prefix + Number(4).toString(16)],
  SELF_SIGNED_TLS_CLIENT_AUTH: [
    6,
    'self_signed_tls_client_auth',
    prefix + Number(4).toString(16),
  ],
  ATTEST_JWT_CLIENT_AUTH: [
    7,
    'attest_jwt_client_auth',
    prefix + Number(2).toString(16),
  ],
} as const;

export default ClientAuthMethod;
