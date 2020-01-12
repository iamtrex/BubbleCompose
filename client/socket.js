const TROTTLE_DELAY = 250;
// Properties of the current user

let notes = [];
var socket = io();

socket.on('newPattern', onPatternReceive);
socket.on('newClient', onNewClientReceive);
socket.on('registerAllPatterns', onPatternsReceived);
socket.on('registerAllClients', onClientsReceived);
socket.on('registerId', (id) => {
    myClientId = id;
});

function onPatternsReceived(payload) {
    for (let pattern of payload) {
        onPatternReceive(pattern);
    }
}

function onPatternReceive(payload) {

    let client = findClientFromId(clients, payload.clientId);

    if (!client) {
        console.error("Cannot find client for pattern", payload);
        return null;
    } else {
        console.log("Received some shit from client ", client.id);
    }

    let melody = patternToMelody(client, payload);
    if (!melody) {
        console.error("Melody dead");
        return;
    }
    addMelody(melody);
}

// TODO actually call this function so shit is setup!
function setClientVariables(name, instrument, shape, colour) {
    user.name = name;
    user.instrument = instrument;
    user.shape = shape;
    user.colour = colour;

    socket.emit('newClient', user); // Broadcast to all models.
    // Server will call registerId with the updated Id.
}

function sendPattern() {
    console.log("Attempt to send pattern");
    socket.emit('newPattern', {
        'clientId': myClientId,
        'notes': notes
    });
    notes = [];
}

function addNote(x, y) {
    let note = {
        'x': x,
        'y': y,
        't': Date.now()
    };
    notes.push(note);
}

//TODO delete this - for unblocking before the welcome screen is done
setClientVariables("Chonzo", "piano", "circle", "black");
