export class BearerToken {
  private static readonly CHALLENGE_PATTERN = /^Bearer *([^ ]+) *$/i;

  private constructor() {}

  public static parse(input: string): string | undefined {
    if (!input) {
      return;
    }
    const matcher = this.CHALLENGE_PATTERN.exec(input);
    if (matcher) {
      return matcher[1];
    } else {
      return this.extractFromFormParameters(input);
    }
  }

  private static extractFromFormParameters(input: string): string | undefined {
    for (const parameter of input.split('&')) {
      const pair: string[] = parameter.split('=', 2);

      if (!pair || pair.length !== 2 || pair[1].length === 0) {
        continue;
      }

      if (pair[0] !== 'access_token') {
        continue;
      }

      try {
        return decodeURIComponent(pair[1]);
      } catch (_) {
        return;
      }
    }
    return;
  }
}
