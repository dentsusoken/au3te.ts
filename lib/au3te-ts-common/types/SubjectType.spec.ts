import { describe, expect, test } from 'vitest';
import { SubjectType } from './SubjectType';

describe('SubjectType', () => {
  test('getValue', () => {
    const subjectType = SubjectType.PUBLIC;
    expect(subjectType.getValue()).toBe(0);
  });

  test('toString', () => {
    const subjectType = SubjectType.PUBLIC;
    expect(subjectType.toString()).toBe('public');
  });
});