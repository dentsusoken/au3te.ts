import path from 'path';
import { describe, expect, it } from 'vitest';
import PropertiesLoader from './PropertiesLoader';

describe('PropertiesLoader', () => {
  describe('load', () => {
    it('should return null when the file is not found', () => {
      expect(PropertiesLoader.load('notfound.properties')).toBeNull();
    });
    it('should load properties when the file exists', () => {
      const file = path.resolve(process.cwd(), 'asset/existing.properties');
      const properties = PropertiesLoader.load(file);
      expect(properties).not.toBeNull();
      expect(properties!.getString('base_url')).toBe('value');
    });
  });
});
