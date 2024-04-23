import { beforeEach, describe, expect, it } from 'vitest';
import Settings from './Settings';

describe('Settings', () => {
  let settings: Settings;

  beforeEach(() => {
    settings = new Settings();
  });

  describe('getConnectionTimeout', () => {
    it('should return the default connection timeout', () => {
      const timeout = settings.getConnectionTimeout();
      expect(timeout).toBe(0);
    });
  });

  describe('setConnectionTimeout', () => {
    it('should set the connection timeout', () => {
      const timeout = 5000;
      settings.setConnectionTimeout(timeout);
      const updatedTimeout = settings.getConnectionTimeout();
      expect(updatedTimeout).toBe(timeout);
    });

    it('should throw an error for negative timeout value', () => {
      expect(() => settings.setConnectionTimeout(-1000)).toThrowError(
        'timeout value cannot be negative.'
      );
    });
  });

  describe('getReadTimeout', () => {
    it('should return the default read timeout', () => {
      const timeout = settings.getReadTimeout();
      expect(timeout).toBe(0);
    });
  });

  describe('setReadTimeout', () => {
    it('should set the read timeout', () => {
      const timeout = 3000;
      settings.setReadTimeout(timeout);
      const updatedTimeout = settings.getReadTimeout();
      expect(updatedTimeout).toBe(timeout);
    });

    it('should throw an error for negative timeout value', () => {
      expect(() => settings.setReadTimeout(-2000)).toThrowError(
        'timeout value cannot be negative.'
      );
    });
  });
});
