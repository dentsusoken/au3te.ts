export class DpopToken {
  private static readonly CHALLENGE_PATTERN = /^DPoP *([^ ]+) *$/i;

  private constructor() {}

  public static parse(input: string): string | undefined {
    if (!input) {
      return;
    }
    const matcher = this.CHALLENGE_PATTERN.exec(input);
    if (matcher) {
      return matcher[1];
    } else {
      return;
    }
  }
}
