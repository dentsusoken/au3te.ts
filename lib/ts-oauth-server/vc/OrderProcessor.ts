import { CredentialIssuanceOrder } from '../../au3te-ts-common/dto/CredentialIssuanceOrder';
import { CredentialRequestInfo } from '../../au3te-ts-common/dto/CredentialRequestInfo';
import { IntrospectionResponse } from '../../au3te-ts-common/dto/IntrospectionResponse';
import { OrderContext } from './OrderContext';

export interface OrderProcessor {
  toOrder(
    context: OrderContext,
    introspection: IntrospectionResponse,
    info: CredentialRequestInfo
  ): CredentialIssuanceOrder;
}
