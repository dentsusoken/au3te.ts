import { describe, expect, it } from 'vitest';
import { BearerToken } from '../web/BearerToken';

describe('BearerToken', () => {
  describe('parse', () => {
    it('should return the token when input is a valid Bearer token', () => {
      const input = 'Bearer abc123';
      const expected = 'abc123';
      const result = BearerToken.parse(input);
      expect(result).toEqual(expected);
    });

    it('should return undefined when input is not a valid Bearer token', () => {
      const input = 'InvalidToken';
      const result = BearerToken.parse(input);
      expect(result).toBeUndefined();
    });

    it('should return undefined when input is an empty string', () => {
      const input = '';
      const result = BearerToken.parse(input);
      expect(result).toBeUndefined();
    });
  });

  //   describe('extractFromFormParameters', () => {
  //     it('should return the token when input contains a valid Bearer token in form parameters', () => {
  //       const input =
  //         'grant_type=password&username=test&password=pass&access_token=Bearer abc123';
  //       const expected = 'abc123';
  //       const result = BearerToken.extractFromFormParameters(input);
  //       expect(result).toEqual(expected);
  //     });

  //     it('should return undefined when input does not contain a valid Bearer token in form parameters', () => {
  //       const input = 'grant_type=password&username=test&password=pass';
  //       const result = BearerToken.extractFromFormParameters(input);
  //       expect(result).toBeUndefined();
  //     });

  //     it('should return undefined when input is an empty string', () => {
  //       const input = '';
  //       const result = BearerToken.extractFromFormParameters(input);
  //       expect(result).toBeUndefined();
  //     });
  //   });
});
