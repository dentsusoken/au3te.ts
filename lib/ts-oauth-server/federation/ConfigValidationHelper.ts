export class ConfigValidationHelper {
  public static lack(key: string): Error {
    return new Error(
      `The ID federation configuration lacks '${key}' or its value is empty.`
    );
  }

  public static ensureNotEmpty(key: string, value: unknown): void {
    if (
      !value ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (Array.isArray(value) && value.length === 0)
    ) {
      throw ConfigValidationHelper.lack(key);
    }
  }

  public static ensureUri(key: string, value: string): void {
    const regex =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#()?&//=]*)/g;
    if (!value.match(regex)) {
      throw new Error(
        `The value of '${key}' in the federation configuration is not a valid URI.`
      );
    }
  }
}
