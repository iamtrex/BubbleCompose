function onVolumeButtonClick() {
  let className = document.getElementById("volume-button-icon").className;
  if (className === "volume up icon") {
    document.getElementById("volume-button-icon").className = "volume off icon";
  } else {
    document.getElementById("volume-button-icon").className = "volume up icon";
  }
}

Pts.namespace(window);
let mousedown = false;
function onMouseMove(e) {
    if (!mousedown) {
        return;
    }
    let x = space.pointer.x;
    let y = space.pointer.y;
    space.add(() => form.point([x, y], 10, "circle"));
    let scaledX = Math.round(x / canvas.width * 10000.0) / 100.0;
    let scaledY = Math.round(y / canvas.height * 10000.0) / 100.0;
    addNote(scaledX, scaledY);
}

var canvas = document.getElementById('whiteboard');
canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', throttle(onMouseMove, 250), false);

function onMouseDown(e) {
    mousedown = true;
}

function onMouseUp(e) {
    if (!mousedown) {
        return;
    }
    sendPattern();
    mousedown = false;
}

// limit the number of events per second
function throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function () {
        var time = new Date().getTime();

        if ((time - previousCall) >= delay) {
            previousCall = time;
            callback.apply(null, arguments);
        }
    };
}