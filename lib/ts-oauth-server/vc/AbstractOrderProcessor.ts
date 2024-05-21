import { CredentialIssuanceOrder } from '../../au3te-ts-common/dto/CredentialIssuanceOrder';
import { CredentialRequestInfo } from '../../au3te-ts-common/dto/CredentialRequestInfo';
import { IntrospectionResponse } from '../../au3te-ts-common/dto/IntrospectionResponse';
import { User } from '../../au3te-ts-common/types/User';
import { UserDao } from '../db/UserDao';
import { OrderContext } from './OrderContext';
import { OrderProcessor } from './OrderProcessor';

export abstract class AbstractOrderProcessor implements OrderProcessor {
  toOrder(
    context: OrderContext,
    introspection: IntrospectionResponse,
    info: CredentialRequestInfo
  ) {
    const subject = introspection.getSubject();
    const user = UserDao.getBySubject(subject || '');

    const issuableCredentials = this.parseJson(
      introspection.getIssuableCredentials() || '{}'
    );

    const reqestedCredential = this.parseJson(info.getDetails() || '{}');

    this.checkPermissions(
      context,
      issuableCredentials,
      info.getFormat() || '',
      reqestedCredential
    );

    const claims = this.collectClaims(
      context,
      user,
      info.getFormat() || '',
      reqestedCredential
    );

    const order = this.createOrder(info, claims);
    return order;
  }

  parseJson(json: string) {
    return JSON.parse(json);
  }

  createOrder(info: CredentialRequestInfo, claims: Record<string, unknown>) {
    const payload = claims ? JSON.stringify(claims) : undefined;
    const deferred = !payload;

    return new CredentialIssuanceOrder()
      .setRequestIdentifier(info.getIdentifier() || '')
      .setCredentialPayload(payload || '')
      .setIssuanceDeferred(deferred)
      .setCredentialDuration(this.computeCredentialDuration());
  }

  protected abstract checkPermissions(
    context: OrderContext,
    issuableCredentials: Record<string, unknown>[],
    format: string,
    reqestedCredential: Record<string, unknown>
  ): void;

  protected abstract collectClaims(
    context: OrderContext,
    user: User,
    format: string,
    reqestedCredential: Record<string, unknown>
  ): Record<string, unknown>;

  protected computeCredentialDuration() {
    return 0;
  }
}
