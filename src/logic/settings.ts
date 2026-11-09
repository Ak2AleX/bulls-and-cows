export const LENGTHS = [2, 3, 4, 5, 6] as const;
export const BASES = [2, 8, 10, 16] as const;
export const TOP_N = 10;

export function availableLengths(base: number): number[] {
  return LENGTHS.filter((length) => length <= base);
}
