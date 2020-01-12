'use strict';

(function() {
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
  var canvas = document.getElementsByClassName('whiteboard')[0];
  var context = canvas.getContext('2d');
  var drawing = false;

  canvas.addEventListener('mousedown', onMouseDown, false);
  canvas.addEventListener('mouseup', onMouseUp, false);
  canvas.addEventListener('mouseout', onMouseUp, false);
  canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

  socket.on('drawing', onDrawingEvent);
  socket.on('newPattern', onPatternReceive);
  socket.on('newClient', onNewClientReceive);
  socket.on('registerAllPatterns', onPatternsReceived);
  socket.on('registerAllClients', onClientsReceived);
  socket.on('registerId', (id) => {
    myClientId = id;
  });


  window.addEventListener('resize', onResize, false);
  onResize();


  // TODO actually call this function so shit is setup!
  function setClientVariables(name, instrument, shape, colour) {
    user.name = name;
    user.instrument = instrument;
    user.shape = shape;
    user.colour = colour;

    socket.emit('newClient', user); // Broadcast to all models.
    // Server will call registerId with the updated Id.
  }

  function drawCircle(x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.lineWidth = 2;
    context.stroke();
    context.closePath();

    var w = canvas.width;
    var h = canvas.height;
    socket.emit('drawing', {
      x: x / w,
      y: y / h,
    });
  }

  function onMouseDown(e){
    drawing = true;
    current.x = e.clientX||e.touches[0].clientX;
    current.y = e.clientY||e.touches[0].clientY;
  }

  function onMouseUp(e){
    if (!drawing) { return; }

    socket.emit('newPattern', {
      'clientId': myClientId,
      'notes': notes
    });

    notes = [];
    drawing = false;
    drawCircle(current.x, current.y, 50);
  }

  // TODO add a timeout so we don't actually draw this many circles.
  function onMouseMove(e){
    if (!drawing) { return; }

    // TODO remove drawing
    drawCircle(current.x, current.y, 50);
    current.x = e.clientX||e.touches[0].clientX;
    current.y = e.clientY||e.touches[0].clientY;

    // Create the element to pass to server.
    // Note with scaled x and y, rounded to 2 decimal places
    let note = {
      x: Math.round(current.x / canvas.width * 10000.0) / 100.0,
      y: Math.round(current.y / canvas.height * 10000.0) / 100.0,
      t: Date.now()
    };
    notes.push(note);
  }

  // limit the number of events per second
  function throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function() {
      var time = new Date().getTime();

      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }

  function onDrawingEvent(data){
    var w = canvas.width;
    var h = canvas.height;
    drawCircle(data.x * w, data.y * h, 50);
  }

  // make the canvas fill its parent
  function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Animation Loop - Do we want this?
  function loop(timestamp) {
      let progress = timestamp - lastRender;

      // TODO do drawing here?

      lastRender = timestamp;
      window.requestAnimationFrame(loop);
  }
  let lastRender = 0;
  window.requestAnimationFrame(loop);
})();
