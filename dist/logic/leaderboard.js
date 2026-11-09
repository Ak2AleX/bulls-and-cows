export function leaderboardKey(settings) {
    return `bc-records-${settings.length}-${settings.base}`;
}
export function toRecord(state) {
    if (state.status !== 'won' || state.finishedAt === null)
        return null;
    return {
        attempts: state.history.length,
        timeMs: state.finishedAt - state.startedAt,
    };
}
const byAttemptsThenTime = (a, b) => a.attempts - b.attempts || a.timeMs - b.timeMs;
export function addRecord(records, record, topN) {
    return [...records, record].sort(byAttemptsThenTime).slice(0, topN);
}
const isGameRecord = (value) => typeof value === 'object' &&
    value !== null &&
    typeof value.attempts === 'number' &&
    typeof value.timeMs === 'number';
export function parseStoredRecords(raw) {
    if (!raw)
        return [];
    try {
        const data = JSON.parse(raw);
        return Array.isArray(data)
            ? data
                .filter(isGameRecord)
                .map(({ attempts, timeMs }) => ({ attempts, timeMs }))
            : [];
    }
    catch {
        return [];
    }
}
