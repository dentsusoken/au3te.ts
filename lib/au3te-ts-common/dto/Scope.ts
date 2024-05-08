export class Scope {
  private name?: string;
  private description?: string;
  public getName(): string | undefined {
    return this.name;
  }
  public setName(name: string): Scope {
    this.name = name;
    return this;
  }
  public getDescription(): string | undefined {
    return this.description;
  }
  public setDescription(description: string): Scope {
    this.description = description;
    return this;
  }
}
