import { expect, test } from 'vitest';
import { loadEnv } from './EnvLoader';

test('loadEnv', () => {
  const env = {
    VAR1: 'value1',
    VAR2: 123,
    VAR3: null,
    VAR4: undefined,
  };

  loadEnv(env);

  expect(process.env.VAR1).toEqual('value1');
  expect(process.env.VAR2).toEqual('123');
  expect(process.env.VAR3).toBeUndefined();
  expect(process.env.VAR4).toBeUndefined();
});
