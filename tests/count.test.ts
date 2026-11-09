import { describe, expect, it } from 'vitest';
import { countPossibleSecrets } from '../src/logic/count.js';

describe('countPossibleSecrets', () => {
  it('returns base for length 1', () => {
    expect(countPossibleSecrets(1, 10)).toBe(10);
  });

  it('counts decimal secrets of length 4', () => {
    expect(countPossibleSecrets(4, 10)).toBe(5040);
  });

  it('counts secrets that may start with zero', () => {
    expect(countPossibleSecrets(2, 2)).toBe(2);
  });

  it('counts octal secrets of length 3', () => {
    expect(countPossibleSecrets(3, 8)).toBe(336);
  });

  it('counts hex secrets of length 6', () => {
    expect(countPossibleSecrets(6, 16)).toBe(5765760);
  });

  it('returns 0 when length exceeds base', () => {
    expect(countPossibleSecrets(3, 2)).toBe(0);
  });
});
