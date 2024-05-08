export class StringArray {
  private array: string[];

  constructor();
  constructor(array: string[]);
  constructor(array?: string[]) {
    this.array = array || [];
  }

  public getArray(): string[] {
    return this.array;
  }

  public setArray(array: string[]): StringArray {
    this.array = array;
    return this;
  }
}
