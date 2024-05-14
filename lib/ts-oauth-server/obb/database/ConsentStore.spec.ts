import { beforeEach, describe, expect, it } from 'vitest';
import { Consent } from '../model/Consent';
import { ConsentStore } from './ConsentStore';

describe('ConsentStore', () => {
  let consentStore: ConsentStore;

  beforeEach(() => {
    consentStore = new ConsentStore();
  });

  it('should remove eldest entry when size exceeds 100', () => {
    // Add 100 entries to the consent store
    for (let i = 0; i < 101; i++) {
      consentStore.set(
        `key${i}`,
        new Consent(
          `consentId${i}`,
          ['permission1', 'permission2'],
          'active',
          '2022-01-01T00:00:00Z',
          '2022-01-01T00:00:00Z',
          '2022-01-01T00:00:00Z',
          1,
          'refreshToken'
        )
      );
    }

    // Add one more entry to exceed the size limit
    consentStore.set(
      'key101',
      new Consent(
        `consentId101`,
        ['permission1', 'permission2'],
        'active',
        '2022-01-01T00:00:00Z',
        '2022-01-01T00:00:00Z',
        '2022-01-01T00:00:00Z',
        1,
        'refreshToken'
      )
    );

    // Verify that the eldest entry has been removed
    expect(consentStore.has('key0')).toBe(false);
  });
});
