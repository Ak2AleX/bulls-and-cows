export type Settings = { readonly length: number; readonly base: number };

export type HistoryEntry = {
  readonly guess: string;
  readonly bulls: number;
  readonly cows: number;
};

export type GameState = {
  readonly settings: Settings;
  readonly secret: string;
  readonly history: readonly HistoryEntry[];
  readonly status: 'playing' | 'won';
  readonly startedAt: number;
  readonly finishedAt: number | null;
};

export function startGame(
  settings: Settings,
  secret: string,
  now: number,
): GameState {
  throw new Error(`not implemented: ${settings.length} ${secret} ${now}`);
}

export function addGuess(
  state: GameState,
  guess: string,
  now: number,
): GameState {
  throw new Error(`not implemented: ${state.status} ${guess} ${now}`);
}
