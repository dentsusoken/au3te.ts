import { describe, it, expect } from 'vitest';
import { Utils } from './Utils';

describe('Utils', () => {
  it('should convert an object to JSON string', () => {
    const obj = { key: 'value' };
    const jsonString = Utils.toJson(obj);
    expect(jsonString).toBe(JSON.stringify(obj));
  });

  it('should parse a JSON string to an object', () => {
    const jsonString = '{"key":"value"}';
    const obj = Utils.fromJson(jsonString);
    expect(obj).toEqual(JSON.parse(jsonString));
  });

  it('should handle empty object to JSON string', () => {
    const obj = {};
    const jsonString = Utils.toJson(obj);
    expect(jsonString).toBe(JSON.stringify(obj));
  });

  it('should handle empty JSON string to object', () => {
    const jsonString = '{}';
    const obj = Utils.fromJson(jsonString);
    expect(obj).toEqual(JSON.parse(jsonString));
  });

  it('should throw error for invalid JSON string', () => {
    const invalidJsonString = '{key:value}';
    expect(() => Utils.fromJson(invalidJsonString)).toThrow();
  });
});
