
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + './../client'));

let allPatterns = [];

function onConnection(socket){
  console.log("There is new connection to ", socket.id);

  // Send all patterns
  socket.emit('registerAllPatterns', allPatterns);

  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));

  // Forward new client to all clients with registered id.
  socket.on('newClient', (data) => {
    data.id = socket.id; // Append ID to payload.
    socket.emit('registerId', data.id); // Send back to requesting client.
    socket.broadcast.emit('newClient', data); // Send to all other clients.
  });

  // Forward new pattern to all other clients.
  socket.on('newPattern', (data) =>
    {
      allPatterns.push(data);
      socket.broadcast.emit('newPattern', data);
    }
  );


}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));
