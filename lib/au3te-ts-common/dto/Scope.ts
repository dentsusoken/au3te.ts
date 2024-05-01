export class Scope {
  private name?: string;
  public getName(): string | undefined {
    return this.name;
  }
  public setName(name: string): Scope {
    this.name = name;
    return this;
  }
}
