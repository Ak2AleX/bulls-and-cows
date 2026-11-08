import { describe, expect, it } from 'vitest';
import { createDigitValidator } from '../src/logic/digits.js';

describe('createDigitValidator', () => {
  it('accepts only 0 and 1 in binary', () => {
    const isDigit = createDigitValidator(2);
    expect(isDigit('0')).toBe(true);
    expect(isDigit('1')).toBe(true);
    expect(isDigit('2')).toBe(false);
  });

  it('accepts 0-9 and rejects letters in decimal', () => {
    const isDigit = createDigitValidator(10);
    expect([...'0123456789'].every(isDigit)).toBe(true);
    expect(isDigit('a')).toBe(false);
  });

  it('accepts hex digits in either case', () => {
    const isDigit = createDigitValidator(16);
    expect(isDigit('a')).toBe(true);
    expect(isDigit('A')).toBe(true);
    expect(isDigit('F')).toBe(true);
    expect(isDigit('g')).toBe(false);
  });

  it('rejects empty and multi-character strings', () => {
    const isDigit = createDigitValidator(16);
    expect(isDigit('')).toBe(false);
    expect(isDigit('01')).toBe(false);
  });

  it('keeps validators for different bases independent', () => {
    const bin = createDigitValidator(2);
    const hex = createDigitValidator(16);
    expect(bin('f')).toBe(false);
    expect(hex('f')).toBe(true);
  });
});
