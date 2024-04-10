class PropertiesLoader {
  static load(file: string): TypedProperties {
    return this.load(file, [FileLocation.FILESYSTEM, FileLocation.CLASSPATH]);
  }

  static load(file: string, locations: FileLocation[]): TypedProperties {
    if (file == null) {
      throw new Error('file is null.');
    }

    if (locations == null) {
      throw new Error('locations is null.');
    }

    let properties: TypedProperties | null = null;

    for (const location of locations) {
      if (location == null) {
        continue;
      }

      properties = this.load(file, location);

      if (properties != null) {
        break;
      }
    }

    return properties;
  }

  static load(file: string, location: FileLocation): TypedProperties {
    if (file == null) {
      throw new Error('file is null.');
    }

    if (location == null) {
      throw new Error('location is null.');
    }

    let inStream: InputStream | null = null;

    try {
      inStream = this.open(file, location);

      if (inStream == null) {
        return null;
      }

      const properties = this.loadProperties(inStream);

      return new PropertiesWrapper(properties);
    } catch (e) {
      return null;
    } finally {
      this.close(inStream);
    }
  }

  private static open(
    file: string,
    location: FileLocation
  ): InputStream | null {
    switch (location) {
      case FileLocation.FILESYSTEM:
        return this.openFileSystem(file);

      case FileLocation.CLASSPATH:
        return this.openClasspath(file);

      default:
        return null;
    }
  }

  private static openFileSystem(file: string): InputStream {
    // Implement the logic to open a file from the file system.
    // This implementation is specific to your use case.
    // You can use the 'fs' module in Node.js to open a file from the file system.
    // Example: fs.createReadStream(file);
  }

  private static openClasspath(file: string): InputStream {
    // Implement the logic to open a file from the classpath.
    // This implementation is specific to your use case.
    // You can use the 'fs' module in Node.js to open a file from the classpath.
    // Example: fs.createReadStream(file);
  }

  private static close(inStream: InputStream): void {
    if (inStream == null) {
      return;
    }

    try {
      inStream.close();
    } catch (e) {
      // Just ignore.
    }
  }

  private static loadProperties(inStream: InputStream): Properties {
    // Implement the logic to load properties from the input stream.
    // This implementation is specific to your use case.
    // You can use the 'properties' module in Node.js to load properties from the input stream.
    // Example: properties.parse(inStream);
  }
}

enum FileLocation {
  FILESYSTEM,
  CLASSPATH,
}

interface TypedProperties {
  // Define the properties interface according to your use case.
  // This interface is specific to your use case.
}
