export default class Property {
  private key: string;
  private value: string;
  private hidden: boolean;

  public constructor();
  public constructor(args: { key: string; value: string });
  public constructor(args: { key: string; value: string; hidden: boolean });
  public constructor(args?: {
    key?: string;
    value?: string;
    hidden?: boolean;
  }) {
    this.key = args ? args.key || '' : '';
    this.value = args ? args.value || '' : '';
    this.hidden = args ? args.hidden || false : false;
  }

  public getKey(): string {
    return this.key;
  }

  public setKey(key: string): Property {
    this.key = key;
    return this;
  }

  public getValue(): string {
    return this.value;
  }

  public setValue(value: string): Property {
    this.value = value;
    return this;
  }

  public isHidden(): boolean {
    return this.hidden;
  }

  public setHidden(hidden: boolean): Property {
    this.hidden = hidden;
    return this;
  }

  public toString(): string {
    return `${this.key}=${this.value}${this.hidden ? ' (hidden)' : ''}`;
  }
}
