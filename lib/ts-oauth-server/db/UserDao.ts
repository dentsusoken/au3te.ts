import { Address } from '../../au3te-ts-common/dto/Address';
import { User } from '../../au3te-ts-common/types/User';
import { MDLClaimNames } from '../../cbor/mdoc/constants/MDLClaimNames';
import { MDLConstants } from '../../cbor/mdoc/constants/MDLConstants';
import { UserEntity } from './UserEntity';

interface SearchCondition {
  check(ue: UserEntity): boolean;
}

export class UserDao {
  private static readonly sUserDB: Record<string, UserEntity> = {};
  static {
    this.addAll(
      new UserEntity(
        '1001',
        'john',
        'john',
        'John Flibble Smith',
        'john@example.com',
        new Address().setCountry('USA Flibble'),
        '+1 (425) 555-1212',
        '675325',
        'John',
        'Smith',
        'Doe',
        'Johnny',
        'https://example.com/john/profile',
        'https://example.com/john/me.jpg',
        'https://example.com/john/',
        'male',
        'Europe/London',
        'en-US',
        'john',
        '0000-03-22',
        new Date('2020-01-01')
      ),
      new UserEntity(
        '1002',
        'jane',
        'jane',
        'Jane Smith',
        'jane@example.com',
        new Address().setCountry('Chile'),
        '+56 (2) 687 2400',
        '264209'
      ),

      new UserEntity(
        '1003',
        'max',
        'max',
        'Max Meier',
        'max@example.com',
        new Address()
          .setCountry('Germany')
          .setRegion('Bavaria')
          .setLocality('Augsburg'),
        '+49 (30) 210 94-0',
        '12344',
        'Max',
        'Meier',
        undefined,
        undefined,
        'https://example.com/max/profile',
        'https://example.com/max/me.jpg',
        'https://example.com/max/',
        'male',
        'Europe/Berlin',
        'de',
        'max',
        '1956-01-28',
        new Date('2021-11-28')
      ).setNationalities(['USA', 'DEU']),

      new UserEntity(
        '1004',
        'inga',
        'inga',
        'Inga Silverstone',
        'inga@example.com',
        new Address()
          .setCountry('USA')
          .setLocality('Shoshone')
          .setStreetAddress('114 0ld State Hwy 127')
          .setPostalCode('CA 92384'),
        undefined,
        undefined,
        'Inga',
        'Silverstone',
        undefined,
        undefined,
        'https://example.com/inga/profile',
        'https://example.com/inga/me.jpg',
        'https://example.com/inga/',
        'female',
        'America/Toronto',
        'en-US',
        'inga',
        '1991-11-06',
        new Date('2022-04-30')
      ).setAttribute(MDLConstants.DOC_TYPE_MDL, this.createMDLData1004())
    );
  }

  private static createMDLData1004() {
    const vehicleA: Record<string, unknown> = {};
    vehicleA['vehicle_category_code'] = 'A';
    vehicleA['issue_date'] = 'cbor:1004("2023-01-01")';
    vehicleA['expiry_date'] = 'cbor:1004("2043-01-01")';

    const drivingPrivileges: Record<string, unknown>[] = [];
    drivingPrivileges.push(vehicleA);

    const nameSpace: Record<string, unknown> = {};
    nameSpace[MDLClaimNames.FAMILY_NAME] = 'Silverstone';
    nameSpace[MDLClaimNames.GIVEN_NAME] = 'Inga';
    nameSpace[MDLClaimNames.BIRTH_DATE] = 'cbor:1004("1991-11-06")';
    nameSpace[MDLClaimNames.ISSUING_COUNTRY] = 'US';
    nameSpace[MDLClaimNames.DOCUMENT_NUMBER] = '12345678';
    nameSpace[MDLClaimNames.DRIVING_PRIVILEGES] = drivingPrivileges;

    const root: Record<string, unknown> = {};
    root[MDLConstants.NAME_SPACE_MDL] = nameSpace;
    return root;
  }

  // SearchCondition() {}
  private static get(condition: SearchCondition) {
    return Object.values(this.sUserDB).filter((ue) => {
      return condition.check(ue);
    })[0];
  }

  public static getByCredentials(loginId: string, password: string): User {
    return this.get({
      check: (ue) => {
        return ue.getLoginId() === loginId && ue.getPassword() === password;
      },
    });
  }

  // TODO Credential Endpoint
  getBySubject() {}

  private static add(entity: UserEntity): void {
    this.sUserDB[entity.getSubject()] = entity;
  }
  private static addAll(...entities: UserEntity[]): void {
    entities.forEach((entity) => {
      this.add(entity);
    });
  }
}
