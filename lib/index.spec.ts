import { test, expect } from 'vitest';

import { add } from '.';

test('add', () =>{
  expect(add(1, 2)).toEqual(3);
});