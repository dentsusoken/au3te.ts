import { AuthleteApi } from '../au3te-ts-common/api/AuthleteApi';
import { AuthorizationResponse } from '../au3te-ts-common/dto/AuthorizationResponse';
import { Property } from '../au3te-ts-common/dto/Property';
import { StringArray } from '../au3te-ts-common/dto/StringArray';
import { BaseHandler } from './BaseHandler';
import { VerifiedClaimsCollector } from './VerifiedClaimsCollector';
import { AuthorizationDecisionHandlerSpi } from './spi/AuthorizationDecisionHandlerSpi';

class AuthorizationDecisionHandler extends BaseHandler {
  private readonly mSpi: AuthorizationDecisionHandlerSpi;
  constructor(api: AuthleteApi, spi: AuthorizationDecisionHandlerSpi) {
    super(api);
    this.mSpi = spi;
  }

  public async handle(params: Params): Promise<Response> {
    try {
      return this.process(params);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      throw new Error(
        e.message || 'Unexpected error in AuthorizationRequestHandler'
      );
    }
  }

  public async process(params: Params): Promise<Response> {
    if (this.mSpi.isClientAuthorized() === false) {
      // TODO Implement Authorization failed
      throw new Error('Not implemented yet');
    }

    const subject = this.mSpi.getUserSubject();

    if (!subject || subject.length === 0) {
      // TODO Implement Authorization failed
      throw new Error('Not implemented yet');
    }

    const sub = this.mSpi.getSub();
    const authTime = this.mSpi.getUserAuthenticatedAt();
    const acr = this.mSpi.getAcr();
    let claims = this.collectClaims(
      params.getClaimNames(),
      params.getClaimLocales()
    );
    const claimsForTx = this.collectClaims(
      params.getRequestedClaimsForTx(),
      params.getClaimLocales()
    );
    let verifiedClaimsForTx;

    if (params.isOldIdaFormatUsed()) {
      // claims = this.collectVerifiedClaims_Old(
      //   claims,
      //   subject,
      //   params.getIdTokenClaims()
      // );
      throw new Error('Not implemented yet');
    } else {
      claims = this.collectVerifiedClaims(
        claims,
        subject,
        params.getIdTokenClaims()
      );
      verifiedClaimsForTx = this.collectVerifiedClaimsForTx(
        subject,
        params.getIdTokenClaims() || '',
        params.getRequestedVerifiedClaimsForTx() || []
      );
    }
    const properties: Property[] = this.mSpi.getProperties() || [];
    const scopes: string[] = this.mSpi.getScopes() || [];

    return this.authorize(
      params.getTicket() || '',
      subject,
      authTime || 0,
      acr || '',
      claims || {},
      properties,
      scopes,
      sub || '',
      claimsForTx,
      verifiedClaimsForTx
    );
  }

  public collectClaims(
    // subject: string,
    claimNames?: string[],
    claimLocales?: string[]
  ): Record<string, unknown> | undefined {
    if (!claimNames || claimNames.length === 0) {
      return;
    }
    claimLocales = this.normalizeClaimLocales(claimLocales);

    let claims: Record<string, unknown> = {};

    for (let claimName of claimNames) {
      if (claimName === null || claimName.length === 0) {
        continue;
      }

      const elements: string[] = claimName.split('#', 2);
      const name: string = elements[0];
      const tag: string | undefined =
        elements.length === 2 ? elements[1] : undefined;
      const value: unknown = this.getClaim(name, tag, claimLocales);

      if (value === undefined) {
        continue;
      }
      if (tag === undefined) {
        claimName = name;
      }
      claims = { claimName: value };
    }
    if (claims.length === 0) {
      return;
    }
    return claims;
  }

  public normalizeClaimLocales(claimLocales?: string[]): string[] | undefined {
    if (!claimLocales || claimLocales.length === 0) {
      return;
    }
    const set = new Set<string>();
    const list: string[] = [];

    for (const claimLocale of claimLocales) {
      if (claimLocale === null || claimLocale.length === 0) {
        continue;
      }
      if (set.has(claimLocale)) {
        continue;
      }
      set.add(claimLocale);
      list.push(claimLocale);
    }

    const size: number = list.length;

    if (size === 0) {
      return;
    } else if (size === claimLocales.length) {
      return claimLocales;
    }
    return list;
  }

  public getClaim(
    name: string,
    tag?: string,
    claimLocales?: string[]
  ): unknown {
    if (tag !== undefined && tag.length !== 0) {
      return this.mSpi.getUserClaim(name, tag);
    }
    if (!claimLocales || claimLocales.length === 0) {
      return this.mSpi.getUserClaim(name, undefined);
    }
    for (const claimLocale of claimLocales) {
      const value: unknown = this.mSpi.getUserClaim(name, claimLocale);
      return value;
    }
    return this.mSpi.getUserClaim(name, undefined);
  }

