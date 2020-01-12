let clients = [];
let myClientId;

let user = {
  name: '',
  instrument: '',
  shape: '',
  colour: 'black'
};

function onClientsReceived(payload) {
    clients = payload;
}

function onNewClientReceive(payload) {
    let client = payload;
    clients.push(client);
}
