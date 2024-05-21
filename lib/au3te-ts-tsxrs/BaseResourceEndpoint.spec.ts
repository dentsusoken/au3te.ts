import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthleteApi } from '../au3te-ts-common/api/AuthleteApi';
import { IntrospectionRequest } from '../au3te-ts-common/dto/IntrospectionRequest';
import {
  Action,
  IntrospectionResponse,
} from '../au3te-ts-common/dto/IntrospectionResponse';
import { BaseResourceEndpoint } from '../au3te-ts-tsxrs/BaseResourceEndpoint';

describe('BaseResourceEndpoint', () => {
  let baseResourceEndpoint: BaseResourceEndpoint;
  let authleteApi: AuthleteApi;
  let introspectionRequest: IntrospectionRequest;

  beforeEach(() => {
    baseResourceEndpoint = new BaseResourceEndpoint();
    // @ts-expect-error Mocking
    authleteApi = {
      introspection: vi
        .fn()
        .mockResolvedValue(
          new IntrospectionResponse()
            .setAction(Action.OK)
            .setResponseContent('')
        ),
    };
    introspectionRequest = new IntrospectionRequest();
  });

  describe('extractAccessToken', () => {
    it('should extract access token from authorization header', () => {
      const authorization = 'Bearer abc123';
      const accessTokenInRequestParameters = '';

      const result = baseResourceEndpoint.extractAccessToken(
        authorization,
        accessTokenInRequestParameters
      );

      expect(result).toBe('abc123');
    });

    it('should extract access token from request parameters', () => {
      const authorization = '';
      const accessTokenInRequestParameters = 'def456';

      const result = baseResourceEndpoint.extractAccessToken(
        authorization,
        accessTokenInRequestParameters
      );

      expect(result).toBe('def456');
    });
  });

  describe('validateAccessToken', () => {
    it('should validate access token using Authlete API', () => {
      const api = authleteApi;
      const request = introspectionRequest;

      const result = baseResourceEndpoint.validateAccessToken(api, request);

      expect(result).toBeTruthy();
    });
  });
});
