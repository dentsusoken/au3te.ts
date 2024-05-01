import AuthorizationResponse from '../au3te-ts-common/dto/AuthorizationResponse';
import AuthzDetails from '../au3te-ts-common/dto/AuthzDetails';
import Client from '../au3te-ts-common/dto/Client';
import Pair from '../au3te-ts-common/dto/Pair';
import Scope from '../au3te-ts-common/dto/Scope';
import User from '../au3te-ts-common/types/User';

// TODO Authorization Endpoint
export default class AuthorizationPageModel {
  private serviceName?: string;
  private clientName?: string;
  private description?: string;
  private logoUri?: string;
  private clientUri?: string;
  private policyUri?: string;
  private tosUri?: string;
  private scopes?: Scope[];
  private loginId?: string;
  private loginIdReadOnly?: string;
  private user?: User;
  private authorizationDetails?: string;
  private purpose?: string;
  private verifiedClaimsForIdToken?: Pair[];
  private allVerifiedClaimsForIdTokenRequested?: boolean;
  private verifiedClaimsForUserInfo?: Pair[];
  private allVerifiedClaimsForUserInfoRequested?: boolean;
  private identityAssuranceRequired?: boolean;
  private oldIdaFormatUsed?: boolean;
  private claimsForIdToken?: string[];
  private claimsForUserInfo?: string[];

  constructor();
  constructor(info: AuthorizationResponse, user: User);
  constructor(info?: AuthorizationResponse, user?: User) {
    if (info && user) {
      const client: Client | undefined = info.getClient();
      const service = info.getService();

      if (typeof client === 'undefined' || typeof service === 'undefined') {
        return;
      }

      this.serviceName = info.getService()?.getServiceName();
      this.clientName = client.getClientName();
      this.description = client.getDescription();
      this.logoUri = client.getLogoUri()?.toString();
      this.clientUri = client.getClientUri()?.toString();
      this.policyUri = client.getPolicyUri()?.toString();
      this.tosUri = client.getTosUri()?.toString();
      this.scopes = this.computeScopes(info);
      this.loginId = this.computeLoginId(info);
      this.loginIdReadOnly = this.computeLoginIdReadOnly(info);
      this.authorizationDetails = this.toString(info.getAuthorizationDetails());
      this.user = user;

      // For "OpenID Connect for Identity Assurance 1.0"
      this.setupIdentityAssurance(info);

      // Requested normal claims.
      this.claimsForIdToken = info.getClaims();
      this.claimsForUserInfo = info.getClaimsAtUserInfo();
    }
  }
  isOldIdaFormatUsed() {
    return this.oldIdaFormatUsed;
  }
  computeScopes(info: AuthorizationResponse): Scope[] {
    const scopes = info.getScopes();
    const dynamicScopes = info.getDynamicScopes();
    if (typeof scopes === 'undefined') {
      return [];
    }
    if (typeof dynamicScopes === 'undefined') {
      return scopes;
    }
    const list = new Array<Scope>();
    scopes.forEach((scope) => {
      list.push(scope);
    });
    dynamicScopes.forEach((scope) => {
      const value = scope.getValue();
      if (value) {
        list.push(new Scope().setName(value));
      }
    });
    return list;
  }
  computeLoginId(info: AuthorizationResponse): string {
    const subject = info.getSubject();
    if (subject) {
      return subject;
    }
    return info.getLoginHint() || '';
  }
  computeLoginIdReadOnly(info: AuthorizationResponse): string | undefined {
    if (info.getSubject()) {
      return 'readonly';
    }
    return;
  }
  toString(details?: AuthzDetails): string | undefined {
    if (!details) {
      return;
    }
    const elements = details.getElements();
    if (!elements || elements.length === 0) {
      return;
    }
    return JSON.stringify(elements);
  }
  setupIdentityAssurance(info: AuthorizationResponse): void {
    this.purpose = info.getPurpose();
    this.setupVerifiedClaimsForIdToken(info);
    this.setupVerifiedClaimsForIdToken(info);
    this.identityAssuranceRequired = this.computeIdentityAssuranceRequired();
  }
  setupVerifiedClaimsForIdToken(info: AuthorizationResponse): void {
    if (this.isOldIdaFormatUsed()) {
      // TODO Implement Old format function
      return;
    }
    this.verifiedClaimsForIdToken = this.extractRequestedClaims(
      info.getIdTokenClaims()
    );
  }
  setupVerifiedClaimsForUserInfo(info: AuthorizationResponse) {
    if (this.isOldIdaFormatUsed()) {
      // TODO Implement Old format function
      return;
    }
    this.verifiedClaimsForUserInfo = this.extractRequestedClaims(
      info.getUserInfoClaims()
    );
  }
  computeIdentityAssuranceRequired() {
    return (
      !this.purpose ||
      this.allVerifiedClaimsForIdTokenRequested ||
      !this.verifiedClaimsForIdToken ||
      this.allVerifiedClaimsForUserInfoRequested ||
      !this.verifiedClaimsForUserInfo
    );
  }
  extractRequestedClaims(claimsString?: string): Pair[] | undefined {
    if (!claimsString) {
      return;
    }
    const claims = JSON.parse(claimsString);
    const verifiedClaims = claims['verified_claims'];
    if (Array.isArray(verifiedClaims)) {
      return this.extractRequestedClaimsFromList(verifiedClaims);
    } else if (typeof verifiedClaims === 'object') {
      return this.extractRequestedClaimsFromMap(verifiedClaims);
    }
    return;
  }
  extractRequestedClaimsFromList(list: unknown[]) {
    const pairList = new Array<Pair>();
    list.forEach((element) => {
      if (!element || typeof element !== 'object') {
        return;
      }
      const pairs = this.extractRequestedClaimsFromMap(
        element as Record<string, unknown>
      );
      if (!pairs) {
        return;
      }
      pairList.push(...pairs);
    });
    if (pairList.length === 0) {
      return;
    }
    return pairList;
  }
  extractRequestedClaimsFromMap(
    map: Record<string, unknown>
  ): Pair[] | undefined {
    const claims = map['claims'];
    if (!claims || typeof claims !== 'object') {
      return;
    }
    const pairs = Object.entries(claims).map(([key, value]) => {
      return this.extractClaimNamePurposePair({ key, value });
    });
    return pairs;
  }

  extractClaimNamePurposePair(entry: { key: string; value: unknown }) {
    return new Pair(entry.key, this.extractPurpose(entry.value));
  }
  extractPurpose(value: unknown): string {
    if (!value || typeof value !== 'object') {
      return '';
    }
    const purpose = (value as Record<string, unknown>)['purpose'];
    return purpose as string;
  }
}
