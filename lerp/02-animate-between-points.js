/**
 * lessons → lerp → animate between points
 * —
 *
 * Animate between two points using linear interpolation.
 */

const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 512, 512 ],
  animate: true,
  duration: 3
};

const rect = (context, x, y, width, height, color) => {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
};

const circle = (context, x, y, radius, color, lineWidth) => {
  context.strokeStyle = context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  context.lineWidth = lineWidth;
  if (lineWidth != null) context.stroke();
  else context.fill();
};

const progress = (context, time, width, height, margin = 0) => {
  context.fillStyle = 'white';
  context.fillRect(
    margin * 2,
    height - margin * 2,
    (width - margin * 4) * time,
    4
  );
};

const sketch = () => {
  const margin = 25;

  return (props) => {
    // Destructure a few props we need
    const { context, width, height, playhead } = props;

    // Fill off-white background
    rect(context, 0, 0, width, height, 'hsl(0, 0%, 98%)');

    // Fill color foreground with padding
    rect(context, margin, margin, width - margin * 2, height - margin * 2, '#e5b5b5');

    // Draw this scene
    draw(props);

    // Also draw a timeline at the bottom
    progress(context, playhead, width, height, margin);
  };

  function draw ({ context, width, height, playhead }) {
    // Chosoe size of circle & stroke
    const lineWidth = 4;
    const radius = 20;

    // Choose a start and end point somewhere in our canvas
    const start = [ width * 0.33, height * 0.33 ];
    const end = [ width * 0.66, height * 0.66 ];

    // Draw the start and end point
    circle(context, start[0], start[1], radius, 'white', lineWidth);
    circle(context, end[0], end[1], radius, 'white', lineWidth);

    // Choose a 't' value between 0..1, in this case the loop playhead
    const t = playhead;

    // Interpolate the x dimension from start X to end X, using t
    const x = lerp(start[0], end[0], t);

    // Now interpolate the y dimension
    const y = lerp(start[1], end[1], t);

    // Now we have our new point in between the start and end
    const point = [ x, y ];

    // And draw it
    circle(context, point[0], point[1], radius / 2, 'white');
  }
};

canvasSketch(sketch, settings);
