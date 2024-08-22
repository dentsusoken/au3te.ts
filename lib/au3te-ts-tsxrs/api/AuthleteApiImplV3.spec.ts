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
import { AuthorizationRequest } from '../../au3te-ts-common/dto/AuthorizationRequest';
import { AuthorizationResponse } from '../../au3te-ts-common/dto/AuthorizationResponse';
import { AuthorizationFailRequest } from '../../au3te-ts-common/dto/AuthorizationFailRequest';
import { AuthorizationFailResponse } from '../../au3te-ts-common/dto/AuthorizationFailResponse';
import { AuthorizationIssueRequest } from '../../au3te-ts-common/dto/AuthorizationIssueRequest';
import { AuthorizationIssueResponse } from '../../au3te-ts-common/dto/AuthorizationIssueResponse';
import { IntrospectionRequest } from '../../au3te-ts-common/dto/IntrospectionRequest';
import { IntrospectionResponse } from '../../au3te-ts-common/dto/IntrospectionResponse';
import { CredentialSingleParseRequest } from '../../au3te-ts-common/dto/CredentialSingleParseRequest';
import { CredentialSingleParseResponse } from '../../au3te-ts-common/dto/CredentialSingleParseResponse';
import { CredentialSingleIssueRequest } from '../../au3te-ts-common/dto/CredentialSingleIssueRequest';
import { CredentialSingleIssueResponse } from '../../au3te-ts-common/dto/CredentialSingleIssueResponse';
import { CredentialIssuerMetadataRequest } from '../../au3te-ts-common/dto/CredentialIssuerMetadataRequest';
import { CredentialIssuerMetadataResponse } from '../../au3te-ts-common/dto/CredentialIssuerMetadataResponse';

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
      expect(impl).not.toBeUndefined();
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
  describe('authorization', () => {
    it('should return a AuthorizationRequest instance', async () => {
      const impl = new AuthleteApiImplV3(properties);
      const request = new AuthorizationRequest();
      request.setParameters(URLCoder.formUrlEncode(params)!);
      const response = await impl.authorization(request);
      expect(response).toBeInstanceOf(AuthorizationResponse);
    });
  });
  describe('authorizationFail', () => {
    it('should return a AuthorizationFailResponse instance', async () => {
      const impl = new AuthleteApiImplV3(properties);
      const request = new AuthorizationFailRequest();
      request.setReason(AuthorizationFailRequest.Reason.UNKNOWN);
      const response = await impl.authorizationFail(request);
      expect(response).toBeInstanceOf(AuthorizationFailResponse);
    });
  });
  describe('authorizationIssue', () => {
    it('should return a AuthorizationIssueResponse instance', async () => {
      const impl = new AuthleteApiImplV3(properties);
      const request = new AuthorizationIssueRequest();
      const response = await impl.authorizationIssue(request);
      expect(response).toBeInstanceOf(AuthorizationIssueResponse);
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
  describe('introspection', () => {
    it('should return a IntrospectionResponse instance', async () => {
      const impl = new AuthleteApiImplV3(properties);
      const request = new IntrospectionRequest();
      const response = await impl.introspection(request);
      expect(response instanceof IntrospectionResponse).toBe(true);
    });
  });
  describe('credentialSingleParse', () => {
    it('should return a CredentialSingleParseResponse instance', async () => {
      const impl = new AuthleteApiImplV3(properties);
      const reqest = new CredentialSingleParseRequest();
      const response = await impl.credentialSingleParse(reqest);
      expect(response).toBeInstanceOf(CredentialSingleParseResponse);
    });
  });
  describe('credentialSingleIssue', () => {
    it('should return a CredentialSingleIssueResponse instance', async () => {
      const impl = new AuthleteApiImplV3(properties);
      const reqest = new CredentialSingleIssueRequest();
      const response = await impl.credentialSingleIssue(reqest);
      expect(response).toBeInstanceOf(CredentialSingleIssueResponse);
    });
  });
  describe('getServiceConfiguration', () => {
    it('should return a string', async () => {
      const impl = new AuthleteApiImplV3(properties);
      const response = await impl.getServiceConfiguration(undefined, true);
      expect(response).toBeTypeOf('string');
    });
  });
  describe('credentialIssuerMetadta', () => {
    it('should return a CredentialIssuerMetadataResponse instance', async () => {
      const impl = new AuthleteApiImplV3(properties);
      const request = new CredentialIssuerMetadataRequest();
      request.setPretty(true);
      const response = await impl.credentialIssuerMetadata(request);
      expect(response).toBeInstanceOf(CredentialIssuerMetadataResponse);
    });
  });
});

// TODO Add test for ApiCaller
