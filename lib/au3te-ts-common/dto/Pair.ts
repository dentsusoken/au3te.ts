export class Pair {
  private key?: string;
  private value?: string;
  constructor(key?: string, value?: string) {
    this.key = key;
    this.value = value;
  }
  public getKey(): string | undefined {
    return this.key;
  }
  public setKey(key: string): Pair {
    this.key = key;
    return this;
  }
  public getValue(): string | undefined {
    return this.value;
  }
  public setValue(value: string): Pair {
    this.value = value;
    return this;
  }
}
