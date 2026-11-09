import { describe, expect, it } from 'vitest';
import { parseStoredRecords } from '../src/logic/leaderboard.js';

describe('parseStoredRecords', () => {
  it('returns an empty list when nothing is stored', () => {
    expect(parseStoredRecords(null)).toEqual([]);
  });

  it('returns an empty list for an empty string', () => {
    expect(parseStoredRecords('')).toEqual([]);
  });

  it('returns an empty list for invalid JSON', () => {
    expect(parseStoredRecords('{not json')).toEqual([]);
  });

  it('returns an empty list when the JSON is not an array', () => {
    expect(parseStoredRecords('{"attempts":3,"timeMs":1000}')).toEqual([]);
    expect(parseStoredRecords('42')).toEqual([]);
    expect(parseStoredRecords('"text"')).toEqual([]);
  });

  it('restores a list that was saved with JSON.stringify', () => {
    const records = [
      { attempts: 3, timeMs: 12000 },
      { attempts: 5, timeMs: 9000 },
    ];
    expect(parseStoredRecords(JSON.stringify(records))).toEqual(records);
  });

  it('drops entries with missing or wrongly typed fields', () => {
    const raw = JSON.stringify([
      { attempts: 3, timeMs: 12000 },
      { attempts: '4', timeMs: 5000 },
      { attempts: 6 },
      { timeMs: 7000 },
      null,
      'junk',
    ]);
    expect(parseStoredRecords(raw)).toEqual([{ attempts: 3, timeMs: 12000 }]);
  });

  it('keeps only attempts and timeMs from each entry', () => {
    const raw = JSON.stringify([{ attempts: 2, timeMs: 1000, extra: 'x' }]);
    expect(parseStoredRecords(raw)).toEqual([{ attempts: 2, timeMs: 1000 }]);
  });
});
