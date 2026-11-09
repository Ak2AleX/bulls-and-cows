import {
  addRecord,
  leaderboardKey,
  parseStoredRecords,
  type GameRecord,
} from './logic/leaderboard.js';
import { TOP_N } from './logic/settings.js';
import type { Settings } from './logic/state.js';

export function loadRecords(settings: Settings): GameRecord[] {
  try {
    return parseStoredRecords(localStorage.getItem(leaderboardKey(settings)));
  } catch {
    return [];
  }
}

export function saveRecord(
  settings: Settings,
  record: GameRecord,
): GameRecord[] {
  const updated = addRecord(loadRecords(settings), record, TOP_N);
  try {
    localStorage.setItem(leaderboardKey(settings), JSON.stringify(updated));
  } catch {
    // Игра продолжает работать если вкл приватный режим, но рекорд не сохранится
  }
  return updated;
}
