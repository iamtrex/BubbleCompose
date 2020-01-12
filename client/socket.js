'use strict';

(function() {
  const TROTTLE_DELAY = 250;
  // Properties of the current user
  let myClientId;
  let user = {
    name: '',
    instrument: '',
    shape: '',
    colour: 'black'
  };

  let notes = [];
  let current = {};
  var socket = io();

  socket.on('newPattern', onPatternReceive);
  socket.on('newClient', onNewClientReceive);
  socket.on('registerAllPatterns', onPatternsReceived);
  socket.on('registerAllClients', onClientsReceived);
  socket.on('registerId', (id) => {
    myClientId = id;
  });

  // TODO actually call this function so shit is setup!
  function setClientVariables(name, instrument, shape, colour) {
    user.name = name;
    user.instrument = instrument;
    user.shape = shape;
    user.colour = colour;

    socket.emit('newClient', user); // Broadcast to all models.
    // Server will call registerId with the updated Id.
  }

  // function onMouseUp(e){
  //   if (!drawing) { return; }

  //   socket.emit('newPattern', {
  //     'clientId': myClientId,
  //     'notes': notes
  //   });

  //   notes = [];
  //   drawing = false;
  //   drawCircle(current.x, current.y, 50);
  // }

  // // TODO add a timeout so we don't actually draw this many circles.
  // function onMouseMove(e){
  //   if (!drawing) { return; }

  //   // TODO remove drawing
  //   drawCircle(current.x, current.y, 50);
  //   current.x = e.clientX||e.touches[0].clientX;
  //   current.y = e.clientY||e.touches[0].clientY;

  //   // Create the element to pass to server.
  //   // Note with scaled x and y, rounded to 2 decimal places
  //   let note = {
  //     x: Math.round(current.x / canvas.width * 10000.0) / 100.0,
  //     y: Math.round(current.y / canvas.height * 10000.0) / 100.0,
  //     t: Date.now()
  //   };
  //   notes.push(note);
  // }
})();
