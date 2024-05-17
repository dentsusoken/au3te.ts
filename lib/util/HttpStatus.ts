export class HttpStatus {
  public static ACCEPTED = new HttpStatus(202);
  public static BAD_GATEWAY = new HttpStatus(502);
  public static BAD_REQUEST = new HttpStatus(400);
  public static CONFLICT = new HttpStatus(409);
  public static CREATED = new HttpStatus(201);
  public static EXPECTATION_FAILED = new HttpStatus(417);
  public static FORBIDDEN = new HttpStatus(403);
  public static FOUND = new HttpStatus(302);
  public static GATEWAY_TIMEOUT = new HttpStatus(504);
  public static GONE = new HttpStatus(410);
  public static HTTP_VERSION_NOT_SUPPORTED = new HttpStatus(505);
  public static INTERNAL_SERVER_ERROR = new HttpStatus(500);
  public static LENGTH_REQUIRED = new HttpStatus(411);
  public static METHOD_NOT_ALLOWED = new HttpStatus(405);
  public static MOVED_PERMANENTLY = new HttpStatus(301);
  public static NO_CONTENT = new HttpStatus(204);
  public static NOT_ACCEPTABLE = new HttpStatus(406);
  public static NOT_FOUND = new HttpStatus(404);
  public static NOT_IMPLEMENTED = new HttpStatus(501);
  public static NOT_MODIFIED = new HttpStatus(304);
  public static OK = new HttpStatus(200);
  public static PARTIAL_CONTENT = new HttpStatus(206);
  public static PAYMENT_REQUIRED = new HttpStatus(402);
  public static PRECONDITION_FAILED = new HttpStatus(412);
  public static PROXY_AUTHENTICATION_REQUIRED = new HttpStatus(407);
  public static REQUEST_ENTITY_TOO_LARGE = new HttpStatus(413);
  public static REQUEST_TIMEOUT = new HttpStatus(408);
  public static REQUEST_URI_TOO_LONG = new HttpStatus(414);
  public static REQUESTED_RANGE_NOT_SATISFIABLE = new HttpStatus(416);
  public static RESET_CONTENT = new HttpStatus(205);
  public static SEE_OTHER = new HttpStatus(303);
  public static SERVICE_UNAVAILABLE = new HttpStatus(503);
  public static TEMPORARY_REDIRECT = new HttpStatus(307);
  public static UNAUTHORIZED = new HttpStatus(401);
  public static UNSUPPORTED_MEDIA_TYPE = new HttpStatus(415);
  public static USE_PROXY = new HttpStatus(305);

  private constructor(private readonly statusCode: number) {}

  public value(): number {
    return this.statusCode;
  }

  public isEquals(statusCode: number): boolean {
    return this.statusCode === statusCode;
  }

  public static from(statusCode: number): HttpStatus | undefined {
    const statusList = [
      HttpStatus.OK,
      HttpStatus.CREATED,
      HttpStatus.NO_CONTENT,
      HttpStatus.FOUND,
      HttpStatus.BAD_REQUEST,
      HttpStatus.UNAUTHORIZED,
      HttpStatus.FORBIDDEN,
      HttpStatus.NOT_FOUND,
      HttpStatus.REQUEST_ENTITY_TOO_LARGE,
      HttpStatus.INTERNAL_SERVER_ERROR,
    ];

    return statusList.find((status) => status.isEquals(statusCode));
  }
}
