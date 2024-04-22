import { beforeAll, describe, expect, it } from 'vitest';
import AuthletePropertiesConfiguration from './AuthletePropertiesConfiguration';

describe('AuthletePropertiesConfiguration', () => {
  let properties: AuthletePropertiesConfiguration;
  beforeAll(() => {
    // const file = path.resolve(process.cwd(), 'asset/existing.properties');
    properties = new AuthletePropertiesConfiguration();
  });
  describe('constructor', () => {
    it('should load properties from default file', () => {
      const properties = new AuthletePropertiesConfiguration();
      expect(properties).not.toBeNull();
      expect(Object.keys(properties).length > 0).toBe(true);
    });
    it('should load properties from sepecifc file', () => {
      // const file = path.resolve(process.cwd(), 'asset/existing.properties');
      const properties = new AuthletePropertiesConfiguration();
      expect(properties).not.toBeNull();
      expect(Object.keys(properties).length > 0).toBe(true);
    });
  });
  describe('getApiVersion', () => {
    it('should return api_version', () => {
      const apiVersion = properties.getApiVersion();
      expect(apiVersion).not.toBeNull();
    });
  });
  describe('getBaseUrl', () => {
    it('should return base_url', () => {
      const baseUrl = properties.getBaseUrl();
      expect(baseUrl).not.toBeNull();
    });
  });
  describe('getServiceApiKey', () => {
    it('should return service.api_key', () => {
      const serviceApiKey = properties.getServiceApiKey();
      expect(serviceApiKey).not.toBeNull();
    });
  });
  describe('getServiceAccessToken', () => {
    it('should return service.access_token', () => {
      const ServiceAccessToken = properties.getServiceAccessToken();
      expect(ServiceAccessToken).not.toBeNull();
    });
  });
});
