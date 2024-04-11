import path from 'path';
import { beforeAll, describe, expect, it } from 'vitest';
import AuthletePropertiesConfiguration from '../../au3te-ts-common/conf/AuthletePropertiesConfiguration';
import PushedAuthReqRequest from '../../au3te-ts-common/dto/PushedAuthReqRequest';
import PushedAuthReqResponse from '../../au3te-ts-common/dto/PushedAuthReqResponse';
import AuthleteApiImplV3 from './AuthleteApiImplV3';

describe('AuthleteApiJaxrsImpl', () => {
  let properties: AuthletePropertiesConfiguration;

  beforeAll(() => {
    const file = path.resolve(process.cwd(), 'asset/existing.properties');
    properties = new AuthletePropertiesConfiguration(file);
  });

  describe('constructor', () => {
    it('should create an instance', () => {
      const impl = new AuthleteApiImplV3(properties);
      expect(impl).not.toBeNull();
    });
  });

  describe('pushAuthorizationRequest', () => {
    it('should return PushedAuthReqResponse instance', () => {
      const impl = new AuthleteApiImplV3(properties);
      const request = new PushedAuthReqRequest();
      const response = impl.pushAuthorizationRequest(request);
      expect(response instanceof PushedAuthReqResponse).toBe(true);
    });
  });
  // TODO delete this test
  // describe('require', () => {
  //   it('should return PushedAuthReqResponse instance', async () => {
  //     const aa = await import('../../../au3te-ts-tsxrs/api/AuthleteApiImplV3');
  //     console.log(new aa.default(properties));

  //     // expect(response instanceof PushedAuthReqResponse).toBe(true);
  //   });
  // });
});
