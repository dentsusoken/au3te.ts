type ResponseHeaders = Record<string, unknown>;

export class AuthleteApiException extends Error {
  private mStatusCode: number;
  private mStatusMessage: string | undefined;
  private mResponseBody: string | undefined;
  private mResponseHeaders: ResponseHeaders | undefined;

  constructor(
    message?: string,
    statusCode?: number,
    statusMessage?: string,
    responseBody?: string,
    responseHeaders?: ResponseHeaders
  ) {
    super(message);
    this.mStatusCode = statusCode || 0;
    this.mStatusMessage = statusMessage || undefined;
    this.mResponseBody = responseBody || undefined;
    this.mResponseHeaders = responseHeaders || undefined;
  }

  getStatusCode(): number {
    return this.mStatusCode;
  }

  getStatusMessage(): string | undefined {
    return this.mStatusMessage;
  }

  getResponseBody(): string | undefined {
    return this.mResponseBody;
  }

  getResponseHeaders(): ResponseHeaders | undefined {
    return this.mResponseHeaders;
  }
}
