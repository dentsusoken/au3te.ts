// import { readFileSync } from 'node:fs';
import { getProperties } from 'properties-file';
import TypedProperties, { Properties } from './TypedProperties';

enum FileLocation {
  FILESYSTEM,
  CLASSPATH,
}

export default class PropertiesLoader {
  static load(
    file: string,
    locations?: FileLocation[] | FileLocation
  ): TypedProperties | null {
    if (typeof locations === 'undefined') {
      return this.load(file, [FileLocation.FILESYSTEM, FileLocation.CLASSPATH]);
    }

    // if (Array.isArray(locations)) {
    //   let properties: TypedProperties | null = null;
    //   for (const location of locations) {
    //     properties = this.load(file, location);

    //     if (typeof properties !== 'undefined') {
    //       return properties;
    //     }
    //   }
    //   return properties;
    // } else {
    //   let inStream: Buffer | null = null;
    //   try {
    //     inStream = this.open(file, locations);
    //     if (inStream == null) {
    //       return null;
    //     }
    //     const properties = this.loadProperties(inStream);
    //     return new PropertiesWrapper(properties);
    //   } catch (e) {
    //     // Just ignore.
    //   }
    // }
    return null;
  }

  // private static open(file: string, location: FileLocation): Buffer | null {
  //   switch (location) {
  //     case FileLocation.FILESYSTEM:
  //       return this.openFileSystem(file);
  //     // TODO Confirm wheather openClasspath is needed or not in TypeScript.
  //     case FileLocation.CLASSPATH:
  //     default:
  //       return null;
  //   }
  // }

  // private static openFileSystem(file: string): Buffer {
  //   return readFileSync(file);
  // }

  // private static openClasspath(file: string): InputStream {
  //   // Do nothing.
  // }

  // private static close(inStream: Buffer | null): void {
  //   // Do nothing.
  // }

  private static loadProperties(inStream: Buffer): Properties {
    return getProperties(inStream);
  }
}
