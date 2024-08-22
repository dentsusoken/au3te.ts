import { describe, it, expect } from 'vitest';
import { Pair } from './Pair';

describe('Pair', () => {
  it('should set and get key', () => {
    const pair = new Pair();
    pair.setKey('testKey');
    expect(pair.getKey()).toBe('testKey');
  });

  it('should set and get value', () => {
    const pair = new Pair();
    pair.setValue('testValue');
    expect(pair.getValue()).toBe('testValue');
  });

  it('should initialize with constructor parameters', () => {
    const pair = new Pair('initialKey', 'initialValue');
    expect(pair.getKey()).toBe('initialKey');
    expect(pair.getValue()).toBe('initialValue');
  });

  it('should allow updating key and value', () => {
    const pair = new Pair('initialKey', 'initialValue');
    pair.setKey('updatedKey');
    pair.setValue('updatedValue');
    expect(pair.getKey()).toBe('updatedKey');
    expect(pair.getValue()).toBe('updatedValue');
  });
});
