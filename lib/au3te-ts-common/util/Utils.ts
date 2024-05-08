export class Utils {
  public static toJson(object: Record<string, unknown>): string {
    return JSON.stringify(object);
  }

  public static fromJson(json: string): Record<string, unknown> {
    return JSON.parse(json);
  }
}
