import { h } from '../dom.js';
import { formatDuration, sanitizeGuess } from '../logic/input.js';
import { BASE_LABELS } from '../logic/settings.js';
const cell = (tag, text) => h(tag, { textContent: text });
function recordsTable(records) {
    return h('table', {}, h('thead', {}, h('tr', {}, cell('th', '#'), cell('th', 'Попытки'), cell('th', 'Время'))), h('tbody', {}, ...records.map((record, i) => h('tr', {}, cell('td', String(i + 1)), cell('td', String(record.attempts)), cell('td', formatDuration(record.timeMs))))));
}
export function gameScreen({ game, message, records, now }, { onGuess, onNewGame }) {
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
            const field = event.target;
            field.value = sanitizeGuess(field.value, length, base);
        },
        onkeydown: (event) => {
            if (event.key === 'Enter')
                onGuess(event.target.value);
        },
    });
    const history = h('ol', {}, ...game.history.map((entry) => h('li', {
        textContent: `${entry.guess}: быки ${entry.bulls}, коровы ${entry.cows}`,
    })));
    const result = [
        h('p', {
            textContent: `Угадано! Попыток: ${game.history.length}, время: ${formatDuration(elapsed)}`,
        }),
        h('h2', { textContent: 'Таблица рекордов' }),
        recordsTable(records),
        h('button', { textContent: 'Новая игра', onclick: onNewGame }),
    ];
    return h('main', {}, h('h1', { textContent: 'Bulls and Cows' }), h('p', { textContent: `Система: ${BASE_LABELS[base]}, длина: ${length}` }), h('p', {}, 'Время: ', h('span', { id: 'timer', textContent: formatDuration(elapsed) })), h('div', {}, input, h('button', {
        textContent: 'Проверить',
        disabled: won,
        onclick: () => onGuess(input.value),
    })), h('p', { textContent: message }), history, ...(won ? result : []));
}
