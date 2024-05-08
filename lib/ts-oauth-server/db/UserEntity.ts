import { Address } from '../../au3te-ts-common/dto/Address';
import { User } from '../../au3te-ts-common/types/User';

export class UserEntity implements User {
  private subject: string;
  private loginId: string;
  private password: string;
  // private name: string;
  // private email: string;
  // private address: Address;
  // private phoneNumber?: string;
  // private code?: string;

  // private phoneNumberVerified?: boolean;
  // private emailVerified?: boolean;
  // private givenName?: string;
  // private familyName?: string;
  // private middleName?: string;
  // private nickname?: string;
  // private profile?: string;
  // private picture?: string;
  // private website?: string;
  // private gender?: string;
  // private zoneinfo?: string;
  // private locale?: string;
  // private preferredUsername?: string;
  // private birthdate?: string;
  // private updatedAt?: Date;

  // private nationalities?: string[];
  private attributes?: Record<string, unknown>;

  constructor(
    subject: string,
    loginId: string,
    password: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _name: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _email: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _address: Address,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _phoneNumber?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _code?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _givenName?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _familyName?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _middleName?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _nickname?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _profile?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _picture?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _website?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _gender?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _zoneinfo?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _locale?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _preferredUsername?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _birthdate?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _updatedAt?: Date
  ) {
    this.subject = subject;
    this.loginId = loginId;
    this.password = password;
    // this.name = name;
    // this.email = email;
    // this.address = address;
    // this.phoneNumber = phoneNumber;
    // this.code = code;
    // this.givenName = givenName;
    // this.familyName = familyName;
    // this.middleName = middleName;
    // this.nickname = nickname;
    // this.profile = profile;
    // this.picture = picture;
    // this.website = website;
    // this.gender = gender;
    // this.zoneinfo = zoneinfo;
    // this.locale = locale;
    // this.preferredUsername = preferredUsername;
    // this.birthdate = birthdate;
    // this.updatedAt = updatedAt;
  }
  public getLoginId() {
    return this.loginId;
  }
  public getPassword() {
    return this.password;
  }
  public getSubject() {
    return this.subject;
  }
  // TODO Implement this method
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getClaim(_claimName: string, _languageTag: string): unknown {
    throw new Error('Method not implemented.');
  }
  // TODO Implement this method
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getAttribute(_attributeName: string): unknown {
    throw new Error('Method not implemented.');
  }
  public setAttribute(
    attributeName: string,
    attributeValue: unknown
  ): UserEntity {
    if (typeof this.attributes !== 'undefined') {
      this.attributes[attributeName] = attributeValue;
    } else {
      this.attributes = { [attributeName]: attributeValue };
    }
    return this;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public setNationalities(_nationalities: string[]): UserEntity {
    return this;
  }
}
