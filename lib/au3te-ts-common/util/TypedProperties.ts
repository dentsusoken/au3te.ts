export type Properties = { [key: string]: string };

export abstract class TypedProperties {
  protected constructor() {}

  public getString(key: string): string;
  public getString(key: string, defaultValue: string): string;
  public getString(key: string, defaultValue: string = ''): string {
    if (typeof defaultValue === 'undefined') {
      return this.getString(key, '');
    }
    return this.getString(key, defaultValue);
  }
}
