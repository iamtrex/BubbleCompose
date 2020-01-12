const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + './../client'));

let allPatterns = [];
let allClients = [];
let numClients = 0;

function onConnection(socket) {
    console.log("There is new connection to ", socket.id);

    numClients ++;
    // Send all patterns and clients to new socket connectors
    socket.emit('registerAllData', {
        numClients: numClients,
        clients: allClients,
        patterns: allPatterns
    });
    //socket.emit('registerAllClients', allClients);
    //socket.emit('registerAllPatterns', allPatterns);

    socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));

    // Forward new client to all clients with registered id.
    socket.on('newClient', (data) => {
        data.id = socket.id; // Append ID to payload.
        data.online = true;

        socket.emit('registerId', data.id); // Send back to requesting client.
        socket.emit('newClient', data); // Send back to requesting client.

        socket.broadcast.emit('newClient', data); // Send to all other clients.
        socket.broadcast.emit('updateNumClients', numClients); // Send to all other clients.
        allClients.push(data);
    });

    // Forward new pattern to all other clients.
    socket.on('newPattern', (data) => {
            allPatterns.push(data);
            socket.broadcast.emit('newPattern', data);
        }
    );

    socket.on('disconnect', function () {
        console.log(socket.id, " disconnected");
        let client = allClients.find((e) => {
            return e.id === socket.id
        });
        client.online = false;

        numClients --;
        socket.broadcast.emit('updateNumClients', numClients);

    });

}

io.on('connection', onConnection);
http.listen(port, () => console.log('listening on port ' + port));
