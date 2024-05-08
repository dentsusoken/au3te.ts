import { describe, expect, it } from 'vitest';
import { ResponseUtil } from './ResponseUtil';

describe('ResponseUtil', () => {
  it('ok', async () => {
    const json = { message: 'OK' };
    const response = ResponseUtil.ok(JSON.stringify(json));
    expect(response.status).toEqual(200);
    expect(response.headers.get('Content-Type')).toEqual(
      'application/json;charset=UTF-8'
    );
    expect(await response.json()).toEqual(json);
  });
  it('form', async () => {
    const html = '<html><body>Form</body></html>';
    const response = ResponseUtil.form(html);
    expect(response.status).toEqual(200);
    expect(response.headers.get('Content-Type')).toEqual(
      'text/html;charset=UTF-8'
    );
    expect(await response.text()).toEqual(html);
  });
  it('javaScript', async () => {
    const script = 'console.log("Hello, world!")';
    const response = ResponseUtil.javaScript(script);
    expect(response.status).toEqual(200);
    expect(response.headers.get('Content-Type')).toEqual(
      'application/javascript;charset=UTF-8'
    );
    expect(await response.text()).toEqual(script);
  });
  // TODO confirm what is entityStatement
  it('entityStatement', async () => {
    const entity = '{"message": "Entity Statement"}';
    const response = ResponseUtil.entityStatement(entity);
    expect(response.status).toEqual(200);
    expect(response.headers.get('Content-Type')).toEqual(
      'application/entity-statement+jwt'
    );
    expect(await response.text()).toEqual(entity);
  });
  // TODO confirm what is tokenIntrospection
  it('tokenIntrospection', async () => {
    const entity = '{"message": "Token Introspection"}';
    const response = ResponseUtil.tokenIntrospection(entity);
    expect(response.status).toEqual(200);
    expect(response.headers.get('Content-Type')).toEqual(
      'application/token-introspection+jwt'
    );
    expect(await response.text()).toEqual(entity);
  });
  it('jose', async () => {
    // TODO create JWT object
    const entity = '{"message": "JOSE"}';
    const response = ResponseUtil.jose(entity);
    expect(response.status).toEqual(200);
    expect(response.headers.get('Content-Type')).toEqual('application/jose');
    expect(await response.text()).toEqual(entity);
  });
  it('noContent', async () => {
    const response = ResponseUtil.noContent();
    expect(response.status).toEqual(204);
    expect(response.headers.get('Cache-Control')).toEqual('no-store');
    expect(await response.text()).toEqual('');
  });
  it('location', async () => {
    const location = '/home';
    const response = ResponseUtil.location(location);
    expect(response.status).toEqual(302);
    expect(response.headers.get('Location')).toEqual(location);
    expect(await response.text()).toEqual('');
  });
  it('badRequest', async () => {
    const entity = '{"message": "Bad Request"}';
    const response = ResponseUtil.badRequest(entity);
    expect(response.status).toEqual(400);
    expect(response.headers.get('Content-Type')).toEqual(
      'application/json;charset=UTF-8'
    );
    expect(await response.text()).toEqual(entity);
  });
  it('unauthorized', async () => {
    const entity = '{"message": "Unauthorized"}';
    const response = ResponseUtil.unauthorized(entity, 'Bearer');
    expect(response.status).toEqual(401);
    expect(response.headers.get('Content-Type')).toEqual(
      'application/json;charset=UTF-8'
    );
    expect(response.headers.get('WWW-Authenticate')).toEqual('Bearer');
    expect(await response.text()).toEqual(entity);
  });
  it('forbidden', async () => {
    const entity = '{"message": "Forbidden"}';
    const response = ResponseUtil.forbidden(entity);
    expect(response.status).toEqual(403);
    expect(response.headers.get('Content-Type')).toEqual(
      'application/json;charset=UTF-8'
    );
    expect(await response.text()).toEqual(entity);
  });
  it('notFound', async () => {
    const entity = '{"message": "Not Found"}';
    const response = ResponseUtil.notFound(entity);
    expect(response.status).toEqual(404);
    expect(response.headers.get('Content-Type')).toEqual(
      'application/json;charset=UTF-8'
    );
    expect(await response.text()).toEqual(entity);
  });
  it('internalServerError', async () => {
    const entity = '{"message": "Internal Server Error"}';
    const response = ResponseUtil.internalServerError(entity);
    expect(response.status).toEqual(500);
    expect(response.headers.get('Content-Type')).toEqual(
      'application/json;charset=UTF-8'
    );
    expect(await response.text()).toEqual(entity);
  });
  it('created', async () => {
    const entity = '{"message": "Created"}';
    const response = ResponseUtil.created(entity);
    expect(response.status).toEqual(201);
    expect(response.headers.get('Content-Type')).toEqual(
      'application/json;charset=UTF-8'
    );
    expect(await response.text()).toEqual(entity);
  });
  it('tooLarge', async () => {
    const entity = '{"message": "Request Entity Too Large"}';
    const response = ResponseUtil.tooLarge(entity);
    expect(response.status).toEqual(413);
    expect(response.headers.get('Content-Type')).toEqual(
      'application/json;charset=UTF-8'
    );
    expect(await response.text()).toEqual(entity);
  });
});
