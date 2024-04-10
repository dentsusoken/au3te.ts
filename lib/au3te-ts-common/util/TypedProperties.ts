abstract class TypedProperties {
  protected constructor() {}

  public abstract contains(key: string): boolean;

  public containsEnum(key: Enum): boolean {
    return this.contains(key.name);
  }

  public abstract getBoolean(key: string, defaultValue: boolean): boolean;

  public get(key: string, defaultValue: boolean): boolean {
    return this.getBoolean(key, defaultValue);
  }

  public getBooleanEnum(key: Enum, defaultValue: boolean): boolean {
    if (key == null) {
      return defaultValue;
    }

    return this.getBoolean(key.name, defaultValue);
  }

  public getEnum(key: Enum, defaultValue: boolean): boolean {
    return this.getBooleanEnum(key, defaultValue);
  }

  public getBooleanEnumValue(key: Enum): boolean {
    if (key == null) {
      return false;
    }

    return this.getBoolean(key.name, false);
  }

  public getEnumValue(key: Enum): boolean {
    return this.getBooleanEnumValue(key);
  }

  public abstract getFloat(key: string, defaultValue: number): number;

  public get(key: string, defaultValue: number): number {
    return this.getFloat(key, defaultValue);
  }

  public getFloatEnum(key: Enum, defaultValue: number): number {
    if (key == null) {
      return defaultValue;
    }

    return this.getFloat(key.name, defaultValue);
  }

  public getEnum(key: Enum, defaultValue: number): number {
    return this.getFloatEnum(key, defaultValue);
  }

  public getFloatEnumValue(key: Enum): number {
    if (key == null) {
      return 0.0;
    }

    return this.getFloat(key.name, 0.0);
  }

  public getEnumValue(key: Enum): number {
    return this.getFloatEnumValue(key);
  }

  public abstract getInt(key: string, defaultValue: number): number;

  public get(key: string, defaultValue: number): number {
    return this.getInt(key, defaultValue);
  }

  public getIntEnum(key: Enum, defaultValue: number): number {
    if (key == null) {
      return defaultValue;
    }

    return this.getInt(key.name, defaultValue);
  }

  public getEnum(key: Enum, defaultValue: number): number {
    return this.getIntEnum(key, defaultValue);
  }

  public getIntEnumValue(key: Enum): number {
    if (key == null) {
      return 0;
    }

    return this.getInt(key.name, 0);
  }

  public getEnumValue(key: Enum): number {
    return this.getIntEnumValue(key);
  }

  public abstract getLong(key: string, defaultValue: number): number;

  public get(key: string, defaultValue: number): number {
    return this.getLong(key, defaultValue);
  }

  public getLongEnum(key: Enum, defaultValue: number): number {
    if (key == null) {
      return defaultValue;
    }

    return this.getLong(key.name, defaultValue);
  }

  public getEnum(key: Enum, defaultValue: number): number {
    return this.getLongEnum(key, defaultValue);
  }

  public getLongEnumValue(key: Enum): number {
    if (key == null) {
      return 0;
    }

    return this.getLong(key.name, 0);
  }

  public getEnumValue(key: Enum): number {
    return this.getLongEnumValue(key);
  }

  public abstract getEnum<TEnum extends Enum<TEnum>>(
    key: string,
    enumClass: TEnum,
    defaultValue: TEnum
  ): TEnum;

  public getEnum<TEnum extends Enum<TEnum>>(
    key: string,
    defaultValue: TEnum
  ): TEnum {
    return this.getEnum(key, defaultValue);
  }

  public get<TEnum extends Enum<TEnum>>(
    key: string,
    enumClass: TEnum,
    defaultValue: TEnum
  ): TEnum {
    return this.getEnum(key, enumClass, defaultValue);
  }

  public get<TEnum extends Enum<TEnum>>(
    key: string,
    defaultValue: TEnum
  ): TEnum {
    return this.getEnum(key, defaultValue);
  }

  public getEnum<TEnum extends Enum<TEnum>>(
    key: Enum,
    enumClass: TEnum,
    defaultValue: TEnum
  ): TEnum {
    if (key == null) {
      return defaultValue;
    }

    return this.getEnum(key.name, enumClass, defaultValue);
  }

  public getEnum<TEnum extends Enum<TEnum>>(
    key: Enum,
    defaultValue: TEnum
  ): TEnum {
    return this.getEnum(key, defaultValue);
  }

  public get<TEnum extends Enum<TEnum>>(
    key: Enum,
    enumClass: TEnum,
    defaultValue: TEnum
  ): TEnum {
    return this.getEnum(key, enumClass, defaultValue);
  }

  public get<TEnum extends Enum<TEnum>>(key: Enum, defaultValue: TEnum): TEnum {
    return this.getEnum(key, defaultValue);
  }

  public getEnumValue<TEnum extends Enum<TEnum>>(
    key: Enum,
    enumClass: TEnum
  ): TEnum {
    if (key == null) {
      return null;
    }

    return this.getEnum(key.name, enumClass);
  }

  public abstract getString(key: string, defaultValue: string): string;

  public get(key: string, defaultValue: string): string {
    return this.getString(key, defaultValue);
  }

  public getStringEnum(key: Enum, defaultValue: string): string {
    if (key == null) {
      return defaultValue;
    }

    return this.getString(key.name, defaultValue);
  }

  public getEnum(key: Enum, defaultValue: string): string {
    return this.getStringEnum(key, defaultValue);
  }

  public getStringEnumValue(key: Enum): string {
    if (key == null) {
      return null;
    }

    return this.getString(key.name);
  }

  public getEnumValue(key: Enum): string {
    return this.getStringEnumValue(key);
  }

  public abstract setBoolean(key: string, value: boolean): void;

  public set(key: string, value: boolean): void {
    this.setBoolean(key, value);
  }

  public setBooleanEnum(key: Enum, value: boolean): void {
    if (key == null) {
      return;
    }

    this.setBoolean(key.name, value);
  }

  public setEnum(key: Enum, value: boolean): void {
    this.setBooleanEnum(key, value);
  }

  public abstract setFloat(key: string, value: number): void;

  public set(key: string, value: number): void {
    this.setFloat(key, value);
  }

  public setFloatEnum(key: Enum, value: number): void {
    if (key == null) {
      return;
    }

    this.setFloat(key.name, value);
  }

  public setEnum(key: Enum, value: number): void {
    this.setFloatEnum(key, value);
  }

  public abstract setInt(key: string, value: number): void;

  public set(key: string, value: number): void {
    this.setInt(key, value);
  }

  public setIntEnum(key: Enum, value: number): void {
    if (key == null) {
      return;
    }

    this.setInt(key.name, value);
  }

  public setEnum(key: Enum, value: number): void {
    this.setIntEnum(key, value);
  }

  public abstract setLong(key: string, value: number): void;

  public set(key: string, value: number): void {
    this.setLong(key, value);
  }

  public setLongEnum(key: Enum, value: number): void {
    if (key == null) {
      return;
    }

    this.setLong(key.name, value);
  }

  public setEnum(key: Enum, value: number): void {
    this.setLongEnum(key, value);
  }

  public setEnumValue<TEnum extends Enum<TEnum>>(
    key: string,
    value: TEnum
  ): void {
    this.setString(key, value == null ? null : value.name);
  }

  public set(key: string, value: string): void {
    this.setEnumValue(key, value);
  }

  public setEnumValue<TEnum extends Enum<TEnum>>(
    key: Enum,
    value: TEnum
  ): void {
    if (key == null) {
      return;
    }

    this.setEnumValue(key.name, value);
  }

  public setEnum(key: Enum, value: string): void {
    this.setEnumValue(key, value);
  }

  public abstract setString(key: string, value: string): void;

  public set(key: string, value: string): void {
    this.setString(key, value);
  }

  public setStringEnum(key: Enum, value: string): void {
    if (key == null) {
      return;
    }

    this.setString(key.name, value);
  }

  public setEnum(key: Enum, value: string): void {
    this.setStringEnum(key, value);
  }

  public abstract remove(key: string): void;

  public removeEnum(key: Enum): void {
    if (key == null) {
      return;
    }

    this.remove(key.name);
  }

  public abstract clear(): void;
}
