import { createDigitValidator } from './digits.js';
export function isValidGuess(guess, length, base) {
    const chars = [...guess.toLowerCase()];
    return (chars.length === length &&
        chars.every(createDigitValidator(base)) &&
        new Set(chars).size === length);
}
