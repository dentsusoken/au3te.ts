import { Consent } from '../model/Consent';
import { ObbUtils } from '../util/ObbUtils';
import { ConsentStore } from './ConsentStore';

export class ConsentDao {
  private static readonly sInstance: ConsentDao = new ConsentDao('example');

  //   private readonly mNamespace: string;
  private readonly mStore: ConsentStore;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private constructor(_namespace: string) {
    // this.mNamespace = namespace;
    this.mStore = new ConsentStore();
  }

  private getStore(): ConsentStore {
    return this.mStore;
  }

  read(consentId: string): Consent | undefined {
    return this.getStore().get(consentId);
  }

  update(consent: Consent): void {
    consent.setStatusUpdateDateTime(ObbUtils.formatNow());

    this.getStore().set(consent.getConsentId(), consent);
  }

  static getInstance(): ConsentDao {
    return ConsentDao.sInstance;
  }
}
