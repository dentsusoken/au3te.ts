export class AuthorizationRequest {
  private parameters?: string;

  public getParameters(): string | undefined {
    return this.parameters;
  }
  public setParameters(parameters: string): AuthorizationRequest {
    this.parameters = parameters;
    return this;
  }
}
