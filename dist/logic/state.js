import { evaluateGuess } from './evaluate.js';
import { isValidGuess } from './validate.js';
export function startGame(settings, secret, now) {
    return {
        settings,
        secret,
        history: [],
        status: 'playing',
        startedAt: now,
        finishedAt: null,
    };
}
export function addGuess(state, guess, now) {
    const normalized = guess.toLowerCase();
    const { length, base } = state.settings;
    const isRepeat = state.history.some((entry) => entry.guess === normalized);
    if (state.status !== 'playing' ||
        !isValidGuess(normalized, length, base) ||
        isRepeat) {
        return state;
    }
    const { bulls, cows } = evaluateGuess(state.secret, normalized);
    const entry = { guess: normalized, bulls, cows };
    const won = bulls === length;
    return {
        ...state,
        history: [...state.history, entry],
        status: won ? 'won' : 'playing',
        finishedAt: won ? now : null,
    };
}
