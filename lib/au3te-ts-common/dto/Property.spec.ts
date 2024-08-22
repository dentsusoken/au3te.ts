import { describe, it, expect } from 'vitest';
import { Property } from './Property';

describe('Property', () => {
  it('should initialize with default values', () => {
    const property = new Property();
    expect(property.getKey()).toBe('');
    expect(property.getValue()).toBe('');
    expect(property.isHidden()).toBe(false);
  });

  it('should initialize with provided key and value', () => {
    const property = new Property({ key: 'testKey', value: 'testValue' });
    expect(property.getKey()).toBe('testKey');
    expect(property.getValue()).toBe('testValue');
    expect(property.isHidden()).toBe(false);
  });

  it('should initialize with provided key, value, and hidden', () => {
    const property = new Property({
      key: 'testKey',
      value: 'testValue',
      hidden: true,
    });
    expect(property.getKey()).toBe('testKey');
    expect(property.getValue()).toBe('testValue');
    expect(property.isHidden()).toBe(true);
  });

  it('should set and get key', () => {
    const property = new Property();
    property.setKey('newKey');
    expect(property.getKey()).toBe('newKey');
  });

  it('should set and get value', () => {
    const property = new Property();
    property.setValue('newValue');
    expect(property.getValue()).toBe('newValue');
  });

  it('should set and get hidden', () => {
    const property = new Property();
    property.setHidden(true);
    expect(property.isHidden()).toBe(true);
  });

  it('should return correct string representation', () => {
    const property = new Property({
      key: 'testKey',
      value: 'testValue',
      hidden: true,
    });
    expect(property.toString()).toBe('testKey=testValue (hidden)');
  });
});
