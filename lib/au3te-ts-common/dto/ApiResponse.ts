export default class ApiResponse {
  private resultCode?: string;
  private resultMessage?: string;

  public getResultCode(): string | undefined {
    return this.resultCode;
  }

  public setResultCode(code: string): void {
    this.resultCode = code;
  }

  public getResultMessage(): string | undefined {
    return this.resultMessage;
  }

  public setResultMessage(message: string): void {
    this.resultMessage = message;
  }
}
