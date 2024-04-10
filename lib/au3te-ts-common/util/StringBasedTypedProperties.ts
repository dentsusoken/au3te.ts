abstract class StringBasedTypedProperties extends TypedProperties {
  protected constructor() {
    super();
  }

  public getBoolean(key: string, defaultValue: boolean): boolean {
    if (key === null) {
      return defaultValue;
    }

    const value: string = this.getString(key, null);

    if (value === null) {
      return defaultValue;
    }

    return Boolean(value);
  }

  public getFloat(key: string, defaultValue: number): number {
    if (key === null) {
      return defaultValue;
    }

    const value: string = this.getString(key, null);

    if (value === null) {
      return defaultValue;
    }

    try {
      return parseFloat(value);
    } catch (e) {
      return defaultValue;
    }
  }

  public getInt(key: string, defaultValue: number): number {
    if (key === null) {
      return defaultValue;
    }

    const value: string = this.getString(key, null);

    if (value === null) {
      return defaultValue;
    }

    try {
      return parseInt(value);
    } catch (e) {
      return defaultValue;
    }
  }

  public getLong(key: string, defaultValue: number): number {
    if (key === null) {
      return defaultValue;
    }

    const value: string = this.getString(key, null);

    if (value === null) {
      return defaultValue;
    }

    try {
      return parseInt(value);
    } catch (e) {
      return defaultValue;
    }
  }

  public setBoolean(key: string, value: boolean): void {
    if (key === null) {
      return;
    }

    this.setString(key, String(value));
  }

  public setFloat(key: string, value: number): void {
    if (key === null) {
      return;
    }

    this.setString(key, String(value));
  }

  public setInt(key: string, value: number): void {
    if (key === null) {
      return;
    }

    this.setString(key, String(value));
  }

  public setLong(key: string, value: number): void {
    if (key === null) {
      return;
    }

    this.setString(key, String(value));
  }

  public abstract clear(): void;
  public abstract contains(key: string): boolean;
  public abstract getString(key: string, defaultValue: string): string;
  public abstract remove(key: string): void;
  public abstract setString(key: string, value: string): void;
}
