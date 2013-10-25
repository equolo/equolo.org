function equoloIcon(canvas, width, fillColor) {
  /*! (C) equolo.org */
  var
    originalWidth = 162,
    originalHeight = 192,
    ratio = width / originalWidth,
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
  canvas.width = width;
  canvas.height = Math.round(width * originalHeight / originalWidth);
  context.fillStyle = fillStyle;
  context.save();
  context.scale(1.25, 1.25);
  context.beginPath();
  moveTo(95.32,10.21);
  bezierCurveTo(101.05, 7.85, 108.56, 12.68, 108.09, 19.01);
  bezierCurveTo(108.39, 25.61, 100.46, 30.49, 94.67, 27.28);
  bezierCurveTo(87.81, 24.1, 88.04, 12.79, 95.32, 10.21);
  context.closePath();
  context.fill();
  context.beginPath();
  moveTo(67.01,7.48);
  bezierCurveTo(72.33, 20.59, 82.54, 31.7, 95.46, 37.57);
  bezierCurveTo(104.17, 41.72, 113.89, 43.25, 123.47, 43.1);
  bezierCurveTo(108.12, 48.29, 96.34, 60.6, 88.32, 74.31);
  bezierCurveTo(79.91, 88.85, 78.34, 106.86, 83.29, 122.84);
  bezierCurveTo(72.84, 106.64, 59.08, 91.84, 41.39, 83.57);
  bezierCurveTo(30.55, 78.74, 18.41, 76.4, 6.58, 77.64);
  bezierCurveTo(24.52, 73.08, 42.99, 65.59, 54.74, 50.61);
  bezierCurveTo(64.15, 38.49, 68.55, 22.74, 67.01, 7.48);
  context.closePath();
  context.fill();
  context.beginPath();
  moveTo(43.22, 119.97);
  bezierCurveTo(43.75, 102.87, 43.89, 94.92, 48.72, 89.2);
  bezierCurveTo(50.5, 93.22, 49.73, 97.67, 50.54, 101.88);
  bezierCurveTo(51.34, 107.31, 53.13, 112.93, 57.29, 116.73);
  bezierCurveTo(61.3, 121.01, 68.71, 121.41, 70.94, 127.44);
  bezierCurveTo(72.27, 133.19, 66.42, 138.03, 61.08, 138.09);
  bezierCurveTo(54.7, 138.64, 49.47, 133.66, 46.69, 128.39);
  bezierCurveTo(43.41, 122.84, 43.52, 116.2, 43.22, 109.97);
  context.closePath();
  context.fill();
  context.restore();
  return canvas;
}