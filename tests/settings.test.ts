import { describe, expect, it } from 'vitest';
import { availableLengths, normalizeSettings } from '../src/logic/settings.js';

describe('availableLengths', () => {
  it('allows only length 2 in binary', () => {
    expect(availableLengths(2)).toEqual([2]);
  });

  it('allows all lengths in octal, decimal and hex', () => {
    expect(availableLengths(8)).toEqual([2, 3, 4, 5, 6]);
    expect(availableLengths(10)).toEqual([2, 3, 4, 5, 6]);
    expect(availableLengths(16)).toEqual([2, 3, 4, 5, 6]);
  });

  it('never offers a length greater than the base', () => {
    expect(availableLengths(4)).toEqual([2, 3, 4]);
  });
});

describe('normalizeSettings', () => {
  it('keeps settings unchanged when the length is available', () => {
    const settings = { length: 4, base: 10 };
    expect(normalizeSettings(settings)).toBe(settings);
  });

  it('lowers the length to 2 when switching to binary', () => {
    expect(normalizeSettings({ length: 5, base: 2 })).toEqual({
      length: 2,
      base: 2,
    });
  });

  it('does not change the base', () => {
    expect(normalizeSettings({ length: 6, base: 2 }).base).toBe(2);
  });

  it('does not mutate the input', () => {
    const settings = { length: 5, base: 2 };
    normalizeSettings(settings);
    expect(settings).toEqual({ length: 5, base: 2 });
  });
});
