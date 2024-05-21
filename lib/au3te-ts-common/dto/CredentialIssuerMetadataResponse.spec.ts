import { beforeEach, describe, expect, it } from 'vitest';
import {
  Action,
  CredentialIssuerMetadataResponse,
} from '../dto/CredentialIssuerMetadataResponse';

describe('CredentialIssuerMetadataResponse', () => {
  let response: CredentialIssuerMetadataResponse;

  beforeEach(() => {
    response = new CredentialIssuerMetadataResponse();
  });

  it('should set and get the action', () => {
    response.setAction(Action.OK);
    expect(response.getAction()).toBe(Action.OK);

    response.setAction(Action.NOT_FOUND);
    expect(response.getAction()).toBe(Action.NOT_FOUND);

    response.setAction(Action.INTERNAL_SERVER_ERROR);
    expect(response.getAction()).toBe(Action.INTERNAL_SERVER_ERROR);
  });

  it('should set and get the response content', () => {
    const content = 'Sample response content';

    response.setResponseContent(content);
    expect(response.getResponseContent()).toBe(content);
  });

  it('should have undefined action and response content by default', () => {
    expect(response.getAction()).toBeUndefined();
    expect(response.getResponseContent()).toBeUndefined();
  });
});
