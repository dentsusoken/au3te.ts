export class DynamicScope {
  private name?: string;
  private value?: string;

  constructor(name?: string, value?: string) {
    this.name = name;
    this.value = value;
  }

  public getName(): string | undefined {
    return this.name;
  }
  public setName(name: string): DynamicScope {
    this.name = name;
    return this;
  }
  public getValue(): string | undefined {
    return this.value;
  }
  public setValue(value: string): DynamicScope {
    this.value = value;
    return this;
  }
}
