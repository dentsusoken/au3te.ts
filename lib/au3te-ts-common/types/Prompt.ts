export class Prompt {
  private static readonly _values: Prompt[] = [];

  static readonly NONE = new Prompt(0, 'none');
  static readonly LOGIN = new Prompt(1, 'login');
  static readonly CONSENT = new Prompt(2, 'consent');
  static readonly SELECT_ACCOUNT = new Prompt(3, 'select_account');
  static readonly CREATE = new Prompt(4, 'create');
  private readonly mValue: number;
  private readonly mString: string;

  private constructor(readonly value: number, readonly string: string) {
    this.mValue = value;
    this.mString = string;
    Prompt._values.push(this);
  }

  public getValue(): number {
    return this.mValue;
  }

  public toString(): string {
    return this.mString;
  }

  public static getByValue(value: number): Prompt | undefined {
    return Prompt._values.find((v) => v.value === value);
  }

  public static parse(prompt: string): Prompt | undefined {
    return Prompt._values.find((v) => v.mString === prompt);
  }

  // TODO confirm this method is correct
  public static toBit(value: Set<Prompt>): number {
    return Array.from(value).reduce((acc, v) => acc | v.value, 0);
  }

  // TODO confirm this method is correct
  public static toArray(bit: number): Set<Prompt> {
    const result = new Set<Prompt>();
    Prompt._values.forEach((v) => {
      if ((bit & v.value) === v.value) {
        result.add(v);
      }
    });
    return result;
  }
}
