import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthleteApi } from '../au3te-ts-common/api/AuthleteApi';
import { IntrospectionRequest } from '../au3te-ts-common/dto/IntrospectionRequest';
import {
  Action,
  IntrospectionResponse,
} from '../au3te-ts-common/dto/IntrospectionResponse';
import { AccessTokenValidator } from '../au3te-ts-tsxrs/AccessTokenValidator';

describe('AccessTokenValidator', () => {
  let accessTokenValidator: AccessTokenValidator;
  let authleteApi: AuthleteApi;

  beforeEach(() => {
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
    accessTokenValidator = new AccessTokenValidator(authleteApi);
  });

  describe('validate', () => {
    it('should validate the introspection request', async () => {
      const request: IntrospectionRequest = new IntrospectionRequest().setToken(
        'abc'
      );
      const result = await accessTokenValidator.validate(request);
      expect(result).toBeInstanceOf(IntrospectionResponse);
    });
  });
});
