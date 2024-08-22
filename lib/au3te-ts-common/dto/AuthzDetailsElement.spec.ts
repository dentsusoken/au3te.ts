import { describe, it, expect } from 'vitest';
import { AuthzDetailsElement } from './AuthzDetailsElement';

describe('AuthzDetailsElement', () => {
  it('should set and get type', () => {
    const element = new AuthzDetailsElement();
    element.setType('type');
    expect(element.getType()).toBe('type');
  });

  it('should set and get locations', () => {
    const element = new AuthzDetailsElement();
    const locations = ['location1', 'location2'];
    element.setLocations(locations);
    expect(element.getLocations()).toBe(locations);
  });

  it('should set and get actions', () => {
    const element = new AuthzDetailsElement();
    const actions = ['action1', 'action2'];
    element.setActions(actions);
    expect(element.getActions()).toBe(actions);
  });

  it('should set and get dataTypes', () => {
    const element = new AuthzDetailsElement();
    const dataTypes = ['dataType1', 'dataType2'];
    element.setDataTypes(dataTypes);
    expect(element.getDataTypes()).toBe(dataTypes);
  });

  it('should set and get identifier', () => {
    const element = new AuthzDetailsElement();
    element.setIdentifier('identifier');
    expect(element.getIdentifier()).toBe('identifier');
  });

  it('should set and get privileges', () => {
    const element = new AuthzDetailsElement();
    const privileges = ['privilege1', 'privilege2'];
    element.setPrivileges(privileges);
    expect(element.getPrivileges()).toBe(privileges);
  });

  it('should set and get otherFields', () => {
    const element = new AuthzDetailsElement();
    element.setOtherFields('{"key":"value"}');
    expect(element.getOtherFields()).toBe('{"key":"value"}');
  });

  it('should set and get otherFields as map', () => {
    const element = new AuthzDetailsElement();
    const otherFields = { key: 'value' };
    element.setOtherFieldsAsMap(otherFields);
    expect(element.getOtherFieldsAsMap()).toEqual(otherFields);
  });

  it('should convert to JSON', () => {
    const element = new AuthzDetailsElement();
    element.setType('type');
    const json = element.toJson();
    expect(json).toBe(JSON.stringify(element));
  });

  it('should create instance from JSON', () => {
    const json = JSON.stringify({
      type: 'type',
      locations: ['location1'],
      actions: ['action1'],
      dataTypes: ['dataType1'],
      identifier: 'identifier',
      privileges: ['privilege1'],
      otherFields: '{"key":"value"}',
    });
    const element = AuthzDetailsElement.fromJson(json);
    expect(element.getType()).toBe('type');
    expect(element.getLocations()).toEqual(['location1']);
    expect(element.getActions()).toEqual(['action1']);
    expect(element.getDataTypes()).toEqual(['dataType1']);
    expect(element.getIdentifier()).toBe('identifier');
    expect(element.getPrivileges()).toEqual(['privilege1']);
    expect(element.getOtherFields()).toBe('{"key":"value"}');
  });
});
