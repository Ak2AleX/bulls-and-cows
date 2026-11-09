export type GuessResult = { readonly bulls: number; readonly cows: number };

// export function evaluateGuess(secret: string, guess: string): GuessResult {
//   const s = [...secret.toLowerCase()];
//   const g = [...guess.toLowerCase()];
//   const bulls = g.filter((char, i) => char === s[i]).length;
//   const cows = g.filter((char, i) => char !== s[i] && s.includes(char)).length;
//   return { bulls, cows };
// }

export function evaluateGuess(secret: string, guess: string): GuessResult {
  const secretChars = [...secret.toLowerCase()];
  const guessChars = [...guess.toLowerCase()];
  const bulls = guessChars.filter((char, i) => char === secretChars[i]).length;
  const cows = guessChars.filter(
    (char, i) => char !== secretChars[i] && secretChars.includes(char),
  ).length;
  return { bulls, cows };
}
