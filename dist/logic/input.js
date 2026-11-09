import { createDigitValidator } from './digits.js';
export function sanitizeGuess(raw, length, base) {
    return [...raw.toLowerCase()]
        .filter(createDigitValidator(base))
        .slice(0, length)
        .join('');
}
const pad = (n) => String(n).padStart(2, '0');
export function formatDuration(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    return `${Math.floor(totalSeconds / 60)}:${pad(totalSeconds % 60)}`;
}
