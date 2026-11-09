import { addRecord, leaderboardKey, parseStoredRecords, } from './logic/leaderboard.js';
import { TOP_N } from './logic/settings.js';
export function loadRecords(settings) {
    try {
        return parseStoredRecords(localStorage.getItem(leaderboardKey(settings)));
    }
    catch {
        return [];
    }
}
export function saveRecord(settings, record) {
    const updated = addRecord(loadRecords(settings), record, TOP_N);
    try {
        localStorage.setItem(leaderboardKey(settings), JSON.stringify(updated));
    }
    catch {
        // Игра продолжает работать если вкл приватный режим, но рекорд не сохранится
    }
    return updated;
}
