import { describe, it, expect } from 'vitest';
import { AuthzDetails } from './AuthzDetails';
import { AuthzDetailsElement } from './AuthzDetailsElement';

describe('AuthzDetails', () => {
  it('should set and get elements', () => {
    const details = new AuthzDetails();
    const elements: AuthzDetailsElement[] = [new AuthzDetailsElement()];
    details.setElements(elements);
    expect(details.getElements()).toBe(elements);
  });

  it('should convert to JSON', () => {
    const details = new AuthzDetails();
    const elements: AuthzDetailsElement[] = [new AuthzDetailsElement()];
    details.setElements(elements);
    const json = details.toJson();
    expect(json).toBe(JSON.stringify(details));
  });

  it('should create instance from JSON', () => {
    const elements: AuthzDetailsElement[] = [
      new AuthzDetailsElement().setType('test'),
    ];
    const json = JSON.stringify(elements);
    const details = AuthzDetails.fromJson(json);
    expect(details.getElements()).toEqual([{ type: 'test' }]);
  });

  it('should handle empty JSON', () => {
    const json = '{}';
    const details = AuthzDetails.fromJson(json);
    expect(details.getElements()).toEqual([]);
  });

  it('should handle array JSON', () => {
    const elements: AuthzDetailsElement[] = [new AuthzDetailsElement()];
    const json = JSON.stringify(elements);
    const details = AuthzDetails.fromJson(json);
    expect(details.getElements()).toEqual(elements);
  });
});
