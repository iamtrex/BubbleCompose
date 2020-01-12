'use strict';

Pts.namespace(window);
let canvas = document.getElementById('whiteboard');

let run = Pts.quickStart("#whiteboard", "#e2e6ef");
const shape_radius = 30;
const cusor_radius = 10;
const cusor_colour = "rgba(0, 255, 0)";
const cusor_shape = "circle";

run((time, ftime) => {
  // form.fill(cusor_colour).point(space.pointer, cusor_radius, cusor_shape);
});

function drawShape(tone) {
    console.log("Drawing shape");
    let x = tone.x / 100 * canvas.width;
    let y = tone.y / 100 * canvas.height;
    let color = tone.colour;
    let colorObj = Color.fromHex(tone.colour);

    let tempo = new Tempo(1440);
    let directionSeed = Math.random();
    tempo.every(1).start((count) => {
        x +=  Math.cos(directionSeed * Math.PI * 2);
        y +=  Math.sin(directionSeed * Math.PI * 2);
        colorObj.alpha -= 0.01;
        color = colorObj.toString();
    });
    space.add(tempo);

    let shape = tone.shape;
    space.add(() => form.fillOnly(color).point([x, y], shape_radius, shape));
}