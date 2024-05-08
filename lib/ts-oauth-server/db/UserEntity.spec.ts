import { describe, expect, it } from 'vitest';
import { Address } from '../../au3te-ts-common/dto/Address';
import { UserEntity } from './UserEntity';

describe('UserEntity', () => {
  it('should return the correct loginId', () => {
    const user = new UserEntity(
      'subject',
      'loginId',
      'password',
      'name',
      'email',
      new Address()
    );
    expect(user.getLoginId()).toEqual('loginId');
  });

  it('should return the correct password', () => {
    const user = new UserEntity(
      'subject',
      'loginId',
      'password',
      'name',
      'email',
      new Address()
    );
    expect(user.getPassword()).toEqual('password');
  });

  it('should return the correct subject', () => {
    const user = new UserEntity(
      'subject',
      'loginId',
      'password',
      'name',
      'email',
      new Address()
    );
    expect(user.getSubject()).toEqual('subject');
  });

  it('should throw an error when calling getClaim', () => {
    const user = new UserEntity(
      'subject',
      'loginId',
      'password',
      'name',
      'email',
      new Address()
    );
    expect(() => user.getClaim('claimName', 'languageTag')).toThrowError(
      'Method not implemented.'
    );
  });

  it('should throw an error when calling getAttribute', () => {
    const user = new UserEntity(
      'subject',
      'loginId',
      'password',
      'name',
      'email',
      new Address()
    );
    expect(() => user.getAttribute('attributeName')).toThrowError(
      'Method not implemented.'
    );
  });

  it('should set nationalities correctly', () => {
    const user = new UserEntity(
      'subject',
      'loginId',
      'password',
      'name',
      'email',
      new Address()
    );
    user.setNationalities(['nationality1', 'nationality2']);
  });
});
