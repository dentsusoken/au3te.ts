export class Utils {
  public static toJson(object: Record<string, unknown>): string {
    return JSON.stringify(object);
  }
}
