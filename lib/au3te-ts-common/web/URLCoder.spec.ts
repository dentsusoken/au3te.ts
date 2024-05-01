import { describe, expect, it } from 'vitest';
import { URLCoder } from './URLCoder';

describe('URLCoder', () => {
  it('encode', () => {
    const input = 'Hello World!';
    const encoded = URLCoder.encode(input);
    console.log('encoded :>> ', encoded);

    expect(encoded).toEqual('Hello%20World%21');
  });

  it('decode', () => {
    const input = 'Hello%20World%21';
    const decoded = URLCoder.decode(input);
    expect(decoded).toEqual('Hello World!');
  });

  it('formUrlEncode with empty parameters', () => {
    const parameters = {};
    const encoded = URLCoder.formUrlEncode(parameters);
    expect(encoded).toBeUndefined();
  });

  it('formUrlEncode with single parameter', () => {
    const parameters = {
      key: 'value',
    };
    const encoded = URLCoder.formUrlEncode(parameters);
    expect(encoded).toEqual('key=value');
  });

  it('formUrlEncode with multiple parameters', () => {
    const parameters = {
      key1: 'value1',
      key2: 'value2',
    };
    const encoded = URLCoder.formUrlEncode(parameters);
    expect(encoded).toEqual('key1=value1&key2=value2');
  });

  it('formUrlEncode with array values', () => {
    const parameters = {
      key: ['value1', 'value2'],
    };
    const encoded = URLCoder.formUrlEncode(parameters);
    expect(encoded).toEqual('key=value1&key=value2');
  });

  it('formUrlEncode with empty values', () => {
    const parameters = {
      key: '',
    };
    const encoded = URLCoder.formUrlEncode(parameters);
    expect(encoded).toEqual('');
  });
});
