import { Response, ResponseBuilder, Status } from 'some-http-library';

class ResponseUtil {
  private static readonly MEDIA_TYPE_JSON = 'application/json;charset=UTF-8';
  private static readonly MEDIA_TYPE_HTML = 'text/html;charset=UTF-8';
  private static readonly MEDIA_TYPE_JWT = 'application/jwt';
  private static readonly MEDIA_TYPE_JAVASCRIPT =
    'application/javascript;charset=UTF-8';
  private static readonly MEDIA_TYPE_ENTITY_STATEMENT =
    'application/entity-statement+jwt';
  private static readonly MEDIA_TYPE_TOKEN_INTROSPECTION =
    'application/token-introspection+jwt';
  private static readonly MEDIA_TYPE_JOSE = 'application/jose';
  private static readonly CACHE_CONTROL = 'no-store';

  public static ok(entity: string, headers?: Record<string, any>): Response {
    return this.builder(
      Status.OK,
      entity,
      this.MEDIA_TYPE_JSON,
      headers
    ).build();
  }

  public static form(entity: string): Response {
    return this.builder(Status.OK, entity, this.MEDIA_TYPE_HTML).build();
  }

  public static javaScript(entity: string): Response {
    return this.builder(Status.OK, entity, this.MEDIA_TYPE_JAVASCRIPT).build();
  }

  public static entityStatement(entity: string): Response {
    return this.builder(
      Status.OK,
      entity,
      this.MEDIA_TYPE_ENTITY_STATEMENT
    ).build();
  }

  public static tokenIntrospection(entity: string): Response {
    return this.builder(
      Status.OK,
      entity,
      this.MEDIA_TYPE_TOKEN_INTROSPECTION
    ).build();
  }

  public static jose(entity: string): Response {
    return this.builder(Status.OK, entity, this.MEDIA_TYPE_JOSE).build();
  }

  public static noContent(headers?: Record<string, any>): Response {
    return this.builder(Status.NO_CONTENT, headers).build();
  }

  public static location(location: string): Response {
    return this.builder(Status.FOUND).header('Location', location).build();
  }

  public static badRequest(
    entity: string,
    headers?: Record<string, any>
  ): Response {
    return this.builder(
      Status.BAD_REQUEST,
      entity,
      this.MEDIA_TYPE_JSON,
      headers
    ).build();
  }

  public static unauthorized(
    entity: string,
    challenge: string,
    headers?: Record<string, any>
  ): Response {
    const builder = this.builder(
      Status.UNAUTHORIZED,
      entity,
      this.MEDIA_TYPE_JSON,
      headers
    );

    if (challenge) {
      builder.header('WWW-Authenticate', challenge);
    }

    return builder.build();
  }

  public static forbidden(
    entity: string,
    headers?: Record<string, any>
  ): Response {
    return this.builder(
      Status.FORBIDDEN,
      entity,
      this.MEDIA_TYPE_JSON,
      headers
    ).build();
  }

  public static notFound(
    entity: string,
    headers?: Record<string, any>
  ): Response {
    return this.builder(
      Status.NOT_FOUND,
      entity,
      this.MEDIA_TYPE_JSON,
      headers
    ).build();
  }

  public static internalServerError(
    entity: string,
    headers?: Record<string, any>
  ): Response {
    return this.builder(
      Status.INTERNAL_SERVER_ERROR,
      entity,
      this.MEDIA_TYPE_JSON,
      headers
    ).build();
  }

  public static created(
    entity: string,
    headers?: Record<string, any>
  ): Response {
    return this.builder(
      Status.CREATED,
      entity,
      this.MEDIA_TYPE_JSON,
      headers
    ).build();
  }

  public static tooLarge(
    entity: string,
    headers?: Record<string, any>
  ): Response {
    return this.builder(
      Status.REQUEST_ENTITY_TOO_LARGE,
      entity,
      this.MEDIA_TYPE_JSON,
      headers
    ).build();
  }

  private static builder(
    status: Status,
    entity?: string,
    mediaType?: string,
    headers?: Record<string, any>
  ): ResponseBuilder {
    let builder = Response.status(status)
      .header('Cache-Control', this.CACHE_CONTROL)
      .header('Pragma', 'no-cache');

    if (headers) {
      for (const [key, value] of Object.entries(headers)) {
        builder = builder.header(key, value);
      }
    }

    if (entity) {
      builder = builder.entity(entity);
    }

    if (mediaType) {
      builder = builder.type(mediaType);
    }

    return builder;
  }
}
