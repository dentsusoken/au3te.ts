class URLCoder {
  static encode(input: string): string {
    try {
      return encodeURIComponent(input);
    } catch (e) {
      // This never happens.
      return input;
    }
  }

  static decode(input: string): string {
    try {
      return decodeURIComponent(input);
    } catch (e) {
      // This never happens.
      return input;
    }
  }

  static formUrlEncode(parameters: Map<string, any>): string | null {
    if (parameters == null) {
      return null;
    }

    let sb = '';

    for (const [key, values] of parameters.entries()) {
      if (Array.isArray(values)) {
        values = values.map((value) => String(value));
      }

      this.appendParameters(sb, key, values);
    }

    if (sb.length !== 0) {
      // Drop the last '&'.
      sb = sb.slice(0, -1);
    }

    return sb;
  }

  private static appendParameters(
    sb: string,
    key: string,
    values: string[]
  ): void {
    if (key == null || key.length === 0) {
      return;
    }

    key = this.encode(key);

    if (values == null || values.length === 0) {
      sb += `${key}&`;
      return;
    }

    for (const value of values) {
      sb += key;

      if (value != null && value.length !== 0) {
        sb += `=${this.encode(value)}`;
      }

      sb += '&';
    }
  }
}
