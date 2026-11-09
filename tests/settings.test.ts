import { describe, expect, it } from 'vitest';
import { availableLengths } from '../src/logic/settings.js';

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
