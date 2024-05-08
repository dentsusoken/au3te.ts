import { StringArray } from '../au3te-ts-common/dto/StringArray';
import { Utils } from '../au3te-ts-common/util/Utils';
import { BiFunction } from '../util/javaTypes';

export class VerifiedClaimsCollector {
  private static readonly KEY_VERIFIED_CLAIMS = 'verified_claims';
  private static readonly KEY_CLAIMS = 'claims';

  private readonly mVerifiedClaimsGetter: BiFunction<string, unknown, unknown>;

  constructor(getter: BiFunction<string, unknown, unknown>) {
    this.mVerifiedClaimsGetter = getter;
  }

  collect(
    claims: Record<string, unknown>,
    subject: string,
    claimsRequest: string
  ): Record<string, unknown> {
    const verifiedClaimsRequest =
      this.extractVerifiedClaimsRequest(claimsRequest);

    if (!verifiedClaimsRequest) {
      return claims;
    }

    const verifiedClaimsValue = this.mVerifiedClaimsGetter(
      subject,
      verifiedClaimsRequest
    );

    if (!verifiedClaimsValue) {
      return claims;
    }

    if (!claims) {
      claims = {};
    }
    claims[VerifiedClaimsCollector.KEY_VERIFIED_CLAIMS] = verifiedClaimsValue;
    return claims;
  }
  public extractVerifiedClaimsRequest(
    claimsRequest: string
  ): unknown | undefined {
    if (!claimsRequest) {
      return;
    }
    return Utils.fromJson(claimsRequest)[
      VerifiedClaimsCollector.KEY_VERIFIED_CLAIMS
    ];
  }
  public collectForTx(
    subject: string,
    claimsRequest: string,
    requestedVerifiedClaimsForTx: StringArray[]
  ) {
    if (requestedVerifiedClaimsForTx.length === 0) {
      return;
    }

    const verifiedClaimsRequest =
      this.extractVerifiedClaimsRequest(claimsRequest);

    const requests = VerifiedClaimsCollector.toMap(verifiedClaimsRequest);
    if (!requests) {
      return;
    }
    if (requestedVerifiedClaimsForTx.length !== requests.length) {
      return;
    }
    const verifiedClaimsForTxList: Record<string, unknown>[] = [];
    const size = requests.length;

    for (let i = 0; i < size; i++) {
      const request = requests[i];
      const claimNames = VerifiedClaimsCollector.extractArray(
        requestedVerifiedClaimsForTx[i]
      );
      const claims = this.getVerifiedClaimsForTx(subject, request, claimNames);

      if (claims) {
        verifiedClaimsForTxList.push(claims);
      }
    }

    if (verifiedClaimsForTxList.length === 0) {
      return;
    }
    return verifiedClaimsForTxList;
  }

  private static toMap(object: unknown): Record<string, unknown>[] | undefined {
    if (Array.isArray(object)) {
      return object as Record<string, unknown>[];
    }
    if (object && typeof object === 'object') {
      const list: Record<string, unknown>[] = [];
      Object.entries(object).map(([key, value]) => list.push({ key, value }));
      return list;
    }
  }

  private static extractArray(stringArray: StringArray) {
    if (!stringArray) {
      return;
    }
    const array = stringArray.getArray();
    if (!array || array.length === 0) {
      return;
    }
    return array;
  }

  private getVerifiedClaimsForTx(
    subject: string,
    request: Record<string, unknown>,
    claimNames?: string[]
  ): Record<string, unknown> | undefined {
    if (!claimNames || claimNames.length === 0) {
      if (this.mVerifiedClaimsGetter(subject, request)) {
        return {};
      } else {
        return;
      }
    }

    const containsClaims: boolean =
      VerifiedClaimsCollector.KEY_CLAIMS in request;
    const originalClaims = request[VerifiedClaimsCollector.KEY_CLAIMS];

    let claims: Record<string, unknown> = {};

    claimNames.forEach((name) => {
      claims[name] = { name: undefined };
    });
    request[VerifiedClaimsCollector.KEY_CLAIMS] = claims;

    const dataset = this.mVerifiedClaimsGetter(subject, request);

    if (containsClaims) {
      request[VerifiedClaimsCollector.KEY_CLAIMS] = originalClaims;
    } else {
      delete request[VerifiedClaimsCollector.KEY_CLAIMS];
    }

    if (!dataset || typeof dataset !== 'object') {
      return;
    }

    claims = (dataset as Record<string, unknown>)[
      VerifiedClaimsCollector.KEY_CLAIMS
    ] as Record<string, unknown>;

    if (!claims || typeof claims !== 'object') {
      return {};
    }
    return claims;
  }
}
