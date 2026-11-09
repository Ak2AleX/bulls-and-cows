import { describe, expect, it } from 'vitest';
import { evaluateGuess } from '../src/logic/evaluate.js';

describe('evaluateGuess', () => {
  it('counts all bulls for an exact match', () => {
    expect(evaluateGuess('0123', '0123')).toEqual({ bulls: 4, cows: 0 });
  });

  it('returns zeros when nothing matches', () => {
    expect(evaluateGuess('0123', '4567')).toEqual({ bulls: 0, cows: 0 });
  });

  it('counts all cows when every digit is misplaced', () => {
    expect(evaluateGuess('0123', '3210')).toEqual({ bulls: 0, cows: 4 });
  });

  it('counts bulls and cows together', () => {
    expect(evaluateGuess('0123', '0132')).toEqual({ bulls: 2, cows: 2 });
    expect(evaluateGuess('1234', '1356')).toEqual({ bulls: 1, cows: 1 });
  });

  it('ignores case for hex digits', () => {
    expect(evaluateGuess('ab12', 'AB12')).toEqual({ bulls: 4, cows: 0 });
    expect(evaluateGuess('ab12', 'BA12')).toEqual({ bulls: 2, cows: 2 });
  });

  it('does not depend on the case of the secret', () => {
    expect(evaluateGuess('AB12', 'ab12')).toEqual({ bulls: 4, cows: 0 });
  });
});
