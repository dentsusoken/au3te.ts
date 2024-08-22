class SubjectType {
  public static readonly PUBLIC = new SubjectType(0, 'public');
  public static readonly PAIRWISE = new SubjectType(2, 'pairwise');

  private constructor(
    private readonly mValue: number,
    private readonly mString: string
  ) {}

  public getValue(): number {
    return this.mValue;
  }

  public toString(): string {
    return this.mString;
  }

  static parse(obj: Record<string, unknown>) {
    if (obj['value']) {
      const value = obj['value'] as number;
      if (value === 0) {
        return SubjectType.PUBLIC;
      } else if (value === 2) {
        return SubjectType.PAIRWISE;
      }
    }
    return;
  }
}
export { SubjectType };
