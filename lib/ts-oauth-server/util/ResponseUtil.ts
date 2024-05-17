import { HttpStatus } from '../../util/HttpStatus';
import { MediaType } from '../../util/MediaType';
// TODO integrate this with the other ResponseUtil.ts under au3te-ts-tsxrs
export class ResponseUtil {
  private static readonly MEDIA_TYPE_HTML =
    MediaType.TEXT_HTML_TYPE.withCharset('utf-8');
  private static readonly MEDIA_TYPE_PLAIN =
    MediaType.TEXT_PLAIN_TYPE.withCharset('utf-8');
  private static readonly MEDIA_TYPE_JSON =
    MediaType.APPLICATION_JSON_TYPE.withCharset('utf-8');
  private static readonly MEDIA_TYPE_JWT =
    MediaType.APPLICATION_JWT_TYPE.withCharset('utf-8');

  public static ok(entity?: string, headers?: Record<string, unknown>) {
    return this.builderForTextPlain(HttpStatus.OK.value(), entity, headers);
  }

  public static okJson(entity?: string, headers?: Record<string, unknown>) {
    return this.builderForJson(HttpStatus.OK.value(), entity, headers);
  }

  public static okJwt(entity?: string, headers?: Record<string, unknown>) {
    return this.builderForJwt(HttpStatus.OK.value(), entity, headers);
  }

  public static okHtml(entity?: string, headers?: Record<string, unknown>) {
    return this.builderForTextHtml(HttpStatus.OK.value(), entity, headers);
  }

  public static acceptedJson(
    entity?: string,
    headers?: Record<string, unknown>
  ) {
    return this.builderForJson(HttpStatus.ACCEPTED.value(), entity, headers);
  }

  public static acceptedJwt(
    entity?: string,
    headers?: Record<string, unknown>
  ) {
    return this.builderForJwt(HttpStatus.ACCEPTED.value(), entity, headers);
  }

  public static noContent() {
    return new Response(undefined, {
      status: HttpStatus.NO_CONTENT.value(),
    });
  }

  public static badRequest(entity?: string, headers?: Record<string, unknown>) {
    return this.builderForTextPlain(
      HttpStatus.BAD_REQUEST.value(),
      entity,
      headers
    );
  }

  public static badRequestJson(
    entity?: string,
    headers?: Record<string, unknown>
  ) {
    return this.builderForJson(HttpStatus.BAD_REQUEST.value(), entity, headers);
  }

  public static badRequestHtml(
    entity?: string,
    headers?: Record<string, unknown>
  ) {
    return this.builderForTextHtml(
      HttpStatus.BAD_REQUEST.value(),
      entity,
      headers
    );
  }

  public static unauthorized(
    entity?: string,
    challenge?: string,
    headers?: Record<string, unknown>
  ) {
    return this.builderForTextPlain(HttpStatus.UNAUTHORIZED.value(), entity, {
      'WWW-Authenticate': challenge,
      ...headers,
    });
  }

  public static unauthorizedHtml(
    entity?: string,
    challenge?: string,
    headers?: Record<string, unknown>
  ) {
    return this.builderForTextHtml(HttpStatus.UNAUTHORIZED.value(), entity, {
      'WWW-Authenticate': challenge,
      ...headers,
    });
  }

  public static forbidden(entity?: string, headers?: Record<string, unknown>) {
    return this.builderForTextPlain(
      HttpStatus.FORBIDDEN.value(),
      entity,
      headers
    );
  }

  public static forbiddenJson(
    entity?: string,
    headers?: Record<string, unknown>
  ) {
    return this.builderForJson(HttpStatus.FORBIDDEN.value(), entity, headers);
  }

  public static notFounnd(entity?: string, headers?: Record<string, unknown>) {
    return this.builderForTextPlain(
      HttpStatus.NOT_FOUND.value(),
      entity,
      headers
    );
  }

  public static notFoundJson(
    entity?: string,
    headers?: Record<string, unknown>
  ) {
    return this.builderForJson(HttpStatus.NOT_FOUND.value(), entity, headers);
  }

  public static notFoundHtml(
    entity?: string,
    headers?: Record<string, unknown>
  ) {
    return this.builderForTextHtml(
      HttpStatus.NOT_FOUND.value(),
      entity,
      headers
    );
  }

  public static internalServerError(
    entity?: string,
    headers?: Record<string, unknown>
  ) {
    return this.builderForTextPlain(
      HttpStatus.INTERNAL_SERVER_ERROR.value(),
      entity,
      headers
    );
  }

  public static internalServerErrorJson(
    entity?: string,
    headers?: Record<string, unknown>
  ) {
    return this.builderForJson(
      HttpStatus.INTERNAL_SERVER_ERROR.value(),
      entity,
      headers
    );
  }

  public static internalServerErrorHtml(
    entity?: string,
    headers?: Record<string, unknown>
  ) {
    return this.builderForTextHtml(
      HttpStatus.INTERNAL_SERVER_ERROR.value(),
      entity,
      headers
    );
  }

  private static builderForTextPlain(
    status: number,
    entity?: unknown,
    headers?: Record<string, unknown>
  ) {
    return this.build(status, this.MEDIA_TYPE_PLAIN, entity, headers);
  }

  private static builderForTextHtml(
    status: number,
    entity?: unknown,
    headers?: Record<string, unknown>
  ) {
    return this.build(status, this.MEDIA_TYPE_HTML, entity, headers);
  }

  private static builderForJson(
    status: number,
    entity?: unknown,
    headers?: Record<string, unknown>
  ) {
    return this.build(status, this.MEDIA_TYPE_JSON, entity, headers);
  }

  private static builderForJwt(
    status: number,
    entity?: unknown,
    headers?: Record<string, unknown>
  ) {
    return this.build(status, this.MEDIA_TYPE_JWT, entity, headers);
  }

  private static build(
    status: number,
    MediaType: string,
    entity?: unknown,
    headers?: Record<string, unknown>
  ) {
    return new Response(JSON.stringify(entity), {
      status,
      headers: {
        'Content-Type': MediaType,
        ...headers,
      },
    });
  }
}
