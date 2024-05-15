import { describe, expect, it } from 'vitest';
import { ObbUtils } from './ObbUtils';

describe('ObbUtils', () => {
  describe('formatDate', () => {
    it('should format the date correctly', () => {
      const date = new Date('2022-01-01T00:00:00Z');
      const formattedDate = ObbUtils.formatDate(date);
      expect(formattedDate).toBe('2022-01-01T00:00:00.000Z');
    });
  });

  describe('formatNow', () => {
    it('should format the current date correctly', () => {
      const formattedNow = ObbUtils.formatNow();
      const currentDate = new Date();
      const formattedCurrentDate = ObbUtils.formatDate(currentDate);
      expect(formattedNow).toBe(formattedCurrentDate);
    });
  });

  describe('extractConsentScope', () => {
    it('should return the consent scope if it exists in the array', () => {
      const scopes = ['scope1', 'consent:scope2', 'scope3'];
      const consentScope = ObbUtils.extractConsentScope(scopes);
      expect(consentScope).toBe('consent:scope2');
    });

    it('should return undefined if the consent scope does not exist in the array', () => {
      const scopes = ['scope1', 'scope2', 'scope3'];
      const consentScope = ObbUtils.extractConsentScope(scopes);
      expect(consentScope).toBeUndefined();
    });

    it('should return undefined if the scopes array is empty', () => {
      const scopes: string[] = [];
      const consentScope = ObbUtils.extractConsentScope(scopes);
      expect(consentScope).toBeUndefined();
    });

    it('should return undefined if the scopes array is null', () => {
      const scopes = undefined;
      const consentScope = ObbUtils.extractConsentScope(scopes!);
      expect(consentScope).toBeUndefined();
    });
  });
});
