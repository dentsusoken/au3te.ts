import { Property } from '../../au3te-ts-common/dto/Property';

export interface TokenRequestHandlerSpi {
  getProperties(): Property[] | undefined;
}
