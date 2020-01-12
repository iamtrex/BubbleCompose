Pts.namespace(window);
let mousedown = false;

function onVolumeButtonClick() {
  let className = document.getElementById("volume-button-icon").className;
  if (className === "volume up icon") {
    document.getElementById("volume-button-icon").className = "volume off icon";
  } else {
    document.getElementById("volume-button-icon").className = "volume up icon";
  }
}

function onShareButtonClick() {
  let url = window.location.href;
  copyToClipboard(url);
  console.log("Copied the text: " + url);
}

// taken from https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
function copyToClipboard(str) {
  const el = document.createElement('textarea');  // Create a <textarea> element
  el.value = str;                                 // Set its value to the string that you want copied
  el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
  el.style.position = 'absolute';                 
  el.style.left = '-9999px';                      // Move outside the screen to make it invisible
  document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
  const selected =            
    document.getSelection().rangeCount > 0        // Check if there is any content selected previously
      ? document.getSelection().getRangeAt(0)     // Store selection if found
      : false;                                    // Mark as false to know no selection existed before
  el.select();                                    // Select the <textarea> content
  document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
  document.body.removeChild(el);                  // Remove the <textarea> element
  if (selected) {                                 // If a selection existed before copying
    document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
    document.getSelection().addRange(selected);   // Restore the original selection
  }
};

function recordNote() {
    console.log("Recording note");
    let x = space.pointer.x;
    let y = space.pointer.y;
    drawShape({
        x: x,
        y: y,
        colour: "rgba(0, 255, 0, .3)",
        shape: "circle"
    });
    let scaledX = Math.round(x / canvas.width * 10000.0) / 100.0;
    let scaledY = Math.round(y / canvas.height * 10000.0) / 100.0;
    let note = {
        'x': x,
        'y': y,
        't': Date.now()
    };

    addNoteToSocket(scaledX, scaledY);
    createToneFromClientNote(findClientFromId(clients, myClientId), note);
}

function onMouseMove(e) {
    if (!mousedown) {
        return;
    }
    recordNote();
}

var canvas = document.getElementById('whiteboard');
canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', throttle(onMouseMove, 250), false);

function onMouseDown(e) {
    mousedown = true;
    recordNote();
}

function onMouseUp(e) {
    if (!mousedown) {
        return;
    }
    recordNote();
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