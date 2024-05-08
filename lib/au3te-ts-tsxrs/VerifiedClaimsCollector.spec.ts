import { describe, expect, it } from 'vitest';
import { StringArray } from '../au3te-ts-common/dto/StringArray';
import { VerifiedClaimsCollector } from './VerifiedClaimsCollector';

describe('VerifiedClaimsCollector', () => {
  it('should collect verified claims', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const collector = new VerifiedClaimsCollector((_subject, _request) => {
      // Mock implementation of the getter function
      // Replace this with your own implementation for testing
      return { claim1: 'value1', claim2: 'value2' };
    });

    const claims = { claim3: 'value3' };
    const subject = 'testSubject';
    const claimsRequest = '{"verified_claims": {"claim1": "value1"}}';

    const result = collector.collect(claims, subject, claimsRequest);

    expect(result).toEqual({
      claim3: 'value3',
      verified_claims: { claim1: 'value1', claim2: 'value2' },
    });
  });

  it('should extract verified claims request', () => {
    const collector = new VerifiedClaimsCollector(() => {});

    const claimsRequest = '{"verified_claims": {"claim1": "value1"}}';

    const result = collector.extractVerifiedClaimsRequest(claimsRequest);

    expect(result).toEqual({ claim1: 'value1' });
  });

  it('should collect verified claims for transaction', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const collector = new VerifiedClaimsCollector((_subject, _request) => {
      // Mock implementation of the getter function
      // Replace this with your own implementation for testing
      return { claim1: 'value1', claim2: 'value2' };
    });

    const subject = 'testSubject';
    const claimsRequest =
      '{"verified_claims": {"claim1": "value1", "claim2": "value2"}}';
    const requestedVerifiedClaimsForTx = [
      new StringArray().setArray(['claim1']),
      new StringArray().setArray(['claim2']),
    ];

    const result = collector.collectForTx(
      subject,
      claimsRequest,
      requestedVerifiedClaimsForTx
    );

    expect(result).toEqual([{}, {}]);
  });
});
