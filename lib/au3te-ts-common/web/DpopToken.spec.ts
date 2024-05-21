import { describe, expect, it } from 'vitest';
import { DpopToken } from './DpopToken';

describe('DpopToken', () => {
  it('should parse valid input', () => {
    const input_upper = 'DPoP abc123';
    const input_lower = 'dpop abc123';
    const result_upper = DpopToken.parse(input_upper);
    const result_lower = DpopToken.parse(input_lower);
    expect(result_upper).toBe('abc123');
    expect(result_lower).toBe('abc123');
  });

  it('should return undefined for empty input', () => {
    const input = '';
    const result = DpopToken.parse(input);
    expect(result).toBeUndefined();
  });

  it('should return undefined for invalid input', () => {
    const input = 'Invalid input';
    const result = DpopToken.parse(input);
    expect(result).toBeUndefined();
  });
});
