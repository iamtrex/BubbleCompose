let clients = [];
let patterns = [];
let observers = [];


function onPatternsReceived(payload) {
    patterns = payload;
}

function onPatternReceive(payload){
    let pattern = payload;
    patterns.push(pattern);
    console.log("Pattern Payload", payload);

    // TODO necessary?
    // Notify observers of new pattern (aka Ben)
    for (let observer of observers) {
        observer.notify("patternReceive", pattern);
    }
}

function onNewClientReceive(payload){
    let client = payload;
    clients.push(client);

}