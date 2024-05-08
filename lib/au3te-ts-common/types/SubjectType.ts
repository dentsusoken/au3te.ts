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
}
export { SubjectType };
