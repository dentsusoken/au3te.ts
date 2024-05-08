import { Client } from '../../au3te-ts-common/dto/Client';
import { Property } from '../../au3te-ts-common/dto/Property';
import { SubjectType } from '../../au3te-ts-common/types/SubjectType';
import { User } from '../../au3te-ts-common/types/User';
import { Utils } from '../../au3te-ts-common/util/Utils';
import { AuthorizationDecisionHandlerSpiAdapter } from '../../au3te-ts-tsxrs/spi/AuthorizationDecisionHandlerSpiAdapter';

// TODO 安藤実装済み
export class AuthorizationDecisionHandlerSpiImpl extends AuthorizationDecisionHandlerSpiAdapter {
  private mClientAuthorized?: boolean;
  private mUser?: User;
  private mUserAuthenticatedAt?: number;
  // private mIdTokenClaims?: Record<string, unknown>;
  private mAcrs?: string[];
  private mClient?: Client;
  private mUserSubject?: string;
  // private SubjectType?: SubjectType;

  constructor(
    parameters: Record<string, string>,
    user: User,
    userAuthenticatedAt: Date,
    _idTokenClaims: string,
    acrs: string[],
    client: Client
  ) {
    super();
    this.mClientAuthorized = !!Object.keys(parameters).find(
      (key) => key === 'authorized'
    );

    if (!this.mClientAuthorized) {
      return;
    }

    this.mUser = user;

    if (!this.mUser) {
      return;
    }

    if (!userAuthenticatedAt) {
      return;
    }

    this.mUserAuthenticatedAt = Math.round(
      userAuthenticatedAt.getTime() / 1000
    );
    this.mUserSubject = this.mUser.getSubject();
    // this.mIdTokenClaims = this.parseJson(idTokenClaims);
    this.mAcrs = acrs;
    this.mClient = client;
  }

  isClientAuthorized(): boolean | undefined {
    return this.mClientAuthorized;
  }

  getUserSubject(): string | undefined {
    return this.mUserSubject;
  }

  getSub(): string | undefined {
    const client = this.mClient;
    if (!client) {
      return;
    }
    const subjectType = client.getSubjectType();

    if (!subjectType && subjectType === SubjectType.PAIRWISE) {
      const sectorIdentifier: string | undefined =
        client.getDerivedSectorIdentifier();
      return subjectType + '-' + sectorIdentifier + '-' + this.mUserSubject;
    } else {
      return;
    }
  }

  getUserAuthenticatedAt(): number | undefined {
    return this.mUserAuthenticatedAt;
  }

  getAcr(): string | undefined {
    if (!this.mAcrs || this.mAcrs.length === 0) {
      return;
    }
    const acr: string = this.mAcrs[0];
    if (!acr || acr.length === 0) {
      return;
    }
    return acr;
  }

  getCustomClaim() {}
  getProperties(): Property[] | undefined {
    return;
  }

  parseJson(json: string): Record<string, unknown> | undefined {
    if (!json) {
      return;
    }
    return Utils.fromJson(json);
  }
}
