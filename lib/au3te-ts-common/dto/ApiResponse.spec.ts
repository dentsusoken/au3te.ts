import { beforeEach, describe, expect, it } from 'vitest';
import ApiResponse from './ApiResponse';

describe('ApiResponse', () => {
  let apiResponse: ApiResponse;

  beforeEach(() => {
    apiResponse = new ApiResponse();
  });

  it('should set and get the result code', () => {
    const code = '200';
    apiResponse.setResultCode(code);
    expect(apiResponse.getResultCode()).toEqual(code);
  });

  it('should set and get the result message', () => {
    const message = 'Success';
    apiResponse.setResultMessage(message);
    expect(apiResponse.getResultMessage()).toEqual(message);
  });
});
