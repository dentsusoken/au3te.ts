import { describe, expect, it } from 'vitest';
import { WebApplicationException } from '../../util/WebApplicationException';
import { ExceptionUtil } from './ExceptionUtil';

// TODO Crdential Endpoint
describe('ExceptionUtil', () => {
  it('badRequestExceptionJson', async () => {
    try {
      throw ExceptionUtil.badRequestExceptionJson(
        JSON.stringify({
          error: 'invalid_request',
          error_description: 'The request is missing a required parameter',
        })
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const response = (e as WebApplicationException).getResponse();
      expect(e).toBeInstanceOf(WebApplicationException);
      expect(response.status).toBe(400);
      expect(await response.json()).toBe(
        JSON.stringify({
          error: 'invalid_request',
          error_description: 'The request is missing a required parameter',
        })
      );
    }
  });
  it('unauthorizedException', async () => {
    try {
      throw ExceptionUtil.unauthorizedException(
        JSON.stringify({
          error: 'invalid_token',
          error_description: 'The access token expired',
        }),
        'Bearer realm="example"'
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const response = (e as WebApplicationException).getResponse();
      expect(e).toBeInstanceOf(WebApplicationException);
      expect(response.status).toBe(401);
      expect(await response.json()).toBe(
        JSON.stringify({
          error: 'invalid_token',
          error_description: 'The access token expired',
        })
      );
      expect(response.headers.get('WWW-Authenticate')).toBe(
        'Bearer realm="example"'
      );
    }
  });
  it('forbiddenExceptionJson', async () => {
    try {
      throw ExceptionUtil.forbiddenExceptionJson(
        JSON.stringify({
          error: 'insufficient_scope',
          error_description: 'The request requires higher privileges',
        })
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const response = (e as WebApplicationException).getResponse();
      expect(e).toBeInstanceOf(WebApplicationException);
      expect(response.status).toBe(403);
      expect(await response.json()).toBe(
        JSON.stringify({
          error: 'insufficient_scope',
          error_description: 'The request requires higher privileges',
        })
      );
    }
  });
  it('internalServerErrorExceptionJson', async () => {
    try {
      throw ExceptionUtil.internalServerErrorExceptionJson(
        JSON.stringify({
          error: 'server_error',
          error_description: 'The server encountered an error',
        })
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const response = (e as WebApplicationException).getResponse();
      expect(e).toBeInstanceOf(WebApplicationException);
      expect(response.status).toBe(500);
      expect(await response.json()).toBe(
        JSON.stringify({
          error: 'server_error',
          error_description: 'The server encountered an error',
        })
      );
    }
  });
});
