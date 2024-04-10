interface ResponseHeaders {
  [key: string]: string[];
}

class AuthleteApiException extends Error {
  private mStatusCode: number;
  private mStatusMessage: string | null;
  private mResponseBody: string | null;
  private mResponseHeaders: ResponseHeaders | null;

  constructor(
    message?: string,
    statusCode?: number,
    statusMessage?: string,
    responseBody?: string,
    responseHeaders?: ResponseHeaders
  ) {
    super(message);
    this.mStatusCode = statusCode || 0;
    this.mStatusMessage = statusMessage || null;
    this.mResponseBody = responseBody || null;
    this.mResponseHeaders = responseHeaders || null;
  }

  get statusCode(): number {
    return this.mStatusCode;
  }

  get statusMessage(): string | null {
    return this.mStatusMessage;
  }

  get responseBody(): string | null {
    return this.mResponseBody;
  }

  get responseHeaders(): ResponseHeaders | null {
    return this.mResponseHeaders;
  }
}
