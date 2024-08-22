import { expect, it } from 'vitest';
import { AuthleteApiException } from './AuthleteApiException';
import { describe } from 'node:test';
describe('AuthleteApiException', () => {
  describe('constructor', () => {
    it('should create instance', () => {
      const statusCode = 500;
      const statusMessage = 'Internal Server Error';
      const responseBody = 'Something went wrong';
      const responseHeaders = { 'Content-Type': 'application/json' };

      const exception = new AuthleteApiException(
        'API Exception',
        statusCode,
        statusMessage,
        responseBody,
        responseHeaders
      );

      expect(exception).toBeInstanceOf(AuthleteApiException);
    });
    it('should have message', () => {
      const statusCode = 500;
      const statusMessage = 'Internal Server Error';
      const responseBody = 'Something went wrong';
      const responseHeaders = { 'Content-Type': 'application/json' };

      const exception = new AuthleteApiException(
        'API Exception',
        statusCode,
        statusMessage,
        responseBody,
        responseHeaders
      );

      expect(exception.message).toBe('API Exception');
    });
  });
  describe('getStatusCode', () => {
    it('should return status code', () => {
      const statusCode = 500;
      const statusMessage = 'Internal Server Error';
      const responseBody = 'Something went wrong';
      const responseHeaders = { 'Content-Type': 'application/json' };

      const exception = new AuthleteApiException(
        'API Exception',
        statusCode,
        statusMessage,
        responseBody,
        responseHeaders
      );

      expect(exception.getStatusCode()).toBe(statusCode);
    });
  });
  describe('getStatusMessage', () => {
    it('should return status message', () => {
      const statusCode = 500;
      const statusMessage = 'Internal Server Error';
      const responseBody = 'Something went wrong';
      const responseHeaders = { 'Content-Type': 'application/json' };

      const exception = new AuthleteApiException(
        'API Exception',
        statusCode,
        statusMessage,
        responseBody,
        responseHeaders
      );

      expect(exception.getStatusMessage()).toBe(statusMessage);
    });
  });
  describe('getResponseBody', () => {
    it('should return response body', () => {
      const statusCode = 500;
      const statusMessage = 'Internal Server Error';
      const responseBody = 'Something went wrong';
      const responseHeaders = { 'Content-Type': 'application/json' };

      const exception = new AuthleteApiException(
        'API Exception',
        statusCode,
        statusMessage,
        responseBody,
        responseHeaders
      );

      expect(exception.getResponseBody()).toBe(responseBody);
    });
  });
  describe('getResponseHeaders', () => {
    it('should return response headers', () => {
      const statusCode = 500;
      const statusMessage = 'Internal Server Error';
      const responseBody = 'Something went wrong';
      const responseHeaders = { 'Content-Type': 'application/json' };

      const exception = new AuthleteApiException(
        'API Exception',
        statusCode,
        statusMessage,
        responseBody,
        responseHeaders
      );

      expect(exception.getResponseHeaders()).toStrictEqual(responseHeaders);
    });
  });
});
