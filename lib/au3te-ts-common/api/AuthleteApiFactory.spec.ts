import dotenv from 'dotenv';
import path from 'node:path';
import { beforeAll, describe, expect, it, vitest } from 'vitest';
import { AuthleteApiImplV3 } from '../../au3te-ts-tsxrs/api/AuthleteApiImplV3';
import { AuthletePropertiesConfiguration } from '../conf/AuthletePropertiesConfiguration';
import { AuthleteApiFactory } from './AuthleteApiFactory';

dotenv.config({ path: path.resolve('.env.test') });

describe('AuthleteApiFactory', () => {
  let properties: AuthletePropertiesConfiguration;
  beforeAll(() => {
    properties = new AuthletePropertiesConfiguration();
  });

  describe('create', () => {
    it('should return null for non-V3 version', async () => {
      properties.getApiVersion = vitest.fn().mockReturnValue('V2');

      const result = await AuthleteApiFactory.create(properties);

      expect(result).toBeUndefined();
    });

    it('should call createImpl for V3 version', async () => {
      properties.getApiVersion = vitest.fn().mockReturnValue('V3');

      const createImplSpy = vitest.spyOn(AuthleteApiFactory, 'create');

      await AuthleteApiFactory.create(properties);

      expect(createImplSpy).toHaveBeenCalledWith(properties);
    });
  });

  describe('createImpl', () => {
    it("createImpl is private, so we can't test it directly", () => {});
  });
  describe('createInstance', () => {
    it('should return an instance of AuthleteApiImplV3', async () => {
      const result = await AuthleteApiFactory.createInstance(properties);
      expect(result).toBeInstanceOf(AuthleteApiImplV3);
    });
  });
  describe('getDefaultApi', () => {
    it('should return the default API instance', async () => {
      const result = await AuthleteApiFactory.getDefaultApi();
      expect(result).toBeInstanceOf(AuthleteApiImplV3);
    });
  });
});
