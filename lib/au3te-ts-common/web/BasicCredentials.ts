class BasicCredentials {
  private static readonly CHALLENGE_PATTERN = /^Basic *([^ ]+) *$/i;

  private readonly mUserId: string;
  private readonly mPassword: string;
  private mFormatted: string | null;

  constructor(userId: string, password: string) {
    this.mUserId = userId;
    this.mPassword = password;
    this.mFormatted = null;
  }

  getUserId(): string {
    return this.mUserId;
  }

  getPassword(): string {
    return this.mPassword;
  }

  static parse(input: string): BasicCredentials | null {
    if (input === null) {
      return null;
    }

    const matcher = input.match(BasicCredentials.CHALLENGE_PATTERN);

    if (!matcher) {
      return new BasicCredentials(null, null);
    }

    const encoded = matcher[1];
    const decoded = Buffer.from(encoded, 'base64').toString('utf-8');
    const credentials = decoded.split(':', 2);
    let userId: string | null = null;
    let password: string | null = null;

    switch (credentials.length) {
      case 2:
        password = credentials[1];
      // FALLTHROUGH

      case 1:
        userId = credentials[0];
    }

    return new BasicCredentials(userId, password);
  }

  private static createString(bytes: Uint8Array): string {
    return new TextDecoder().decode(bytes);
  }

  format(): string {
    if (this.mFormatted !== null) {
      return this.mFormatted;
    }

    const credentials = `${this.mUserId ?? ''}:${this.mPassword ?? ''}`;
    const credentialsBytes = new TextEncoder().encode(credentials);
    const encoded = Buffer.from(credentialsBytes).toString('base64');
    this.mFormatted = `Basic ${encoded}`;

    return this.mFormatted;
  }
}
