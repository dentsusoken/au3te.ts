import { describe, it, expect } from 'vitest';
import { ServiceConfigurationRequest } from './ServiceConfigurationRequest';

describe('ServiceConfigurationRequest', () => {
  it('should initialize with default values', () => {
    const request = new ServiceConfigurationRequest();
    expect(request.isPretty()).toBeUndefined();
    expect(request.getPatch()).toBeUndefined();
  });

  it('should initialize with provided values', () => {
    const request = new ServiceConfigurationRequest(true, 'patchData');
    expect(request.isPretty()).toBe(true);
    expect(request.getPatch()).toBe('patchData');
  });

  it('should set and get pretty', () => {
    const request = new ServiceConfigurationRequest();
    request.setPretty(true);
    expect(request.isPretty()).toBe(true);

    request.setPretty(false);
    expect(request.isPretty()).toBe(false);
  });

  it('should set and get patch', () => {
    const request = new ServiceConfigurationRequest();
    request.setPatch('patchData');
    expect(request.getPatch()).toBe('patchData');

    request.setPatch(undefined);
    expect(request.getPatch()).toBeUndefined();
  });
});
