import dotenv from 'dotenv';
import path from 'path';
import { beforeAll, describe, expect, it } from 'vitest';
import { AuthletePropertiesConfiguration } from '../../au3te-ts-common/conf/AuthletePropertiesConfiguration';
import { PushedAuthReqRequest } from '../../au3te-ts-common/dto/PushedAuthReqRequest';
import { PushedAuthReqResponse } from '../../au3te-ts-common/dto/PushedAuthReqResponse';
import { TokenRequest } from '../../au3te-ts-common/dto/TokenRequest';
import { TokenResponse } from '../../au3te-ts-common/dto/TokenResponse';
import { URLCoder } from '../../au3te-ts-common/web/URLCoder';
import { AuthleteApiImplV3 } from './AuthleteApiImplV3';

dotenv.config({ path: path.resolve('.env.test') });

const params = {
  scope: 'org.iso.18013.5.1.mDL openid',
  code_challenge: '-wWUU3X62rCR7Z-zsCrfT7wPxLrticYIzI6mrXSqgzs',
  state: '7342EFBD-3D9F-4895-8445-18F365B8C66C',
  redirect_uri: process.env.REDIRECT_URI || '',
  code_challenge_method: 'S256',
  response_type: 'code',
  client_id: process.env.CLIENT_ID || '',
};

describe('AuthleteApiImplV3', () => {
  let properties: AuthletePropertiesConfiguration;

  beforeAll(() => {
    properties = new AuthletePropertiesConfiguration();
  });

  describe('constructor', () => {
    it('should create an instance', () => {
      const impl = new AuthleteApiImplV3(properties);
      expect(impl).not.toBeNull();
    });

    it('should throw an error if configuration is not set to V3', () => {
      process.env['API_VERSION'] = 'V2';
      const invalidConfig = new AuthletePropertiesConfiguration();
      expect(() => new AuthleteApiImplV3(invalidConfig)).toThrowError(
        'Configuration must be set to V3 for this implementation.'
      );
    });
  });

  describe('pushAuthorizationRequest', () => {
    it('should return a PushedAuthReqResponse instance', async () => {
      const impl = new AuthleteApiImplV3(properties);
      const request = new PushedAuthReqRequest();
      request.setParameters(URLCoder.formUrlEncode(params)!);
      const response = await impl.pushAuthorizationRequest(request);
      expect(response instanceof PushedAuthReqResponse).toBe(true);
    });
  });
  describe('token', () => {
    it('should return a TokenRequest instance', async () => {
      const impl = new AuthleteApiImplV3(properties);
      const request = new TokenRequest();
      request.setParameters(URLCoder.formUrlEncode(params)!);
      const response = await impl.token(request);
      expect(response instanceof TokenResponse).toBe(true);
    });
  });
});
