import dotenv from 'dotenv';
import path from 'path';
import { beforeAll, describe, expect, it } from 'vitest';
import { AuthletePropertiesConfiguration } from './AuthletePropertiesConfiguration';

describe('AuthletePropertiesConfiguration', () => {
  let properties: AuthletePropertiesConfiguration;
  beforeAll(() => {
    // const file = path.resolve(process.cwd(), 'asset/existing.properties');
    dotenv.config({ path: path.resolve('.env.test') });
    properties = new AuthletePropertiesConfiguration();
  });
  describe('constructor', () => {
    it('should load properties from default file', () => {
      const properties = new AuthletePropertiesConfiguration();
      expect(properties).not.toBeUndefined();
      expect(Object.keys(properties).length > 0).toBe(true);
    });
    it('should load properties from sepecifc file', () => {
      const file = path.resolve('asset/existing.properties');
      const properties = new AuthletePropertiesConfiguration(file);
      expect(properties).not.toBeUndefined();
      expect(Object.keys(properties).length > 0).toBe(true);
    });
  });
  describe('getApiVersion', () => {
    it('should return api_version', () => {
      const apiVersion = properties.getApiVersion();
      expect(apiVersion).not.toBeUndefined();
    });
  });
  describe('getBaseUrl', () => {
    it('should return base_url', () => {
      const baseUrl = properties.getBaseUrl();
      expect(baseUrl).not.toBeUndefined();
    });
  });
  describe('getServiceApiKey', () => {
    it('should return service.api_key', () => {
      const serviceApiKey = properties.getServiceApiKey();
      expect(serviceApiKey).not.toBeUndefined();
    });
  });
  describe('getServiceAccessToken', () => {
    it('should return service.access_token', () => {
      const ServiceAccessToken = properties.getServiceAccessToken();
      expect(ServiceAccessToken).not.toBeUndefined();
    });
  });
});
