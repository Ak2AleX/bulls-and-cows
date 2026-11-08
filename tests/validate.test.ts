import { describe, expect, it } from 'vitest';
import { isValidGuess } from '../src/logic/validate.js';

describe('isValidGuess', () => {
  it('accepts a correct guess', () => {
    expect(isValidGuess('0123', 4, 10)).toBe(true);
  });

  it('rejects a guess of the wrong length', () => {
    expect(isValidGuess('012', 4, 10)).toBe(false);
    expect(isValidGuess('01234', 4, 10)).toBe(false);
    expect(isValidGuess('', 4, 10)).toBe(false);
  });

  it('rejects characters outside the alphabet of the base', () => {
    expect(isValidGuess('0123', 4, 2)).toBe(false);
    expect(isValidGuess('12ag', 4, 16)).toBe(false);
  });

  it('rejects repeated digits', () => {
    expect(isValidGuess('1123', 4, 10)).toBe(false);
    expect(isValidGuess('1213', 4, 10)).toBe(false);
  });

  it('rejects characters with surrounding whitespace', () => {
    expect(isValidGuess(' 123', 4, 10)).toBe(false);
    expect(isValidGuess('123 ', 4, 10)).toBe(false);
  });

  it('treats hex digits case-insensitively', () => {
    expect(isValidGuess('aBc1', 4, 16)).toBe(true);
    expect(isValidGuess('aA12', 4, 16)).toBe(false);
  });

  it('works for binary with length 2', () => {
    expect(isValidGuess('01', 2, 2)).toBe(true);
    expect(isValidGuess('00', 2, 2)).toBe(false);
  });
});
