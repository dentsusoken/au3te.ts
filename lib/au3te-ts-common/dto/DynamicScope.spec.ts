import { describe, it, expect } from 'vitest';
import { DynamicScope } from './DynamicScope';

describe('DynamicScope', () => {
  it('should set and get name', () => {
    const scope = new DynamicScope();
    scope.setName('testName');
    expect(scope.getName()).toBe('testName');
  });

  it('should set and get value', () => {
    const scope = new DynamicScope();
    scope.setValue('testValue');
    expect(scope.getValue()).toBe('testValue');
  });

  it('should initialize with constructor parameters', () => {
    const scope = new DynamicScope('initialName', 'initialValue');
    expect(scope.getName()).toBe('initialName');
    expect(scope.getValue()).toBe('initialValue');
  });

  it('should allow updating name and value', () => {
    const scope = new DynamicScope('initialName', 'initialValue');
    scope.setName('updatedName');
    scope.setValue('updatedValue');
    expect(scope.getName()).toBe('updatedName');
    expect(scope.getValue()).toBe('updatedValue');
  });
});
