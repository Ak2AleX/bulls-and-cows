export const LENGTHS = [2, 3, 4, 5, 6] as const;
export const BASES = [2, 8, 10, 16] as const;
export const TOP_N = 10;

export function availableLengths(base: number): number[] {
  return LENGTHS.filter((length) => length <= base);
}

import type { Settings } from './state.js';

export const BASE_LABELS: Readonly<Record<number, string>> = {
  2: 'bin',
  8: 'oct',
  10: 'dec',
  16: 'hex',
};

export function normalizeSettings(settings: Settings): Settings {
  throw new Error(`not implemented: ${settings.base}`);
}
