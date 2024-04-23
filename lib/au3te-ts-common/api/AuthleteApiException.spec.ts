import { expect, test } from 'vitest';
import AuthleteApiException from './AuthleteApiException';

test('AuthleteApiException', () => {
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
  expect(exception.message).toBe('API Exception');
  expect(exception.getStatusCode()).toBe(statusCode);
  expect(exception.getStatusMessage()).toBe(statusMessage);
  expect(exception.getResponseBody()).toBe(responseBody);
  expect(exception.getResponseHeaders()).toBe(responseHeaders);
});