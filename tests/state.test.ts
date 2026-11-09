import { describe, expect, it } from 'vitest';
import { addGuess, startGame } from '../src/logic/state.js';

const decimal = { length: 4, base: 10 };

describe('startGame', () => {
  it('creates a fresh game with an empty history', () => {
    const state = startGame(decimal, '0123', 1000);
    expect(state).toEqual({
      settings: decimal,
      secret: '0123',
      history: [],
      status: 'playing',
      startedAt: 1000,
      finishedAt: null,
    });
  });
});

describe('addGuess', () => {
  it('appends an entry with bulls and cows', () => {
    const state = addGuess(startGame(decimal, '0123', 0), '0132', 10);
    expect(state.history).toEqual([{ guess: '0132', bulls: 2, cows: 2 }]);
    expect(state.status).toBe('playing');
  });

  it('does not mutate the previous state', () => {
    const before = startGame(decimal, '0123', 0);
    const after = addGuess(before, '0132', 10);
    expect(after).not.toBe(before);
    expect(before.history).toEqual([]);
  });

  it('keeps old entries unchanged and in order', () => {
    const first = addGuess(startGame(decimal, '0123', 0), '0132', 10);
    const second = addGuess(first, '4567', 20);
    expect(second.history[0]).toBe(first.history[0]);
    expect(second.history.map((e) => e.guess)).toEqual(['0132', '4567']);
  });

  it('wins when bulls equal the length and records the finish time', () => {
    const state = addGuess(startGame(decimal, '0123', 1000), '0123', 4000);
    expect(state.status).toBe('won');
    expect(state.finishedAt).toBe(4000);
  });

  it('ignores a repeated guess', () => {
    const first = addGuess(startGame(decimal, '0123', 0), '0132', 10);
    expect(addGuess(first, '0132', 20)).toBe(first);
  });

  it('treats guesses that differ only in case as repeats', () => {
    const hex = { length: 4, base: 16 };
    const first = addGuess(startGame(hex, 'ab12', 0), 'ba12', 10);
    expect(addGuess(first, 'BA12', 20)).toBe(first);
  });

  it('ignores an invalid guess', () => {
    const state = startGame(decimal, '0123', 0);
    expect(addGuess(state, '12', 10)).toBe(state);
    expect(addGuess(state, '1123', 10)).toBe(state);
  });

  it('ignores guesses after the game is won', () => {
    const won = addGuess(startGame(decimal, '0123', 0), '0123', 10);
    expect(addGuess(won, '4567', 20)).toBe(won);
  });
});
