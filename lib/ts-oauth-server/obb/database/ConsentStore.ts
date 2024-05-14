import { Consent } from '../model/Consent';

export class ConsentStore extends Map<string, Consent> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected removeEldestEntry(_eldest: Map<string, Consent>): boolean {
    return this.size > 100;
  }
}
