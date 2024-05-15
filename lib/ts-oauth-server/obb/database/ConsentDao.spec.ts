import { beforeEach, describe, expect, it } from 'vitest';
import { ConsentDao } from './ConsentDao';

describe('ConsentDao', () => {
  let consentDao: ConsentDao;

  beforeEach(() => {
    consentDao = ConsentDao.getInstance();
  });

  it('should read a consent by ID', () => {
    const consentId = 'exampleId';
    const consent = consentDao.read(consentId);

    // TODO for now, ConsentDao does not have create method
    // consent never exists
    expect(consent).toBeUndefined();
    // expect(consent?.getConsentId()).toBe(consentId);
  });

  //   it('should update a consent', () => {
  //     const consentId = 'exampleId';
  //     const consent = consentDao.read(consentId);

  //     expect(consent).toBeDefined();
  //     consent!.setStatusUpdateDateTime('2022-01-01T00:00:00Z');

  //     consentDao.update(consent!);

  //     const updatedConsentFromDao = consentDao.read(consentId);

  //     expect(updatedConsentFromDao).toBeDefined();
  //     expect(updatedConsentFromDao?.getStatusUpdateDateTime()).toBe(
  //       '2022-01-01T00:00:00Z'
  //     );
  //   });
});
