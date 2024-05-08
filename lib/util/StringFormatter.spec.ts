import { describe, expect, it } from 'vitest';
import { format } from './StringFormatter';

describe('StringFormatter', () => {
  describe('format', () => {
    it('should replace placeholders with provided arguments', () => {
      const result = format('Hello, {}! Today is {}.', 'John', 'Monday');
      expect(result).toEqual('Hello, John! Today is Monday.');
    });

    it('should throw error if few arguments are provided', () => {
      expect(() => format('Hello, {}! Today is {}.')).toThrowError(
        'The number of placeholders does not match the number of arguments.'
      );
    });
  });
});
