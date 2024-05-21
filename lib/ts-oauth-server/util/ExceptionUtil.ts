// TODO Crdential Endpoint

import { WebApplicationException } from '../../util/WebApplicationException';
import { ResponseUtil } from './ResponseUtil';

export class ExceptionUtil {
  public static badRequestExceptionJson(
    entity?: string,
    headers?: Record<string, unknown>
  ) {
    return new WebApplicationException(
      ResponseUtil.badRequestJson(entity, headers),
      entity
    );
  }

  public static unauthorizedException(
    entity?: string,
    challenge?: string,
    headers?: Record<string, unknown>
  ) {
    return new WebApplicationException(
      ResponseUtil.unauthorized(entity, challenge, headers),
      entity
    );
  }
  public static forbiddenExceptionJson(
    entity?: string,
    headers?: Record<string, unknown>
  ) {
    return new WebApplicationException(
      ResponseUtil.forbiddenJson(entity, headers),
      entity
    );
  }
  public static internalServerErrorExceptionJson(
    entity?: string,
    headers?: Record<string, unknown>
  ) {
    return new WebApplicationException(
      ResponseUtil.internalServerErrorJson(entity, headers),
      entity
    );
  }
}
