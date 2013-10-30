function equoloIcon(canvas, size, fillColor, backgroundColor) {
  /*! (C) equolo.org */
  var
    originalSize = 192,
    ratio = size / originalSize,
    fillStyle = fillColor || '#286868',
    context = canvas.getContext('2d')
  ;
  function moveTo(x, y) {
    context.moveTo(x * ratio, y * ratio);
  }
  function bezierCurveTo(a, b, c, d, e, f) {
    context.bezierCurveTo(
      a * ratio,
      b * ratio,
      c * ratio,
      d * ratio,
      e * ratio,
      f * ratio
    );
  }
  context.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = canvas.height = size;
  if (backgroundColor) {
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, size, size);
  }
  context.fillStyle = fillStyle;
  context.save();
  context.scale(1.25, 1.25);
  context.beginPath();
  moveTo(95.32 + 10,10.21);
  bezierCurveTo(101.05 + 10, 7.85, 108.56 + 10, 12.68, 108.09 + 10, 19.01);
  bezierCurveTo(108.39 + 10, 25.61, 100.46 + 10, 30.49, 94.67 + 10, 27.28);
  bezierCurveTo(87.81 + 10, 24.1, 88.04 + 10, 12.79, 95.32 + 10, 10.21);
  context.closePath();
  context.fill();
  context.beginPath();
  moveTo(67.01 + 10, 7.48);
  bezierCurveTo(72.33 + 10, 20.59, 82.54 + 10, 31.7, 95.46 + 10, 37.57);
  bezierCurveTo(104.17 + 10, 41.72, 113.89 + 10, 43.25, 123.47 + 10, 43.1);
  bezierCurveTo(108.12 + 10, 48.29, 96.34 + 10, 60.6, 88.32 + 10, 74.31);
  bezierCurveTo(79.91 + 10, 88.85, 78.34 + 10, 106.86, 83.29 + 10, 122.84);
  bezierCurveTo(72.84 + 10, 106.64, 59.08 + 10, 91.84, 41.39 + 10, 83.57);
  bezierCurveTo(30.55 + 10, 78.74, 18.41 + 10, 76.4, 6.58 + 10, 77.64);
  bezierCurveTo(24.52 + 10, 73.08, 42.99 + 10, 65.59, 54.74 + 10, 50.61);
  bezierCurveTo(64.15 + 10, 38.49, 68.55 + 10, 22.74, 67.01 + 10, 7.48);
  context.closePath();
  context.fill();
  context.beginPath();
  moveTo(43.22 + 10, 119.97);
  bezierCurveTo(43.75 + 10, 102.87, 43.89 + 10, 94.92, 48.72 + 10, 89.2);
  bezierCurveTo(50.5 + 10, 93.22, 49.73 + 10, 97.67, 50.54 + 10, 101.88);
  bezierCurveTo(51.34 + 10, 107.31, 53.13 + 10, 112.93, 57.29 + 10, 116.73);
  bezierCurveTo(61.3 + 10, 121.01, 68.71 + 10, 121.41, 70.94 + 10, 127.44);
  bezierCurveTo(72.27 + 10, 133.19, 66.42 + 10, 138.03, 61.08 + 10, 138.09);
  bezierCurveTo(54.7 + 10, 138.64, 49.47 + 10, 133.66, 46.69 + 10, 128.39);
  bezierCurveTo(43.41 + 10, 122.84, 43.52 + 10, 116.2, 43.22 + 10, 109.97);
  context.closePath();
  context.fill();
  context.restore();
  return canvas;
}

// document.body.appendChild(new Image).src=equoloIcon(document.createElement('canvas'), 256, '#E6A72A').toDataURL();