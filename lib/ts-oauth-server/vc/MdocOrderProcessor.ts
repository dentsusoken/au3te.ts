import { User } from '../../au3te-ts-common/types/User';
import { MDLClaimNames } from '../../cbor/mdoc/constants/MDLClaimNames';
import { MDLConstants } from '../../cbor/mdoc/constants/MDLConstants';
import { AbstractOrderProcessor } from './AbstractOrderProcessor';
import { OrderContext } from './OrderContext';

export class MdocOrderProcessor extends AbstractOrderProcessor {
  private static readonly KEY_CLAIMS = 'claims';
  private static readonly KEY_DOC_TYPE = 'doctype';
  private static readonly KEY_FORMAT = 'format';

  protected checkPermissions(
    _context: OrderContext,
    issuableCredentials: Record<string, unknown>[],
    format: string,
    reqestedCredential: Record<string, unknown>
  ): void {
    if (!issuableCredentials) {
      throw new Error('No credential can be issued with the access token.');
    }
    for (const issuableCredential of issuableCredentials) {
      if (!MdocOrderProcessor.matchFormat(format, issuableCredential)) {
        continue;
      }

      if (
        !MdocOrderProcessor.matchDocType(issuableCredential, reqestedCredential)
      ) {
        continue;
      }

      if (
        !MdocOrderProcessor.includeClaims(
          issuableCredential,
          reqestedCredential
        )
      ) {
        return;
      }

      throw new Error(
        'The access token does not have permissions to request the credential.'
      );
    }
  }
  private static matchFormat(
    format: string,
    issuableCredential: Record<string, unknown>
  ) {
    const issuableCredentialFormat =
      issuableCredential[MdocOrderProcessor.KEY_FORMAT];

    return format === issuableCredentialFormat;
  }

  private static matchDocType(
    issuableCredential: Record<string, unknown>,
    requestedCredential: Record<string, unknown>
  ) {
    const issuableCredentialDocType =
      issuableCredential[MdocOrderProcessor.KEY_DOC_TYPE];
    const requestedCredentialDocType =
      issuableCredential[MdocOrderProcessor.KEY_DOC_TYPE];

    if (
      typeof issuableCredential !== 'string' ||
      typeof requestedCredential !== 'string'
    ) {
      return false;
    }

    return issuableCredentialDocType === requestedCredentialDocType;
  }
  private static includeClaims(
    issuableCredential: Record<string, unknown>,
    requestedCredential: Record<string, unknown>
  ) {
    const issuableCredentialClaims = issuableCredential[
      MdocOrderProcessor.KEY_CLAIMS
    ] as Record<string, unknown>;
    const requestedCredentialClaims = requestedCredential[
      MdocOrderProcessor.KEY_CLAIMS
    ] as Record<string, unknown>;

    if (
      typeof issuableCredentialClaims !== 'object' ||
      typeof requestedCredentialClaims !== 'object'
    ) {
      return false;
    }

    for (const key in requestedCredentialClaims) {
      if (
        !Object.is(
          issuableCredentialClaims[key],
          requestedCredentialClaims[key]
        )
      ) {
        return false;
      }
    }
    return true;
  }

  protected collectClaims(
    _context: OrderContext,
    user: User,
    _format: string,
    reqestedCredential: Record<string, unknown>
  ): Record<string, unknown> {
    const doctype = reqestedCredential[MdocOrderProcessor.KEY_DOC_TYPE];
    const requestedClaims = reqestedCredential[
      MdocOrderProcessor.KEY_CLAIMS
    ] as Record<string, unknown>;
    let userClaims = user.getAttribute((doctype as string) || '') as Record<
      string,
      unknown
    >;
    if (!userClaims) {
      userClaims = {};
    }
    const claims = MdocOrderProcessor.buildClaims(userClaims, requestedClaims);

    const payload: Record<string, unknown> = {};
    payload[MdocOrderProcessor.KEY_DOC_TYPE] = doctype;
    payload[MdocOrderProcessor.KEY_CLAIMS] = claims;

    return payload;
  }

  private static buildClaims(
    userClaims: Record<string, unknown>,
    requestedClaims: Record<string, unknown>
  ) {
    const claims: Record<string, unknown> = {};
    for (const nameSpace in requestedClaims) {
      if (!userClaims[nameSpace]) {
        continue;
      }
      const useSubclaims = userClaims[nameSpace] as Record<string, unknown>;
      const requestedSubclaims = requestedClaims[nameSpace] as Record<
        string,
        unknown
      >;

      if (
        typeof useSubclaims !== 'object' ||
        typeof requestedSubclaims !== 'object'
      ) {
        continue;
      }

      const subclaims: Record<string, unknown> =
        MdocOrderProcessor.buildSubclaims(
          nameSpace,
          useSubclaims,
          requestedSubclaims
        );
      claims[nameSpace] = subclaims;
    }
    return claims;
  }

  private static buildSubclaims(
    nameSpace: string,
    useSubclaims: Record<string, unknown>,
    requestedSubclaims: Record<string, unknown>
  ) {
    const subclaims: Record<string, unknown> = {};

    if (nameSpace === MDLConstants.NAME_SPACE_MDL) {
      MdocOrderProcessor.addMDLClaims(subclaims, requestedSubclaims);
    }

    for (const claimName in requestedSubclaims) {
      if (!useSubclaims[claimName]) {
        continue;
      }
      subclaims[claimName] = useSubclaims[claimName];
    }
    return subclaims;
  }

  private static addMDLClaims(
    subclaims: Record<string, unknown>,
    requestedSubclaims: Record<string, unknown>
  ) {
    const now = new Date();

    if (requestedSubclaims[MDLClaimNames.ISSUE_DATE]) {
      subclaims[MDLClaimNames.ISSUE_DATE] = this.toFullDate(now);
    }

    if (requestedSubclaims[MDLClaimNames.EXPIRY_DATE]) {
      const exp = new Date().setFullYear(now.getFullYear() + 1);
      subclaims[MDLClaimNames.EXPIRY_DATE] = this.toFullDate(new Date(exp));
    }
  }

  private static toFullDate(dt: Date): string {
    return `
    "cbor:1004("${dt.toISOString().split('T')[0]}")"
    `;
  }

  protected computeCredentialDuration(): number {
    const now = new Date();
    const exp = new Date().setFullYear(now.getFullYear() + 1);

    return exp - now.getTime();
  }
}
