class PropertiesWrapper extends StringBasedTypedProperties {
  private properties: Properties;

  constructor(properties: Properties) {
    if (properties == null) {
      throw new Error('properties is null.');
    }

    this.properties = properties;
  }

  contains(key: string): boolean {
    return this.properties.hasOwnProperty(key);
  }

  getString(key: string, defaultValue: string): string {
    return this.properties[key] || defaultValue;
  }

  setString(key: string, value: string): void {
    this.properties[key] = value;
  }

  remove(key: string): void {
    delete this.properties[key];
  }

  clear(): void {
    this.properties = {};
  }
}
