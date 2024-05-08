import { describe, expect, test } from 'vitest';
import { AuthorizationResponse } from '../au3te-ts-common/dto/AuthorizationResponse';
import { AuthzDetails } from '../au3te-ts-common/dto/AuthzDetails';
import { AuthzDetailsElement } from '../au3te-ts-common/dto/AuthzDetailsElement';
import { Pair } from '../au3te-ts-common/dto/Pair';
import { Scope } from '../au3te-ts-common/dto/Scope';
import { UserDao } from '../ts-oauth-server/db/UserDao';
import { AuthorizationPageModel } from './AuthorizationPageModel';

describe('AuthorizationPageModel', () => {
  test('constructor', () => {
    // Test constructor with info and user
    const info = new AuthorizationResponse();
    const user = UserDao.getByCredentials('inga', 'inga');
    const model = new AuthorizationPageModel(info, user);
    expect(model.isOldIdaFormatUsed()).toBeUndefined();

    // Test constructor with info only
    const model2 = new AuthorizationPageModel(info);
    expect(model2.isOldIdaFormatUsed()).toBeUndefined();

    // Test constructor without info and user
    const model3 = new AuthorizationPageModel();
    expect(model3.isOldIdaFormatUsed()).toBeUndefined();
  });

  test('computeScopes', () => {
    // Test computeScopes with undefined scopes and dynamicScopes
    const info = new AuthorizationResponse();
    const model = new AuthorizationPageModel();
    const scopes = model.computeScopes(info);
    expect(scopes).toEqual([]);

    // Test computeScopes with defined scopes and undefined dynamicScopes
    const info2 = new AuthorizationResponse();
    info2.setScopes([
      new Scope().setName('scope1'),
      new Scope().setName('scope2'),
    ]);
    const model2 = new AuthorizationPageModel();
    const scopes2 = model2.computeScopes(info2);
    expect(scopes2).toEqual([
      new Scope().setName('scope1'),
      new Scope().setName('scope2'),
    ]);
  });

  test('isOldIdaFormatUsed', () => {
    // Test isOldIdaFormatUsed when oldIdaFormatUsed is undefined
    const model = new AuthorizationPageModel();
    expect(model.isOldIdaFormatUsed()).toBeUndefined();

    // Test isOldIdaFormatUsed when oldIdaFormatUsed is true
    model['oldIdaFormatUsed'] = true;
    expect(model.isOldIdaFormatUsed()).toBe(true);

    // Test isOldIdaFormatUsed when oldIdaFormatUsed is false
    model['oldIdaFormatUsed'] = false;
    expect(model.isOldIdaFormatUsed()).toBe(false);
  });

  test('computeLoginId', () => {
    // Test computeLoginId when subject is defined
    const info = new AuthorizationResponse();
    info.setSubject('user123');
    const model = new AuthorizationPageModel();
    const loginId = model.computeLoginId(info);
    expect(loginId).toBe('user123');

    // Test computeLoginId when subject is undefined and loginHint is defined
    const info2 = new AuthorizationResponse();
    info2.setLoginHint('user456');
    const model2 = new AuthorizationPageModel();
    const loginId2 = model2.computeLoginId(info2);
    expect(loginId2).toBe('user456');

    // Test computeLoginId when subject and loginHint are undefined
    const info3 = new AuthorizationResponse();
    const model3 = new AuthorizationPageModel();
    const loginId3 = model3.computeLoginId(info3);
    expect(loginId3).toBe('');
  });

  test('computeLoginIdReadOnly', () => {
    // Test computeLoginIdReadOnly when subject is defined
    const info = new AuthorizationResponse();
    info.setSubject('user123');
    const model = new AuthorizationPageModel();
    const loginIdReadOnly = model.computeLoginIdReadOnly(info);
    expect(loginIdReadOnly).toBe('readonly');

    // Test computeLoginIdReadOnly when subject is undefined
    const info2 = new AuthorizationResponse();
    const model2 = new AuthorizationPageModel();
    const loginIdReadOnly2 = model2.computeLoginIdReadOnly(info2);
    expect(loginIdReadOnly2).toBeUndefined();
  });

  test('toString', () => {
    // Test toString when details is undefined
    const model = new AuthorizationPageModel();
    const str = model.toString();
    expect(str).toBeUndefined();

    // Test toString when details is defined but elements is undefined
    const details = new AuthzDetails();
    const model2 = new AuthorizationPageModel();
    const str2 = model2.toString(details);
    expect(str2).toBeUndefined();

    // Test toString when details is defined and elements is an empty array
    const details2 = new AuthzDetails();
    details2.setElements([]);
    const model3 = new AuthorizationPageModel();
    const str3 = model3.toString(details2);
    expect(str3).toBeUndefined();

    // Test toString when details is defined and elements is a non-empty array
    const element = new AuthzDetailsElement();
    const details3 = new AuthzDetails();
    details3.setElements([element]);
    const model4 = new AuthorizationPageModel();
    const str4 = model4.toString(details3);
    expect(str4).toBe(JSON.stringify([element]));
  });

  test('setupIdentityAssurance', () => {
    // Test setupIdentityAssurance when purpose is undefined
    const info = new AuthorizationResponse();
    const model = new AuthorizationPageModel();
    model.setupIdentityAssurance(info);
    expect(model['purpose']).toBeUndefined();
    expect(model['verifiedClaimsForIdToken']).toBeUndefined();
    expect(model['verifiedClaimsForUserInfo']).toBeUndefined();

    // Test setupIdentityAssurance when purpose is defined
    const info2 = new AuthorizationResponse();
    info2.setPurpose('Some purpose');
    const model2 = new AuthorizationPageModel();
    model2.setupIdentityAssurance(info2);
    expect(model2['purpose']).toBe('Some purpose');
    expect(model2['verifiedClaimsForIdToken']).toBeUndefined();
    expect(model2['verifiedClaimsForUserInfo']).toBeUndefined();
  });

  test('computeIdentityAssuranceRequired', () => {
    // Test computeIdentityAssuranceRequired when purpose is undefined
    const model = new AuthorizationPageModel();
    const required = model.computeIdentityAssuranceRequired();
    expect(required).toBe(true);

    // Test computeIdentityAssuranceRequired when purpose is defined and other properties are undefined
    const model2 = new AuthorizationPageModel();
    model2['purpose'] = 'Some purpose';
    const required2 = model2.computeIdentityAssuranceRequired();
    expect(required2).toBe(true);

    // Test computeIdentityAssuranceRequired when purpose is defined and verifiedClaimsForIdToken is defined
    const model3 = new AuthorizationPageModel();
    model3['purpose'] = 'Some purpose';
    model3['verifiedClaimsForIdToken'] = [new Pair()];
    const required3 = model3.computeIdentityAssuranceRequired();
    expect(required3).toBe(true);

    // Test computeIdentityAssuranceRequired when purpose is defined and verifiedClaimsForUserInfo is defined
    const model4 = new AuthorizationPageModel();
    model4['purpose'] = 'Some purpose';
    model4['verifiedClaimsForUserInfo'] = [new Pair()];
    const required4 = model4.computeIdentityAssuranceRequired();
    expect(required4).toBe(true);

    // Test computeIdentityAssuranceRequired when purpose, verifiedClaimsForIdToken, and verifiedClaimsForUserInfo are defined
    const model5 = new AuthorizationPageModel();
    model5['purpose'] = 'Some purpose';
    model5['verifiedClaimsForIdToken'] = [new Pair()];
    model5['verifiedClaimsForUserInfo'] = [new Pair()];
    const required5 = model5.computeIdentityAssuranceRequired();
    expect(required5).toBe(false);
  });

  test('extractRequestedClaims', () => {
    // Test extractRequestedClaims when claimsString is undefined
    const model = new AuthorizationPageModel();
    const claims = model.extractRequestedClaims();
    expect(claims).toBeUndefined();

    // Test extractRequestedClaims when claimsString is defined but claims is not an object
    const model2 = new AuthorizationPageModel();
    const claims2 = model2.extractRequestedClaims('invalid');
    expect(claims2).toBeUndefined();

    // Test extractRequestedClaims when claimsString is defined and claims is an object with verified_claims as an array
    const model3 = new AuthorizationPageModel();
    const claims3 = model3.extractRequestedClaims(
      JSON.stringify({ verified_claims: [] })
    );
    expect(claims3).toBeUndefined();

    // Test extractRequestedClaims when claimsString is defined and claims is an object with verified_claims as an object
    const model4 = new AuthorizationPageModel();
    const claims4 = model4.extractRequestedClaims(
      JSON.stringify({ verified_claims: {} })
    );
    expect(claims4).toBeUndefined();
  });

  test('extractRequestedClaimsFromList', () => {
    // Test extractRequestedClaimsFromList when list is an empty array
    const model = new AuthorizationPageModel();
    const pairs = model.extractRequestedClaimsFromList([]);
    expect(pairs).toBeUndefined();

    // Test extractRequestedClaimsFromList when list contains non-object elements
    const model2 = new AuthorizationPageModel();
    const pairs2 = model2.extractRequestedClaimsFromList([1, 'two', true]);
    expect(pairs2).toBeUndefined();

    // Test extractRequestedClaimsFromList when list contains object elements
    const model3 = new AuthorizationPageModel();
    const pairs3 = model3.extractRequestedClaimsFromList([
      { claims: { key1: 'value1' } },
      { claims: { key2: 'value2' } },
    ]);
    expect(pairs3).toEqual([new Pair('key1', ''), new Pair('key2', '')]);
  });

  test('extractPurpose', () => {
    // Test extractPurpose when value is undefined
    const model = new AuthorizationPageModel();
    const purpose = model.extractPurpose(undefined);
    expect(purpose).toBe('');

    // Test extractPurpose when value is defined but not an object
    const model2 = new AuthorizationPageModel();
    const purpose2 = model2.extractPurpose('invalid');
    expect(purpose2).toBe('');

    // Test extractPurpose when value is defined and an object with purpose property
    const model3 = new AuthorizationPageModel();
    const purpose3 = model3.extractPurpose({ purpose: 'Some purpose' });
    expect(purpose3).toBe('Some purpose');
  });
});
