import { describe, it, expect } from 'vitest';
import { TypedProperties } from './TypedProperties';

class TestTypedProperties extends TypedProperties {
  private properties: { [key: string]: string };

  constructor(properties: { [key: string]: string }) {
    super();
    this.properties = properties;
  }

  public getString(key: string, defaultValue: string = ''): string {
    return this.properties[key] || defaultValue;
  }
}

describe('TypedProperties', () => {
  it('should return the value for an existing key', () => {
    const properties = new TestTypedProperties({ key1: 'value1' });
    expect(properties.getString('key1')).toBe('value1');
  });

  it('should return the default value for a non-existing key', () => {
    const properties = new TestTypedProperties({});
    expect(properties.getString('key2', 'defaultValue')).toBe('defaultValue');
  });

  it('should return an empty string for a non-existing key with no default value', () => {
    const properties = new TestTypedProperties({});
    expect(properties.getString('key3')).toBe('');
  });
});
