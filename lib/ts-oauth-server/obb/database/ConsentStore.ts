import { Consent } from '../model/Consent';

export class ConsentStore extends Map<string, Consent> {
  set(key: string, value: Consent): this {
    if (this.removeEldestEntry()) {
      this.delete(this.entries().next().value[0]);
    }
    return super.set(key, value);
  }

  protected removeEldestEntry(): boolean {
    return this.size > 100;
  }
}
