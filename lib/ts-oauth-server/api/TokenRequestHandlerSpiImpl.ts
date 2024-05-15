import { AuthleteApi } from '../../au3te-ts-common/api/AuthleteApi';
import { Property } from '../../au3te-ts-common/dto/Property';
import { TokenRequestHandlerSpi } from '../../au3te-ts-tsxrs/spi/TokenRequestHandlerSpi';

export class TokenRequestHandlerSpiImpl implements TokenRequestHandlerSpi {
  // private readonly mAuthleteApi: AuthleteApi;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public constructor(_authleteApi: AuthleteApi) {
    // this.mAuthleteApi = authleteApi;
  }

  public getProperties(): Property[] | undefined {
    return;
  }
}
