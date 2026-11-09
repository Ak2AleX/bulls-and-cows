import { describe, expect, it } from 'vitest';
import {
  addRecord,
  leaderboardKey,
  toRecord,
} from '../src/logic/leaderboard.js';
import { addGuess, startGame } from '../src/logic/state.js';

const decimal = { length: 4, base: 10 };

describe('leaderboardKey', () => {
  it('builds a separate key for each length and base', () => {
    expect(leaderboardKey({ length: 4, base: 10 })).toBe('bc-records-4-10');
    expect(leaderboardKey({ length: 2, base: 2 })).toBe('bc-records-2-2');
  });
});

describe('toRecord', () => {
  it('returns attempts and elapsed time for a won game', () => {
    const playing = addGuess(startGame(decimal, '0123', 1000), '4567', 2000);
    const won = addGuess(playing, '0123', 4500);
    expect(toRecord(won)).toEqual({ attempts: 2, timeMs: 3500 });
  });

  it('returns null while the game is still in progress', () => {
    const state = addGuess(startGame(decimal, '0123', 0), '4567', 10);
    expect(toRecord(state)).toBeNull();
  });
});

describe('addRecord', () => {
  it('adds a record to an empty list', () => {
    expect(addRecord([], { attempts: 5, timeMs: 9000 }, 10)).toEqual([
      { attempts: 5, timeMs: 9000 },
    ]);
  });

  it('sorts by attempts, fewer first', () => {
    const records = [{ attempts: 7, timeMs: 1000 }];
    const result = addRecord(records, { attempts: 3, timeMs: 5000 }, 10);
    expect(result.map((r) => r.attempts)).toEqual([3, 7]);
  });

  it('breaks ties by time, faster first', () => {
    const records = [{ attempts: 4, timeMs: 8000 }];
    const result = addRecord(records, { attempts: 4, timeMs: 6000 }, 10);
    expect(result.map((r) => r.timeMs)).toEqual([6000, 8000]);
  });

  it('keeps only the top N records', () => {
    const records = [
      { attempts: 2, timeMs: 1000 },
      { attempts: 3, timeMs: 1000 },
      { attempts: 4, timeMs: 1000 },
    ];
    const result = addRecord(records, { attempts: 1, timeMs: 1000 }, 3);
    expect(result.map((r) => r.attempts)).toEqual([1, 2, 3]);
  });

  it('drops a new record that does not make the top N', () => {
    const records = [
      { attempts: 2, timeMs: 1000 },
      { attempts: 3, timeMs: 1000 },
    ];
    expect(addRecord(records, { attempts: 9, timeMs: 1000 }, 2)).toEqual(
      records,
    );
  });

  it('does not mutate the original list', () => {
    const records = [{ attempts: 7, timeMs: 1000 }];
    const result = addRecord(records, { attempts: 3, timeMs: 5000 }, 10);
    expect(records).toEqual([{ attempts: 7, timeMs: 1000 }]);
    expect(result).not.toBe(records);
  });
});
