import { readFileSync } from 'node:fs';
import { getProperties } from 'properties-file';
import { PropertiesWrapper } from './PropertiesWrapper';
import { Properties, TypedProperties } from './TypedProperties';

enum FileLocation {
  FILESYSTEM,
  CLASSPATH,
}

export class PropertiesLoader {
  static load(
    file: string,
    locations?: FileLocation[] | FileLocation
  ): TypedProperties | undefined {
    if (typeof locations === 'undefined') {
      return this.load(file, [FileLocation.FILESYSTEM, FileLocation.CLASSPATH]);
    }

    if (Array.isArray(locations)) {
      let properties: TypedProperties | undefined = undefined;
      for (const location of locations) {
        properties = this.load(file, location);

        if (typeof properties !== 'undefined') {
          return properties;
        }
      }
      return properties;
    } else {
      let inStream: Buffer | undefined = undefined;
      try {
        inStream = this.open(file, locations);
        if (inStream == undefined) {
          return undefined;
        }
        const properties = this.loadProperties(inStream);
        return new PropertiesWrapper(properties);
      } catch (e) {
        // Just ignore.
      }
    }
    return undefined;
  }

  private static open(
    file: string,
    location: FileLocation
  ): Buffer | undefined {
    switch (location) {
      case FileLocation.FILESYSTEM:
        return this.openFileSystem(file);
      // TODO Confirm wheather openClasspath is needed or not in TypeScript.
      case FileLocation.CLASSPATH:
      default:
        return undefined;
    }
  }

  private static openFileSystem(file: string): Buffer {
    return readFileSync(file);
  }

  private static loadProperties(inStream: Buffer): Properties {
    return getProperties(inStream);
  }
}
