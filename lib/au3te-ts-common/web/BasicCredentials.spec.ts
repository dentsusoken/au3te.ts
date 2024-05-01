import { describe, expect, it } from 'vitest';
import { BasicCredentials } from './BasicCredentials';
describe('BasicCredentials', () => {
  it('getUserId', () => {
    const credentials = new BasicCredentials('user123', 'password123');
    expect(credentials.getUserId()).toEqual('user123');
  });

  it('getPassword', () => {
    const credentials = new BasicCredentials('user123', 'password123');
    expect(credentials.getPassword()).toEqual('password123');
  });

  it('parse with valid input', () => {
    const input = 'Basic dXNlcjEyMzpwYXNzd29yZDEyMw==';
    const credentials = BasicCredentials.parse(input);
    expect(credentials).toBeInstanceOf(BasicCredentials);
    expect(credentials?.getUserId()).toEqual('user123');
    expect(credentials?.getPassword()).toEqual('password123');
  });

  it('parse with invalid input', () => {
    const input = 'InvalidInput';
    const credentials = BasicCredentials.parse(input);
    expect(credentials).toBeInstanceOf(BasicCredentials);
    expect(credentials?.getUserId()).toEqual('');
    expect(credentials?.getPassword()).toEqual('');
  });

  it('format', () => {
    const credentials = new BasicCredentials('user123', 'password123');
    const formatted = credentials.format();
    expect(formatted).toEqual('Basic dXNlcjEyMzpwYXNzd29yZDEyMw==');
  });
});
