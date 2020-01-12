let clients = [];
let patterns = [];

function onPatternsReceived(payload) {
    patterns = payload;
}

function onPatternReceive(payload){
    let pattern = payload;
    patterns.push(pattern);
    console.log("Pattern Payload", payload);

    // TODO payloads need to be fetched as necessary
}

function onNewClientReceive(payload){
    let client = payload;
    clients.push(client);
}
