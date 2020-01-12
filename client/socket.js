const TROTTLE_DELAY = 250;
// Properties of the current user

let notes = [];
var socket = io();

socket.on('newPattern', onPatternReceive);

socket.on('newClient', onNewClientReceive);
socket.on('updateNumClients', onUpdateNumClients);

function onNewClientReceive(payload) {
    clients.push(payload);
}

function onUpdateNumClients(payload){
    // Bit hacky and sorta in the wrong place but w/e :)
    document.getElementById('user-count').innerHTML = "Users online: " + payload.toString();
}


socket.on('registerAllData', onInitialDataReceived);
socket.on('registerId', (id) => {
    console.log("Registering our Id");
    myClientId = id;
});

function onInitialDataReceived(payload) {
    onUpdateNumClients(payload.numClients);

    clients = payload.clients;

    for (let pattern of payload.patterns) {
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

    console.log("pattern", payload);
    sendPatternToAudio(client, payload, false);
}

function sendPatternToAudio(client, payload, isSelf) {
    let melody = patternToMelody(client, payload);
    if (!melody) {
        console.error("Melody is dead");
        return;
    }

    console.log("melody: ", melody);
    addMelody(melody, isSelf);
}

// TODO actually call this function so shit is setup!
function setClientVariables() {
    socket.emit('newClient', user); // Broadcast to all models.
    // Server will call registerId with the updated Id.
}

function sendPattern() {
    console.log("Sending pattern");

    let pattern = {
        'clientId': myClientId,
        'notes': notes
    };

    // Send to server
    socket.emit('newPattern', pattern);

    // Also send locally
    sendPatternToAudio(findClientFromId(clients, myClientId), pattern, true);

    notes = [];
}

function addNoteToSocket(note) {
    notes.push(note);
}

