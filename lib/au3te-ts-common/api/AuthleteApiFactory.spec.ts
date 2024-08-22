import dotenv from 'dotenv';
import path from 'node:path';
import { beforeAll, describe, expect, it, vi, vitest } from 'vitest';
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
    it('should return undefined', async () => {
      properties.getApiVersion = vitest.fn().mockReturnValue('V2');

      const result = await AuthleteApiFactory.create(properties);

      expect(result).toBeUndefined();
    });
    it('should return AuthleteApiImplV3 instance', async () => {
      properties.getApiVersion = vitest.fn().mockReturnValue('V3');

      const instance = await AuthleteApiFactory.create(properties);

      expect(instance).toBeInstanceOf(AuthleteApiImplV3);
    });
  });

  describe('createImpl', () => {
    it('should return AuthleteApiImplV3 instance', () => {
      // private method
    });
  });
  describe('createInstance', () => {
    it('should return AuthleteApiImplV3 instance', async () => {
      const result = await AuthleteApiFactory.createInstance(properties);
      expect(result).toBeInstanceOf(AuthleteApiImplV3);
    });
    it('should throw an error if configuration is undefined', async () => {
      await expect(
        AuthleteApiFactory.createInstance(undefined!)
      ).rejects.toThrow('configuration is undefined.');
    });
  });
  describe('getDefaultApi', () => {
    it('should return the default API instance', async () => {
      const result = await AuthleteApiFactory.getDefaultApi();
      expect(result).toBeInstanceOf(AuthleteApiImplV3);
    });
    it('should throw an error if failed to create an instance of AuthleteApi', async () => {
      vi.spyOn(AuthleteApiFactory, 'create').mockResolvedValue(undefined);
      (AuthleteApiFactory as any).sDefaultApi = undefined;
      expect(
        async () => await AuthleteApiFactory.getDefaultApi()
      ).rejects.toThrow('Failed to create an instance of AuthleteApi.');
    });
  });
});
