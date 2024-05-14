enum Status {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  FOUND = 302,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  REQUEST_ENTITY_TOO_LARGE = 413,
  INTERNAL_SERVER_ERROR = 500,
}

export class ResponseUtil {
  static readonly MEDIA_TYPE_JSON = 'application/json;charset=UTF-8';
  static readonly MEDIA_TYPE_HTML = 'text/html;charset=UTF-8';
  // Unused
  // private static readonly MEDIA_TYPE_JWT = 'application/jwt';
  static readonly MEDIA_TYPE_JAVASCRIPT =
    'application/javascript;charset=UTF-8';
  static readonly MEDIA_TYPE_ENTITY_STATEMENT =
    'application/entity-statement+jwt';
  static readonly MEDIA_TYPE_TOKEN_INTROSPECTION =
    'application/token-introspection+jwt';
  static readonly MEDIA_TYPE_JOSE = 'application/jose';
  static readonly CACHE_CONTROL = 'no-store';

  public static ok(
    entity?: string,
    headers?: Record<string, unknown>
  ): Response {
    return this.build(Status.OK, entity, this.MEDIA_TYPE_JSON, headers);
  }

  public static form(entity?: string): Response {
    return this.build(Status.OK, entity, this.MEDIA_TYPE_HTML);
  }

  public static javaScript(entity: string): Response {
    return this.build(Status.OK, entity, this.MEDIA_TYPE_JAVASCRIPT);
  }

  public static entityStatement(entity: string): Response {
    return this.build(Status.OK, entity, this.MEDIA_TYPE_ENTITY_STATEMENT);
  }

  public static tokenIntrospection(entity: string): Response {
    return this.build(Status.OK, entity, this.MEDIA_TYPE_TOKEN_INTROSPECTION);
  }

  public static jose(entity: string): Response {
    return this.build(Status.OK, entity, this.MEDIA_TYPE_JOSE);
  }

  public static noContent(headers?: Record<string, unknown>): Response {
    return this.build(Status.NO_CONTENT, undefined, undefined, headers);
  }

  public static location(location?: string): Response {
    const response = this.build(Status.FOUND);
    location && response.headers.set('Location', location);
    return response;
  }

  public static badRequest(
    entity?: string,
    headers?: Record<string, unknown>
  ): Response {
    return this.build(
      Status.BAD_REQUEST,
      entity,
      this.MEDIA_TYPE_JSON,
      headers
    );
  }

  public static unauthorized(
    entity?: string,
    challenge?: string,
    headers?: Record<string, unknown>
  ): Response {
    const response = this.build(
      Status.UNAUTHORIZED,
      entity,
      this.MEDIA_TYPE_JSON,
      headers
    );

    if (challenge) {
      response.headers.set('WWW-Authenticate', challenge);
    }

    return response;
  }

  public static forbidden(
    entity?: string,
    headers?: Record<string, unknown>
  ): Response {
    return this.build(Status.FORBIDDEN, entity, this.MEDIA_TYPE_JSON, headers);
  }

  public static notFound(
    entity?: string,
    headers?: Record<string, unknown>
  ): Response {
    return this.build(Status.NOT_FOUND, entity, this.MEDIA_TYPE_JSON, headers);
  }

  public static internalServerError(
    entity?: string,
    headers?: Record<string, unknown>
  ): Response {
    return this.build(
      Status.INTERNAL_SERVER_ERROR,
      entity,
      this.MEDIA_TYPE_JSON,
      headers
    );
  }

  public static created(
    entity?: string,
    headers?: Record<string, unknown>
  ): Response {
    return this.build(Status.CREATED, entity, this.MEDIA_TYPE_JSON, headers);
  }

  public static tooLarge(
    entity?: string,
    headers?: Record<string, unknown>
  ): Response {
    return this.build(
      Status.REQUEST_ENTITY_TOO_LARGE,
      entity,
      this.MEDIA_TYPE_JSON,
      headers
    );
  }

  private static build(
    status: Status,
    entity?: string,
    mediaType?: string,
    headers?: Record<string, unknown>
  ): Response {
    const response = mediaType
      ? new Response(entity, {
          status,
          headers: {
            ...headers,
            'Cache-Control': this.CACHE_CONTROL,
            Pragma: 'no-cache',
            'Content-Type': mediaType,
          },
        })
      : new Response(entity, {
          status,
          headers: {
            ...headers,
            'Cache-Control': this.CACHE_CONTROL,
            Pragma: 'no-cache',
          },
        });

    return response;
  }
}
