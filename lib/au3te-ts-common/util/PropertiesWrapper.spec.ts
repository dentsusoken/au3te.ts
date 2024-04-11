import { describe, expect, it } from 'vitest';
import PropertiesWrapper from './PropertiesWrapper';

describe('PropertiesWrapper', () => {
  describe('constructor', () => {
    it('should throw an error when properties is empty', () => {
      expect(() => new PropertiesWrapper({})).toThrowError(
        'properties must not be empty.'
      );
    });
  });

  describe('getString', () => {
    it('should return the value of the key', () => {
      const properties = new PropertiesWrapper({ key: 'value' });
      expect(properties.getString('key')).toBe('value');
    });

    it('should return the default value when the key is not found', () => {
      const properties = new PropertiesWrapper({ x: 'value' });
      expect(properties.getString('key', 'default')).toBe('default');
    });
  });
});
