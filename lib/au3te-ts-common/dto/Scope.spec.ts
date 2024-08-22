import { describe, it, expect } from 'vitest';
import { Scope } from './Scope';

describe('Scope', () => {
  it('should set and get name', () => {
    const scope = new Scope();
    scope.setName('testName');
    expect(scope.getName()).toBe('testName');
  });

  it('should set and get description', () => {
    const scope = new Scope();
    scope.setDescription('testDescription');
    expect(scope.getDescription()).toBe('testDescription');
  });

  it('should allow updating name and description', () => {
    const scope = new Scope();
    scope.setName('initialName');
    scope.setDescription('initialDescription');
    expect(scope.getName()).toBe('initialName');
    expect(scope.getDescription()).toBe('initialDescription');

    scope.setName('updatedName');
    scope.setDescription('updatedDescription');
    expect(scope.getName()).toBe('updatedName');
    expect(scope.getDescription()).toBe('updatedDescription');
  });
});
