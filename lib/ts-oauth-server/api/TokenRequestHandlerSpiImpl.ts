import { AuthleteApi } from '../../au3te-ts-common/api/AuthleteApi';
import { Property } from '../../au3te-ts-common/dto/Property';
import { TokenRequestHandlerSpi } from '../../au3te-ts-tsxrs/spi/TokenRequestHandlerSpi';

export class TokenRequestHandlerSpiImpl implements TokenRequestHandlerSpi {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public constructor(private readonly _mAuthleteApi: AuthleteApi) {}

  public getProperties(): Property[] | undefined {
    return;
  }
}
