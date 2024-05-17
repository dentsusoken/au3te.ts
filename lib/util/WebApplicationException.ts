export class WebApplicationException extends Error {
  public readonly name = 'WebApplicationException';
  private response: Response;

  constructor(response: Response, entity?: string) {
    super(entity);
    this.response = response;
  }

  getResponse() {
    return this.response;
  }
}
