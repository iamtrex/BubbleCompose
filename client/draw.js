'use strict';

Pts.namespace(window);

let run = Pts.quickStart("#whiteboard", "#e2e6ef");
const shape_radius = 30;
const cusor_radius = 10;
const cusor_colour = "rgba(0, 255, 0)";
const cusor_shape = "circle";

run((time, ftime) => {
  // form.fill(cusor_colour).point(space.pointer, cusor_radius, cusor_shape);
});

function drawShape(tone) {
  let x = tone.x / 100 * canvas.width;
  let y = tone.y / 100 * canvas.height;
  let colour = tone.colour;
  let shape = tone.shape;
  space.add(() => form.fill(colour).point([x, y], shape_radius, shape));
}