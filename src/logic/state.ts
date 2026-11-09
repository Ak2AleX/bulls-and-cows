import { evaluateGuess } from './evaluate.js';
import { isValidGuess } from './validate.js';

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
  return {
    settings,
    secret,
    history: [],
    status: 'playing',
    startedAt: now,
    finishedAt: null,
  };
}

export function addGuess(
  state: GameState,
  guess: string,
  now: number,
): GameState {
  const normalized = guess.toLowerCase();
  const { length, base } = state.settings;
  const isRepeat = state.history.some((entry) => entry.guess === normalized);

  if (
    state.status !== 'playing' ||
    !isValidGuess(normalized, length, base) ||
    isRepeat
  ) {
    return state;
  }

  const { bulls, cows } = evaluateGuess(state.secret, normalized);
  const entry: HistoryEntry = { guess: normalized, bulls, cows };
  const won = bulls === length;

  return {
    ...state,
    history: [...state.history, entry],
    status: won ? 'won' : 'playing',
    finishedAt: won ? now : null,
  };
}
