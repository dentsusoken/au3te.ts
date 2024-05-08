import { expect, test } from 'vitest';
import { loadEnv } from './EnvLoader';

test('loadEnv', () => {
  const env = {
    API_BASE_URL: 'value1',
    API_VERSION: 123,
    API_KEY: null,
    ACCESS_TOKEN: undefined,
  };

  loadEnv(env);

  expect(process.env.API_BASE_URL).toEqual('value1');
  expect(process.env.API_VERSION).toEqual('123');
  expect(process.env.API_KEY).toBeUndefined();
  expect(process.env.ACCESS_TOKEN).toBeUndefined();
});
