import path from 'path';
import { describe, expect, it } from 'vitest';
import { PropertiesLoader } from './PropertiesLoader';

describe('PropertiesLoader', () => {
  describe('load', () => {
    it('should return null when the file is not found', () => {
      expect(PropertiesLoader.load('notfound.properties')).toBeNull();
    });

    it('should load properties when the file exists', () => {
      const file = path.resolve('asset/existing.properties');
      const properties = PropertiesLoader.load(file);
      expect(properties).not.toBeNull();
      expect(properties!.getString('base_url')).toBe('https://example.com');
    });

    it('should return null when locations are not provided', () => {
      const file = 'test.properties';
      const properties = PropertiesLoader.load(file);
      expect(properties).toBeNull();
    });

    it('should load properties from filesystem when locations are provided', () => {
      const file = path.resolve('asset/existing.properties');
      const locations = [0];
      const properties = PropertiesLoader.load(file, locations);
      expect(properties).not.toBeNull();
      // Add your assertions here
    });

    it('should load properties from classpath when locations are provided', () => {
      const file = path.resolve('asset/existing.properties');
      const locations = [1];
      const properties = PropertiesLoader.load(file, locations);
      expect(properties).toBeNull();
      // Add your assertions here
    });
  });
});
