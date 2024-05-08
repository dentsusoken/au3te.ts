import { describe, expect, it } from 'vitest';
import { SessionUtils } from './session';

describe('SessionUtils', () => {
  it('should convert object to JSON', () => {
    const obj = { name: 'John', age: 30 };
    const json = SessionUtils.toJson(obj);
    expect(json).toEqual('{"name":"John","age":30}');
  });

  it('should convert JSON to object', () => {
    const json = '{"name":"John","age":30}';
    const obj = SessionUtils.fromJson(json);
    expect(obj).toEqual({ name: 'John', age: 30 });
  });

  it('should generate a session ID', () => {
    const sessionId = SessionUtils.generateSessionId();
    expect(typeof sessionId).toEqual('string');
    expect(sessionId.length).toBeGreaterThan(0);
  });

  it('should generate default expire time', () => {
    const expireTime = SessionUtils.generateExpireTime({});
    expect(typeof expireTime).toEqual('number');
    expect(expireTime).toBeGreaterThan(0);
  });

  it('should generate custom expire time', () => {
    const expireTime = SessionUtils.generateExpireTime({
      hour: 1,
      minute: 30,
      second: 0,
    });
    expect(typeof expireTime).toEqual('number');
    expect(expireTime).toBeGreaterThan(0);
  });
});
