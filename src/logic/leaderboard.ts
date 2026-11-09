import type { GameState, Settings } from './state.js';

export type GameRecord = { readonly attempts: number; readonly timeMs: number };

export function leaderboardKey(settings: Settings): string {
  return `bc-records-${settings.length}-${settings.base}`;
}

export function toRecord(state: GameState): GameRecord | null {
  if (state.status !== 'won' || state.finishedAt === null) return null;
  return {
    attempts: state.history.length,
    timeMs: state.finishedAt - state.startedAt,
  };
}

const byAttemptsThenTime = (a: GameRecord, b: GameRecord): number =>
  a.attempts - b.attempts || a.timeMs - b.timeMs;

export function addRecord(
  records: readonly GameRecord[],
  record: GameRecord,
  topN: number,
): GameRecord[] {
  return [...records, record].sort(byAttemptsThenTime).slice(0, topN);
}
