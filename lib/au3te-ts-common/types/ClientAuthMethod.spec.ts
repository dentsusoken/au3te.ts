import { describe, expect, it } from 'vitest';
import { ClientAuthMethod } from './ClientAuthMethod';

describe('ClientAuthMethod', () => {
  it('should return the correct ClientAuthMethod by value', () => {
    expect(ClientAuthMethod.getByValue(0)).toBe(ClientAuthMethod.NONE);
    expect(ClientAuthMethod.getByValue(1)).toBe(
      ClientAuthMethod.CLIENT_SECRET_BASIC
    );
    expect(ClientAuthMethod.getByValue(2)).toBe(
      ClientAuthMethod.CLIENT_SECRET_POST
    );
    expect(ClientAuthMethod.getByValue(3)).toBe(
      ClientAuthMethod.CLIENT_SECRET_JWT
    );
    expect(ClientAuthMethod.getByValue(4)).toBe(
      ClientAuthMethod.PRIVATE_KEY_JWT
    );
    expect(ClientAuthMethod.getByValue(5)).toBe(
      ClientAuthMethod.TLS_CLIENT_AUTH
    );
    expect(ClientAuthMethod.getByValue(6)).toBe(
      ClientAuthMethod.SELF_SIGNED_TLS_CLIENT_AUTH
    );
    expect(ClientAuthMethod.getByValue(7)).toBe(
      ClientAuthMethod.ATTEST_JWT_CLIENT_AUTH
    );
  });

  it('should return the correct ClientAuthMethod by name', () => {
    expect(ClientAuthMethod.parse('none')).toBe(ClientAuthMethod.NONE);
    expect(ClientAuthMethod.parse('client_secret_basic')).toBe(
      ClientAuthMethod.CLIENT_SECRET_BASIC
    );
    expect(ClientAuthMethod.parse('client_secret_post')).toBe(
      ClientAuthMethod.CLIENT_SECRET_POST
    );
    expect(ClientAuthMethod.parse('client_secret_jwt')).toBe(
      ClientAuthMethod.CLIENT_SECRET_JWT
    );
    expect(ClientAuthMethod.parse('private_key_jwt')).toBe(
      ClientAuthMethod.PRIVATE_KEY_JWT
    );
    expect(ClientAuthMethod.parse('tls_client_auth')).toBe(
      ClientAuthMethod.TLS_CLIENT_AUTH
    );
    expect(ClientAuthMethod.parse('self_signed_tls_client_auth')).toBe(
      ClientAuthMethod.SELF_SIGNED_TLS_CLIENT_AUTH
    );
    expect(ClientAuthMethod.parse('attest_jwt_client_auth')).toBe(
      ClientAuthMethod.ATTEST_JWT_CLIENT_AUTH
    );
    expect(ClientAuthMethod.parse('invalid_method')).toBeUndefined();
  });

  it('should return the correct value', () => {
    expect(ClientAuthMethod.NONE.getValue()).toBe(0);
    expect(ClientAuthMethod.CLIENT_SECRET_BASIC.getValue()).toBe(1);
    expect(ClientAuthMethod.CLIENT_SECRET_POST.getValue()).toBe(2);
    expect(ClientAuthMethod.CLIENT_SECRET_JWT.getValue()).toBe(3);
    expect(ClientAuthMethod.PRIVATE_KEY_JWT.getValue()).toBe(4);
    expect(ClientAuthMethod.TLS_CLIENT_AUTH.getValue()).toBe(5);
    expect(ClientAuthMethod.SELF_SIGNED_TLS_CLIENT_AUTH.getValue()).toBe(6);
    expect(ClientAuthMethod.ATTEST_JWT_CLIENT_AUTH.getValue()).toBe(7);
  });

  it('should return the correct name', () => {
    expect(ClientAuthMethod.NONE.toString()).toBe('none');
    expect(ClientAuthMethod.CLIENT_SECRET_BASIC.toString()).toBe(
      'client_secret_basic'
    );
    expect(ClientAuthMethod.CLIENT_SECRET_POST.toString()).toBe(
      'client_secret_post'
    );
    expect(ClientAuthMethod.CLIENT_SECRET_JWT.toString()).toBe(
      'client_secret_jwt'
    );
    expect(ClientAuthMethod.PRIVATE_KEY_JWT.toString()).toBe('private_key_jwt');
    expect(ClientAuthMethod.TLS_CLIENT_AUTH.toString()).toBe('tls_client_auth');
    expect(ClientAuthMethod.SELF_SIGNED_TLS_CLIENT_AUTH.toString()).toBe(
      'self_signed_tls_client_auth'
    );
    expect(ClientAuthMethod.ATTEST_JWT_CLIENT_AUTH.toString()).toBe(
      'attest_jwt_client_auth'
    );
  });

  it('should return the correct isSecretBased value', () => {
    expect(ClientAuthMethod.NONE.isSecretBased()).toBe(false);
    expect(ClientAuthMethod.CLIENT_SECRET_BASIC.isSecretBased()).toBe(true);
    expect(ClientAuthMethod.CLIENT_SECRET_POST.isSecretBased()).toBe(true);
    expect(ClientAuthMethod.CLIENT_SECRET_JWT.isSecretBased()).toBe(false);
    expect(ClientAuthMethod.PRIVATE_KEY_JWT.isSecretBased()).toBe(false);
    expect(ClientAuthMethod.TLS_CLIENT_AUTH.isSecretBased()).toBe(false);
    expect(ClientAuthMethod.SELF_SIGNED_TLS_CLIENT_AUTH.isSecretBased()).toBe(
      false
    );
    expect(ClientAuthMethod.ATTEST_JWT_CLIENT_AUTH.isSecretBased()).toBe(false);
  });

  it('should return the correct isJwtBased value', () => {
    expect(ClientAuthMethod.NONE.isJwtBased()).toBe(false);
    expect(ClientAuthMethod.CLIENT_SECRET_BASIC.isJwtBased()).toBe(false);
    expect(ClientAuthMethod.CLIENT_SECRET_POST.isJwtBased()).toBe(false);
    expect(ClientAuthMethod.CLIENT_SECRET_JWT.isJwtBased()).toBe(true);
    expect(ClientAuthMethod.PRIVATE_KEY_JWT.isJwtBased()).toBe(true);
    expect(ClientAuthMethod.TLS_CLIENT_AUTH.isJwtBased()).toBe(false);
    expect(ClientAuthMethod.SELF_SIGNED_TLS_CLIENT_AUTH.isJwtBased()).toBe(
      false
    );
    expect(ClientAuthMethod.ATTEST_JWT_CLIENT_AUTH.isJwtBased()).toBe(true);
  });

  it('should return the correct isCertificateBased value', () => {
    expect(ClientAuthMethod.NONE.isCertificateBased()).toBe(false);
    expect(ClientAuthMethod.CLIENT_SECRET_BASIC.isCertificateBased()).toBe(
      false
    );
    expect(ClientAuthMethod.CLIENT_SECRET_POST.isCertificateBased()).toBe(
      false
    );
    expect(ClientAuthMethod.CLIENT_SECRET_JWT.isCertificateBased()).toBe(false);
    expect(ClientAuthMethod.PRIVATE_KEY_JWT.isCertificateBased()).toBe(false);
    expect(ClientAuthMethod.TLS_CLIENT_AUTH.isCertificateBased()).toBe(true);
    expect(
      ClientAuthMethod.SELF_SIGNED_TLS_CLIENT_AUTH.isCertificateBased()
    ).toBe(true);
    expect(ClientAuthMethod.ATTEST_JWT_CLIENT_AUTH.isCertificateBased()).toBe(
      false
    );
  });
});
