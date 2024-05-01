import { AuthleteApi } from '../au3te-ts-common/api/AuthleteApi';
import { BaseHandler } from './BaseHandler';
import { AuthorizationDecisionHandlerSpi } from './spi/AuthorizationDecisionHandlerSpi';
// TODO Authorization Endpoint
class AuthorizationDecisionHandler extends BaseHandler {
  private readonly mSpi: AuthorizationDecisionHandlerSpi;
  constructor(api: AuthleteApi, spi: AuthorizationDecisionHandlerSpi) {
    super(api);
    this.mSpi = spi;
  }
  public handle() {}
  public process() {}
  public collectClaims() {}
  public collectVerifiedClaims() {}
  public createVerifiedClaimsCollector() {}
  public collectVerifiedClaimsForTx() {}
  public authorize() {}
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace AuthorizationDecisionHandler {
  export class Params {
    public getTicket() {}
    public setTicket() {}
    public getClaimNames() {}
    public setClaimNames() {}
    public getClaimLocales() {}
    public setClaimLocales() {}
    public getIdTokenClaims() {}
    public setIdTokenClaims() {}
    public getRequestedClaimsForTx() {}
    public setRequestedClaimsForTx() {}
    public getRequestedVerifiedClaimsForTx() {}
    public setRequestedVerifiedClaimsForTx() {}
    public isOldIdaFormatUsed() {}
    public from() {}
  }
}
export { AuthorizationDecisionHandler };
