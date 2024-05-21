import { describe, expect, it } from 'vitest';
import { ResponseUtil } from './ResponseUtil';

describe('ResponseUtil', () => {
  it('should return 200 OK with plain text content', async () => {
    const response = ResponseUtil.ok('OK');
    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe(
      'text/plain;charset=utf-8'
    );
    expect(await response.text()).toBe('OK');
  });

  it('should return 200 OK with JSON content', async () => {
    const response = ResponseUtil.okJson(JSON.stringify({ message: 'OK' }));
    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe(
      'application/json;charset=utf-8'
    );
    expect(await response.json()).toEqual({ message: 'OK' });
  });
  //   it('should return 200 OK with JWT content', async () => {
  //     const response = ResponseUtil.okJwt('JWT');
  //     expect(response.status).toBe(200);
  //     expect(response.headers.get('Content-Type')).toBe(
  //       'application/jwt;charset=utf-8'
  //     );
  //     expect(await response.text()).toBe('JWT');
  //   });
  it('should return 200 OK with HTML content', async () => {
    const response = ResponseUtil.okHtml('<h1>OK</h1>');
    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe(
      'text/html;charset=utf-8'
    );
    expect(await response.text()).toEqual('<h1>OK</h1>');
  });
  it('should return 202 Accepted with JSON content', async () => {
    const response = ResponseUtil.acceptedJson('{"message": "Accepted"}');
    expect(response.status).toBe(202);
    expect(response.headers.get('Content-Type')).toBe(
      'application/json;charset=utf-8'
    );
    expect(await response.json()).toEqual({ message: 'Accepted' });
  });

  //   it('should return 202 Accepted with JWT content', async () => {
  //     const response = ResponseUtil.acceptedJwt('JWT');
  //     expect(response.status).toBe(202);
  //     expect(response.headers.get('Content-Type')).toBe(
  //       'application/jwt;charset=utf-8'
  //     );
  //     expect(await response.text()).toBe('JWT');
  //   });
  it('should return 204 No Content', async () => {
    const response = ResponseUtil.noContent();
    expect(response.status).toBe(204);
  });
  it('should return 400 Bad Request with JSON content', async () => {
    const response = ResponseUtil.badRequestJson('{"error": "Bad Request"}');
    expect(response.status).toBe(400);
    expect(response.headers.get('Content-Type')).toBe(
      'application/json;charset=utf-8'
    );
  });

  it('should return 400 Bad Request with HTML content', async () => {
    const response = ResponseUtil.badRequestHtml('<h1>Bad Request</h1>');
    expect(response.status).toBe(400);
    expect(response.headers.get('Content-Type')).toBe(
      'text/html;charset=utf-8'
    );
    expect(await response.text()).toBe('<h1>Bad Request</h1>');
  });

  it('should return 401 Unauthorized with HTML content', async () => {
    const response = ResponseUtil.unauthorizedHtml(
      '<h1>Unauthorized</h1>',
      'Bearer'
    );
    expect(response.status).toBe(401);
    expect(response.headers.get('Content-Type')).toBe(
      'text/html;charset=utf-8'
    );
    expect(response.headers.get('WWW-Authenticate')).toBe('Bearer');
    expect(await response.text()).toBe('<h1>Unauthorized</h1>');
  });

  it('should return 401 Unauthorized with challenge', async () => {
    const response = ResponseUtil.unauthorized('Unauthorized', 'Bearer');
    expect(response.status).toBe(401);
    expect(response.headers.get('Content-Type')).toBe(
      'text/plain;charset=utf-8'
    );
    expect(response.headers.get('WWW-Authenticate')).toBe('Bearer');
    expect(await response.text()).toBe('Unauthorized');
  });
  it('should return 403 Forbidden with plain text content', async () => {
    const response = ResponseUtil.forbidden('Forbidden');
    expect(response.status).toBe(403);
    expect(response.headers.get('Content-Type')).toBe(
      'text/plain;charset=utf-8'
    );
    expect(await response.text()).toBe('Forbidden');
  });

  it('should return 403 Forbidden with JSON content', async () => {
    const response = ResponseUtil.forbiddenJson('{"error": "Forbidden"}');
    expect(response.status).toBe(403);
    expect(response.headers.get('Content-Type')).toBe(
      'application/json;charset=utf-8'
    );
    expect(await response.text()).toBe('{"error": "Forbidden"}');
  });
  it('should return 403 Forbidden with JSON content', async () => {
    const response = ResponseUtil.forbiddenJson('{"error": "Forbidden"}');
    expect(response.status).toBe(403);
    expect(response.headers.get('Content-Type')).toBe(
      'application/json;charset=utf-8'
    );
    expect(await response.text()).toBe('{"error": "Forbidden"}');
  });

  it('should return 404 Not Found with JSON content', async () => {
    const response = ResponseUtil.notFoundJson('{"error": "Not Found"}');
    expect(response.status).toBe(404);
    expect(response.headers.get('Content-Type')).toBe(
      'application/json;charset=utf-8'
    );
    expect(await response.text()).toBe('{"error": "Not Found"}');
  });

  it('should return 404 Not Found with HTML content', async () => {
    const response = ResponseUtil.notFoundHtml('<h1>Not Found</h1>');
    expect(response.status).toBe(404);
    expect(response.headers.get('Content-Type')).toBe(
      'text/html;charset=utf-8'
    );
    expect(await response.text()).toBe('<h1>Not Found</h1>');
  });

  it('should return 500 Internal Server Error with plain text content', async () => {
    const response = ResponseUtil.internalServerError('Internal Server Error');
    expect(response.status).toBe(500);
    expect(response.headers.get('Content-Type')).toBe(
      'text/plain;charset=utf-8'
    );
    expect(await response.text()).toBe('Internal Server Error');
  });

  it('should return 500 Internal Server Error with HTML content', async () => {
    const response = ResponseUtil.internalServerErrorHtml(
      '<h1>Internal Server Error</h1>'
    );
    expect(response.status).toBe(500);
    expect(response.headers.get('Content-Type')).toBe(
      'text/html;charset=utf-8'
    );
    expect(await response.text()).toBe('<h1>Internal Server Error</h1>');
  });

  it('should return 500 Internal Server Error with JSON content', async () => {
    const response = ResponseUtil.internalServerErrorJson(
      '{"error": "Internal Server Error"}'
    );
    expect(response.status).toBe(500);
    expect(response.headers.get('Content-Type')).toBe(
      'application/json;charset=utf-8'
    );
    expect(await response.text()).toBe('{"error": "Internal Server Error"}');
  });
});
