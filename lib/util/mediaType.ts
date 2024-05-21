export class MediaType {
  public static APPLICATION_JSON_TYPE = new MediaType('application/json');
  public static APPLICATION_FORM_URLENCODED = new MediaType(
    'application/x-www-form-urlencoded'
  );
  public static TEXT_HTML_TYPE = new MediaType('text/html');
  public static TEXT_PLAIN_TYPE = new MediaType('text/plain');
  public static APPLICATION_JWT_TYPE = new MediaType('application/jwt');

  private constructor(private readonly type: string) {}

  public value() {
    return this.type;
  }

  public isEquals(type: unknown) {
    if (!type) {
      return false;
    }
    if (this.type === type) {
      return true;
    }

    const mediaTypeOnly = (type as string).split(';')[0];

    if (this.type === mediaTypeOnly) {
      return true;
    }

    return false;
  }

  withCharset(charset: string) {
    return `${this.type};charset=${charset.toLowerCase()}`;
  }
}
