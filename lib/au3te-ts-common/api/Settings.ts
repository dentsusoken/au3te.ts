/**
 * Settings of AuthleteApi implementation.
 */
export class Settings {
  private connectionTimeout: number;
  private readTimeout: number;

  constructor() {
    this.connectionTimeout = 0;
    this.readTimeout = 0;
  }

  /**
   * Get the timeout value in milliseconds for socket connection.
   * The default value is 0 and it means an infinite timeout.
   *
   * @returns The connection timeout value in milliseconds.
   */
  public getConnectionTimeout(): number {
    return this.connectionTimeout;
  }

  /**
   * Set the timeout value in milliseconds for socket connection.
   * A timeout of zero is interpreted as an infinite timeout.
   *
   * @param timeout The connection timeout value in milliseconds.
   * @returns This object.
   * @throws Error The given timeout value is negative.
   */
  public setConnectionTimeout(timeout: number): Settings {
    if (timeout < 0) {
      throw new Error('timeout value cannot be negative.');
    }

    this.connectionTimeout = timeout;

    return this;
  }

  /**
   * Get the read timeout in milliseconds.
   *
   * @returns The read timeout in milliseconds.
   */
  public getReadTimeout(): number {
    return this.readTimeout;
  }

  /**
   * Set the read timeout in milliseconds.
   * A timeout of zero is interpreted as an infinite timeout.
   *
   * @param timeout The read timeout in milliseconds.
   * @returns This object.
   * @throws Error The given timeout value is negative.
   */
  public setReadTimeout(timeout: number): Settings {
    if (timeout < 0) {
      throw new Error('timeout value cannot be negative.');
    }

    this.readTimeout = timeout;

    return this;
  }
}
