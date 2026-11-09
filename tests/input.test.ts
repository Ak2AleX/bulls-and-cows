import { describe, expect, it } from 'vitest';
import { formatDuration, sanitizeGuess } from '../src/logic/input.js';

describe('sanitizeGuess', () => {
  it('removes characters that are not digits of the base', () => {
    expect(sanitizeGuess('12ab', 4, 10)).toBe('12');
    expect(sanitizeGuess(' 1 2-', 4, 10)).toBe('12');
  });

  it('keeps hex letters and lowercases them', () => {
    expect(sanitizeGuess('A1', 4, 16)).toBe('a1');
    expect(sanitizeGuess('Fg', 4, 16)).toBe('f');
  });

  it('cuts the input to the secret length', () => {
    expect(sanitizeGuess('123456', 4, 10)).toBe('1234');
  });

  it('returns an empty string for an empty input', () => {
    expect(sanitizeGuess('', 4, 10)).toBe('');
  });

  it('rejects digits outside a small base', () => {
    expect(sanitizeGuess('0123', 2, 2)).toBe('01');
  });
});

describe('formatDuration', () => {
  it('formats zero', () => {
    expect(formatDuration(0)).toBe('0:00');
  });

  it('drops milliseconds', () => {
    expect(formatDuration(3500)).toBe('0:03');
  });

  it('pads seconds and counts minutes', () => {
    expect(formatDuration(65000)).toBe('1:05');
    expect(formatDuration(600000)).toBe('10:00');
  });
});
