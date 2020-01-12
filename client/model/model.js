let clients = [];
let patterns = [];

function onPatternsReceived(payload) {
    for (let pattern of payload) {
        onPatternReceive(pattern);
    }
}

function onClientsReceived(payload) {
    clients = payload;
}

function onPatternReceive(pattern) {
    console.log("Pattern Payload", payload);
    let client = findClient(pattern.clientId);
    if (client) {
        // Need to massage this data-type so Ben's part can understand this.
        patterns.push(pattern);

    }

    // TODO payloads need to be fetched as necessary
}

function findClient(clientId) {
    if (!clientId) {
        return null;
    }

    for (let client of clients) {
        if (client.id === clientId) {
            return client;
        }
    }
    return null;
}

function onNewClientReceive(payload) {
    let client = payload;
    clients.push(client);
}
