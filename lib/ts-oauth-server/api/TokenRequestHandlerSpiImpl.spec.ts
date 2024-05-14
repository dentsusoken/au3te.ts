import { describe, expect, it } from 'vitest';
import { AuthleteApi } from '../../au3te-ts-common/api/AuthleteApi';
import { TokenRequestHandlerSpiImpl } from './TokenRequestHandlerSpiImpl';

describe('TokenRequestHandlerSpiImpl', () => {
  it('getProperties method should return undefined', () => {
    // @ts-expect-error - Mocking
    const api: AuthleteApi = {};
    const instance = new TokenRequestHandlerSpiImpl(api);
    expect(instance.getProperties()).toBe(undefined);
  });
});
