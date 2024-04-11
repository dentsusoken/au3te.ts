interface ResponseHeaders {
  [key: string]: string[];
}
// TODO implment this class
export default class AuthleteApiException extends Error {
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

  getStatusCode(): number {
    return this.mStatusCode;
  }

  getStatusMessage(): string | null {
    return this.mStatusMessage;
  }

  getResponseBody(): string | null {
    return this.mResponseBody;
  }

  getResponseHeaders(): ResponseHeaders | null {
    return this.mResponseHeaders;
  }
}
