'use strict';

(function() {
  Pts.namespace( window );
  var socket = io();
  var mousedown = false;
  
  let run = Pts.quickStart( "#whiteboard", "#e2e6ef" );
  run( (time, ftime)  => {
    let radius = 10;
    form.fill("#0ca").point( space.pointer, radius, "circle" );
    if (mousedown) {
      socket.emit('drawing', {
        pointer: space.pointer
      });
    }
  });
  socket.on('drawing', (data) => {
    space.add(() => form.point(data.pointer, 10, "circle" ));
  });

  function onMouseMove(e){
    if (!mousedown) { return; }
    let x = space.pointer.x;
    let y = space.pointer.y;
    space.add( () => form.point([x, y], 10, "circle" ) );
  }

  var canvas = document.getElementById('whiteboard');
  canvas.addEventListener('mousedown', onMouseDown, false);
  canvas.addEventListener('mouseup', onMouseUp, false);
  canvas.addEventListener('mousemove', throttle(onMouseMove, 250), false);

  function onMouseDown(e){
    mousedown = true;
  }

  function onMouseUp(e){
    if (!mousedown) { return; }
    mousedown = false;
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
})();
