export class ObbUtils {
  // TODO check this method is correctly implemented
  static formatDate(date: Date): string {
    return new Date(Date.parse(date.toUTCString())).toISOString();
  }
  static formatNow(): string {
    return this.formatDate(new Date());
  }
  static extractConsentScope(scopes: string[]): string | undefined {
    if (!scopes) {
      return;
    }

    for (const scope of scopes) {
      if (!scope) {
        continue;
      }

      if (scope.startsWith('consent:')) {
        return scope;
      }
    }
    return;
  }
}
