const MIN_NOTE = 48;
const MAX_NOTE = 84;
const INTERVALS = [3, 2, 2, 3, 2];
const SUM_INTERVAL = 12;
const NUM_NOTES = (MAX_NOTE - MIN_NOTE) / SUM_INTERVAL * INTERVALS.length;

function createToneFromClientNote(client, note) {
    if (!client) {
        console.error("Client is null!");
        return;
    }
    return {
        clientId: client.id,
        instrument: client.instrument,
        shape: client.shape,
        colour: client.colour,
        pitch: convertYToPitch(note.y),
        x: note.x,
        y: note.y,
        t: note.t
    };
}

// Convert pattern to a easier to manage form for Ben's code.
function patternToMelody(client, pattern) {
    let melody = [];

    for (let note of pattern.notes) {
        melody.push(createToneFromClientNote(client, note));
    }
    return melody;
}

function convertYToPitch(y) {
    console.log("Converting y ", y);
    let nthNote = Math.round((100.0 - y) / 100.0 * NUM_NOTES); // Map to note linearly.
    console.log(nthNote);

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



