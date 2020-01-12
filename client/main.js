'use strict';

(function() {

  var socket = io();
  var canvas = document.getElementsByClassName('whiteboard')[0];
  var context = canvas.getContext('2d');
  var drawing = false;
  var current = {
    color: 'black'
  };

  canvas.addEventListener('mousedown', onMouseDown, false);
  canvas.addEventListener('mouseup', onMouseUp, false);
  canvas.addEventListener('mouseout', onMouseUp, false);
  canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);
  socket.on('drawing', onDrawingEvent);

  window.addEventListener('resize', onResize, false);
  onResize();

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
    drawing = false;
    drawCircle(current.x, current.y, 50);
  }

  function onMouseMove(e){
    if (!drawing) { return; }
    drawCircle(current.x, current.y, 50);
    current.x = e.clientX||e.touches[0].clientX;
    current.y = e.clientY||e.touches[0].clientY;
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
})();
