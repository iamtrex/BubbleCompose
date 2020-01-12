
// Convert pattern to a easier to manage form for Ben's code.
function patternToMusic(pattern) {

    let music = [];

    let client = findClientFromId(clients, pattern.clientId);

    if (!client) {
        console.error("Cannot find client for pattern", pattern);
    }

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

        music.push(tone);
    }



    return music;
}

function convertYToPitch(y) {
    // TODO
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



