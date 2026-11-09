import type { GameState, Settings } from './state.js';

export type GameRecord = { readonly attempts: number; readonly timeMs: number };

export function leaderboardKey(settings: Settings): string {
  throw new Error(`not implemented: ${settings.length} ${settings.base}`);
}

export function toRecord(state: GameState): GameRecord | null {
  throw new Error(`not implemented: ${state.status}`);
}

export function addRecord(
  records: readonly GameRecord[],
  record: GameRecord,
  topN: number,
): GameRecord[] {
  throw new Error(
    `not implemented: ${records.length} ${record.attempts} ${topN}`,
  );
}
