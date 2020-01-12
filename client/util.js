const MIN_NOTE = 48;
const MAX_NOTE = 84;
const INTERVALS = [3, 2, 2, 3, 2];
const SUM_INTERVAL = 12;
const NUM_NOTES = (MAX_NOTE - MIN_NOTE) / SUM_INTERVAL * INTERVALS.length;


// Convert pattern to a easier to manage form for Ben's code.
function patternToMelody(client, pattern) {
    let melody = [];

    for (let note of pattern.notes) {
        let tone = {
            clientId: pattern.clientId,
            instrument: client.instrument,
            shape: client.shape,
            colour: client.colour,
            pitch: convertYToPitch(note.y),
            x: note.x,
            y: note.y,
            t: note.t
        };

        melody.push(tone);
    }
    return melody;
}

function convertYToPitch(y) {
    let nthNote = Math.round(y / 100 * NUM_NOTES); // Map to note linearly.

    let pitch = 48;
    for (let i = 0; i < nthNote; i++) {
        pitch += INTERVALS[i % INTERVALS.length];
    }

    return pitch;
}

function findClientFromId(clients, id) {
    if (!id) {
        return null;
    }

    for (let client of clients) {
        if (client.id === id) {
            return client;
        }
    }
    return null;
}



