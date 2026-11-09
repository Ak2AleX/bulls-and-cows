export type GuessResult = { readonly bulls: number; readonly cows: number };

export function evaluateGuess(secret: string, guess: string): GuessResult {
  throw new Error(`not implemented: ${secret} ${guess}`);
}
