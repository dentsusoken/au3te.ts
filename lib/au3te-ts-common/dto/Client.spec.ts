import { describe, expect, test } from 'vitest';
import { Client } from './Client';

describe('Client', () => {
  const client = new Client();

  test('getClientName', () => {
    expect(client.getClientName()).toBeUndefined();
  });

  test('getLogoUri', () => {
    expect(client.getLogoUri()).toBeUndefined();
  });

  test('getClientUri', () => {
    expect(client.getClientUri()).toBeUndefined();
  });

  test('getPolicyUri', () => {
    expect(client.getPolicyUri()).toBeUndefined();
  });

  test('getTosUri', () => {
    expect(client.getTosUri()).toBeUndefined();
  });

  test('getDescription', () => {
    expect(client.getDescription()).toBeUndefined();
  });

  test('getSubjectType', () => {
    expect(client.getSubjectType()).toBeUndefined();
  });

  test('getDerivedSectorIdentifier', () => {
    expect(client.getDerivedSectorIdentifier()).toBeUndefined();
  });
});
