import { h } from '../dom.js';
import { formatDuration, sanitizeGuess } from '../logic/input.js';
import type { GameRecord } from '../logic/leaderboard.js';
import { BASE_LABELS } from '../logic/settings.js';
import type { GameState } from '../logic/state.js';

type View = {
  readonly game: GameState;
  readonly message: string;
  readonly records: readonly GameRecord[];
  readonly now: number;
};

type Handlers = {
  readonly onGuess: (guess: string) => void;
  readonly onNewGame: () => void;
};

const cell = (tag: 'th' | 'td', text: string) => h(tag, { textContent: text });

function recordsTable(records: readonly GameRecord[]): HTMLElement {
  return h(
    'table',
    {},
    h(
      'thead',
      {},
      h('tr', {}, cell('th', '#'), cell('th', 'Попытки'), cell('th', 'Время')),
    ),
    h(
      'tbody',
      {},
      ...records.map((record, i) =>
        h(
          'tr',
          {},
          cell('td', String(i + 1)),
          cell('td', String(record.attempts)),
          cell('td', formatDuration(record.timeMs)),
        ),
      ),
    ),
  );
}

export function gameScreen(
  { game, message, records, now }: View,
  { onGuess, onNewGame }: Handlers,
): HTMLElement {
  const { length, base } = game.settings;
  const won = game.status === 'won';
  const elapsed = (game.finishedAt ?? now) - game.startedAt;

  const input = h('input', {
    id: 'guess',
    type: 'text',
    maxLength: length,
    autocomplete: 'off',
    disabled: won,
    placeholder: `${length} разных цифр`,
    oninput: (event) => {
      const field = event.target as HTMLInputElement;
      field.value = sanitizeGuess(field.value, length, base);
    },
    onkeydown: (event) => {
      if (event.key === 'Enter')
        onGuess((event.target as HTMLInputElement).value);
    },
  });

  const history = h(
    'ol',
    {},
    ...game.history.map((entry) =>
      h('li', {
        textContent: `${entry.guess}: быки ${entry.bulls}, коровы ${entry.cows}`,
      }),
    ),
  );

  const result = [
    h('p', {
      textContent: `Угадано! Попыток: ${game.history.length}, время: ${formatDuration(elapsed)}`,
    }),
    h('h2', { textContent: 'Таблица рекордов' }),
    recordsTable(records),
    h('button', { textContent: 'Новая игра', onclick: onNewGame }),
  ];

  return h(
    'main',
    {},
    h('h1', { textContent: 'Bulls and Cows' }),
    h('p', { textContent: `Система: ${BASE_LABELS[base]}, длина: ${length}` }),
    h(
      'p',
      {},
      'Время: ',
      h('span', { id: 'timer', textContent: formatDuration(elapsed) }),
    ),
    h(
      'div',
      {},
      input,
      h('button', {
        textContent: 'Проверить',
        disabled: won,
        onclick: () => onGuess(input.value),
      }),
    ),
    h('p', { textContent: message }),
    history,
    ...(won ? result : []),
  );
}
