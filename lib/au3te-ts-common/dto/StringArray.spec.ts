import { describe, it, expect } from 'vitest';
import { StringArray } from './StringArray';

describe('StringArray', () => {
  it('should initialize with an empty array by default', () => {
    const stringArray = new StringArray();
    expect(stringArray.getArray()).toEqual([]);
  });

  it('should initialize with the provided array', () => {
    const initialArray = ['a', 'b', 'c'];
    const stringArray = new StringArray(initialArray);
    expect(stringArray.getArray()).toEqual(initialArray);
  });

  it('should set and get the array', () => {
    const stringArray = new StringArray();
    const newArray = ['x', 'y', 'z'];
    stringArray.setArray(newArray);
    expect(stringArray.getArray()).toEqual(newArray);
  });

  it('should allow updating the array', () => {
    const initialArray = ['a', 'b', 'c'];
    const stringArray = new StringArray(initialArray);
    const updatedArray = ['d', 'e', 'f'];
    stringArray.setArray(updatedArray);
    expect(stringArray.getArray()).toEqual(updatedArray);
  });
});
