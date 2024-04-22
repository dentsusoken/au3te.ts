import { beforeAll, describe, expect, it } from 'vitest';
import AuthletePropertiesConfiguration from '../conf/AuthletePropertiesConfiguration';
import AuthleteApiFactory from './AuthleteApiFactory';

const className = '../../au3te-ts-tsxrs/api/AuthleteApiImplV3';

describe('AuthleteApiFactory', () => {
  let properties: AuthletePropertiesConfiguration;

  beforeAll(() => {
    // const file = path.resolve(process.cwd(), 'asset/existing.properties');
    properties = new AuthletePropertiesConfiguration();
  });
  describe('create', () => {
    it('should return an instance', async () => {
      const api = await AuthleteApiFactory.create(properties);
      expect(api).not.toBeNull();
    });
  });
  describe('createInstance', () => {
    it('should return an instance', async () => {
      const api = await AuthleteApiFactory.createInstance(
        properties,
        className
      );
      expect(api).not.toBeNull();
    });
    it('should throw an error when configuration is null', async () => {
      await expect(
        AuthleteApiFactory.createInstance(null!, 'className')
      ).rejects.toThrowError('configuration is null.');
    });

    it('should throw an error when className is null', async () => {
      await expect(
        AuthleteApiFactory.createInstance(properties, null!)
      ).rejects.toThrowError('className is null.');
    });

    it('should throw an error when class is not found', async () => {
      await expect(
        AuthleteApiFactory.createInstance(properties, './UndefinedClass')
      ).rejects.toThrowError('./UndefinedClass is not found.');
    });
    // TODO require a class construct with AuthleteConfiguration and not implement AuthleteApi
    // it('should throw an error when class does not implement AuthleteApi interface', async () => {
    //   await expect(
    //     AuthleteApiFactory.createInstance(properties, './InvalidClass')
    //   ).rejects.toThrowError(
    //     './InvalidClass does not implement AuthleteApi interface.'
    //   );
    // });

    it('should throw an error when failed to create an instance of class', async () => {
      await expect(
        AuthleteApiFactory.createInstance(properties, './AuthleteApiException')
      ).rejects.toThrowError(
        'Failed to create an instance of ./AuthleteApiException.'
      );
    });
  });
  describe('getDefaultApi', () => {
    it('should return an instance', async () => {
      const api = await AuthleteApiFactory.getDefaultApi();
      expect(api).not.toBeNull();
    });
  });
});
