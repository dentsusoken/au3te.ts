import { StringBasedTypedProperties } from './StringBasedTypedProperties';
import { Properties } from './TypedProperties';

export class PropertiesWrapper extends StringBasedTypedProperties {
  private properties: Properties;

  constructor(properties: Properties) {
    if (Object.keys(properties).length === 0) {
      throw new Error('properties must not be empty.');
    }
    super();
    this.properties = properties;
  }

  public getString(key: string, defaultValue: string = ''): string {
    return this.properties[key] || defaultValue;
  }
}
