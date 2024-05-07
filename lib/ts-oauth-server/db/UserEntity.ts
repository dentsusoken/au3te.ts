import { Address } from '../../au3te-ts-common/dto/Address';
import { User } from '../../au3te-ts-common/types/User';

// TODO Authorization Endpoint
export class UserEntity implements User {
  private subject: string;
  private loginId: string;
  private password: string;
  private name: string;
  private email: string;
  private address: Address;
  private phoneNumber?: string;
  private code?: string;

  private phoneNumberVerified?: boolean;
  private emailVerified?: boolean;
  private givenName?: string;
  private familyName?: string;
  private middleName?: string;
  private nickname?: string;
  private profile?: string;
  private picture?: string;
  private website?: string;
  private gender?: string;
  private zoneinfo?: string;
  private locale?: string;
  private preferredUsername?: string;
  private birthdate?: string;
  private updatedAt?: Date;

  private nationalities?: string[];
  private attributes?: Record<string, unknown>;

  constructor(
    subject: string,
    loginId: string,
    password: string,
    name: string,
    email: string,
    address: Address,
    phoneNumber?: string,
    code?: string,
    givenName?: string,
    familyName?: string,
    middleName?: string,
    nickname?: string,
    profile?: string,
    picture?: string,
    website?: string,
    gender?: string,
    zoneinfo?: string,
    locale?: string,
    preferredUsername?: string,
    birthdate?: string,
    updatedAt?: Date
  ) {
    this.subject = subject;
    this.loginId = loginId;
    this.password = password;
    this.name = name;
    this.email = email;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.code = code;
    this.givenName = givenName;
    this.familyName = familyName;
    this.middleName = middleName;
    this.nickname = nickname;
    this.profile = profile;
    this.picture = picture;
    this.website = website;
    this.gender = gender;
    this.zoneinfo = zoneinfo;
    this.locale = locale;
    this.preferredUsername = preferredUsername;
    this.birthdate = birthdate;
    this.updatedAt = updatedAt;
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
  public getClaim(claimName: string, languageTag: string): unknown {
    throw new Error('Method not implemented.');
  }
  // TODO Implement this method
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getAttrinute(attributeName: string): unknown {
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
  public setNationalities(nationalities: string[]): UserEntity {
    this.nationalities = nationalities;
    return this;
  }
}
