import { describe, expect, it } from 'vitest';
import { AuthleteApiVersion } from './AuthleteApiVersion';

describe('AuthleteApiVersion', () => {
  it('parse - valid version', () => {
    const version = 'V3';
    const result = AuthleteApiVersion.parse(version);
    expect(result).toEqual('V3');
  });

  it('parse - invalid version', () => {
    const version = 'v3';
    const result = AuthleteApiVersion.parse(version);
    expect(result).toBeUndefined();
  });

  it('parse - null version', () => {
    const version = null;
    const result = AuthleteApiVersion.parse(version!);
    expect(result).toBeNull();
  });
});
