import { describe, expect, it } from 'vitest';
import { parseRecords } from '../src/logic/leaderboard.js';

describe('parseRecords', () => {
  it('returns an empty list when nothing is stored', () => {
    expect(parseRecords(null)).toEqual([]);
  });

  it('returns an empty list for an empty string', () => {
    expect(parseRecords('')).toEqual([]);
  });

  it('returns an empty list for invalid JSON', () => {
    expect(parseRecords('{not json')).toEqual([]);
  });

  it('returns an empty list when the JSON is not an array', () => {
    expect(parseRecords('{"attempts":3,"timeMs":1000}')).toEqual([]);
    expect(parseRecords('42')).toEqual([]);
    expect(parseRecords('"text"')).toEqual([]);
  });

  it('restores a list that was saved with JSON.stringify', () => {
    const records = [
      { attempts: 3, timeMs: 12000 },
      { attempts: 5, timeMs: 9000 },
    ];
    expect(parseRecords(JSON.stringify(records))).toEqual(records);
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
    expect(parseRecords(raw)).toEqual([{ attempts: 3, timeMs: 12000 }]);
  });

  it('keeps only attempts and timeMs from each entry', () => {
    const raw = JSON.stringify([{ attempts: 2, timeMs: 1000, extra: 'x' }]);
    expect(parseRecords(raw)).toEqual([{ attempts: 2, timeMs: 1000 }]);
  });
});
