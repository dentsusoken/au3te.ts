import { describe, expect, it, vi } from 'vitest';
import { AuthleteApi } from '../../au3te-ts-common/api/AuthleteApi';
import { OBBTokenTask } from './OBBTokenTask';

describe('OBBTokenTask', () => {
  it('should process', () => {
    // @ts-expect-error Mocking
    const authleteApi: AuthleteApi = {
      tokenDelete: vi.fn(),
    }; // Mock AuthleteApi
    const request = new Request('http://localhost:3000');
    const requestParams = {};
    const response = new Response();
    const responseParams = {};

    expect(() =>
      new OBBTokenTask().process(
        authleteApi,
        request,
        requestParams,
        response,
        responseParams
      )
    ).not.toThrowError();
  });
  // TODO Add more tests
  // for now, grant_type is not 'refresh_token' and response status is not 200
});
