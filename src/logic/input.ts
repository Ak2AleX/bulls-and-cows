import { createDigitValidator } from './digits.js';

export function sanitizeGuess(
  raw: string,
  length: number,
  base: number,
): string {
  return [...raw.toLowerCase()]
    .filter(createDigitValidator(base))
    .slice(0, length)
    .join('');
}

const pad = (n: number): string => String(n).padStart(2, '0');

export function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  return `${Math.floor(totalSeconds / 60)}:${pad(totalSeconds % 60)}`;
}