  // public collectVerifiedClaims_Old(
  //   claims?: Record<string, unknown>,
  //   subject?: string,
  //   idTokenClaims?: string
  // ) {
  //   if (!idTokenClaims || idTokenClaims.length === 0) {
  //     return claims;
  //   }
  //   const constraint: VerifiedClaimsConstraint =
  //     VerifiedClaimsContainerConstraint.fromJson(
  //       idTokenClaims
  //     ).getVerifiedClaims();

  //   if (!constraint || constraint === null) {
  //     return claims;
  //   }
  //   const verifiedClaims: VerifiedClaims[] = this.mSpi.getVerifiedClaims(
  //     subject,
  //     constraint
  //   );
  //   return this.embedVerifiedClaims(claims, verifiedClaims);
  // }

  // public embedVerifiedClaims(
  //   claims?: Record<string, unknown>,
  //   verifiedClaims?: VerifiedClaims[]
  // ): Record<string, unknown> | undefined {
  //   if (!verifiedClaims || verifiedClaims.length === 0) {
  //     return claims;
  //   }
  //   if (!claims) {
  //     claims = {};
  //   }
  //   if (verifiedClaims.length === 1) {
  //     claims = { verified_claims: verifiedClaims[0] };
  //   } else {
  //     claims = { verified_claims: verifiedClaims };
  //   }
  //   return claims;
  // }

  public collectVerifiedClaims(
    calims?: Record<string, unknown>,
    subject?: string,
    claimsRequest?: string
  ): Record<string, unknown> | undefined {
    if (!calims || !subject || !claimsRequest) {
      return;
    }
    return this.createVerifiedClaimsCollector().collect(
      calims,
      subject,
      claimsRequest
    );
  }

  public collectVerifiedClaimsForTx(
    subject: string,
    claimsRequest: string,
    requestedVerifiedClaimsForTx: StringArray[]
  ) {
    return this.createVerifiedClaimsCollector().collectForTx(
      subject,
      claimsRequest,
      requestedVerifiedClaimsForTx
    );
  }

  public createVerifiedClaimsCollector(): VerifiedClaimsCollector {
    return new VerifiedClaimsCollector((sub: string, req: unknown) =>
      this.mSpi.getVerifiedClaims(sub, req)
    );
  }

  public authorize(
    ticket: string,
    subject: string,
    authTime: number,
    acr: string,
    claims: Record<string, unknown>,
    properties: Property[],
    scopes: string[],
    sub: string,
    claimsForTx?: Record<string, unknown>,
    verifiedClaimsForTx?: Record<string, unknown>[]
  ) {
    try {
      return this.getApiCaller().authorizationIssue(
        ticket,
        subject,
        authTime,
        acr,
        claims,
        properties,
        scopes,
        sub,
        claimsForTx,
        verifiedClaimsForTx
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      throw new Error(e.messsage);
    }
  }
}

export class Params {
  private ticket?: string;
  private claimNames?: string[];
  private claimLocales?: string[];
  private requestedClaimsForTx?: string[];
  private oldIdaFormatUsed?: boolean;
  private idTokenClaims?: string;
  private requestedVerifiedClaimsForTx?: StringArray[];

  public getTicket(): string | undefined {
    return this.ticket;
  }
  public setTicket(ticket: string) {
    this.ticket = ticket;
    return this;
  }
  public getClaimNames(): string[] | undefined {
    return this.claimNames;
  }
  public setClaimNames(names: string[]) {
    this.claimNames = names;
    return this;
  }
  public getClaimLocales(): string[] | undefined {
    return this.claimLocales;
  }
  public setClaimLocales(locales: string[]) {
    this.claimLocales = locales;
    return this;
  }
  public getIdTokenClaims(): string | undefined {
    return this.idTokenClaims;
  }
  public setIdTokenClaims(claims: string) {
    this.idTokenClaims = claims;
    return this;
  }
  public getRequestedClaimsForTx(): string[] | undefined {
    return this.requestedClaimsForTx;
  }
  public setRequestedClaimsForTx(claims: string[]) {
    this.requestedClaimsForTx = claims;
    return this;
  }
  public getRequestedVerifiedClaimsForTx(): StringArray[] | undefined {
    return this.requestedVerifiedClaimsForTx;
  }
  public setRequestedVerifiedClaimsForTx(claims: StringArray[]) {
    this.requestedVerifiedClaimsForTx = claims;
    return this;
  }
  public isOldIdaFormatUsed(): boolean | undefined {
    return this.oldIdaFormatUsed;
  }
  public static from(response: AuthorizationResponse) {
    return new Params()
      .setTicket(response.getTicket() || '')
      .setClaimNames(response.getClaims() || [])
      .setClaimLocales(response.getClaimsLocales() || [])
      .setIdTokenClaims(response.getIdTokenClaims() || '')
      .setRequestedClaimsForTx(response.getRequestedClaimsForTx() || [])
      .setRequestedVerifiedClaimsForTx(
        response.getRequestedVerifiedClaimsForTx() || []
      );
  }
}

export { AuthorizationDecisionHandler };
