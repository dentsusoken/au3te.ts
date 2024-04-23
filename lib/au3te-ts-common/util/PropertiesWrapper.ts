import StringBasedTypedProperties from './StringBasedTypedProperties';
import { Properties } from './TypedProperties';

export default class PropertiesWrapper extends StringBasedTypedProperties {
  private properties: Properties;

  constructor(properties: Properties) {
    // TODO Confirm that this is the correct way to check for an empty object
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
