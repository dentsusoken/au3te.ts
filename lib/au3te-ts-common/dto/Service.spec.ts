import { describe, it, expect } from 'vitest';
import { Service } from './Service';

describe('Service', () => {
  it('should set and get serviceName', () => {
    const service = new Service();
    service.setServiceName('testService');
    expect(service.getServiceName()).toBe('testService');
  });

  it('should allow updating serviceName', () => {
    const service = new Service();
    service.setServiceName('initialService');
    expect(service.getServiceName()).toBe('initialService');

    service.setServiceName('updatedService');
    expect(service.getServiceName()).toBe('updatedService');
  });
});
