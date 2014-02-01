
function fashionIcon(canvas, size, fillColor, backgroundColor) {
  /*! (C) equolo.org */
  var
    originalSize = 64,
    ratio = size / originalSize,
    fillStyle = fillColor || '#286868',
    context = canvas.getContext('2d')
  ;
  function arc(a, b, c, d, e) {
    context.arc(
      a * ratio,
      b * ratio,
      c * ratio,
      d,
      e
    );
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
  function moveTo(x, y) {
    context.moveTo(x * ratio, y * ratio);
  }
  function lineTo(x, y) {
    context.lineTo(x * ratio, y * ratio);
  }
  context.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = canvas.height = size;
  if (backgroundColor) {
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, size, size);
  }
  context.fillStyle = fillStyle;
  context.save();
  context.beginPath();
  moveTo(18, 12);
  lineTo(26, 10);
  bezierCurveTo(30, 16, 34, 16, 38, 10);
  lineTo(48, 12);
  lineTo(58, 20);
  lineTo(52, 28);
  lineTo(46, 24);
  lineTo(46, 54);
  lineTo(18, 54);
  lineTo(18, 24);
  lineTo(12, 28);
  lineTo(6, 20);
  lineTo(18, 12);
  context.closePath();
  context.fill();
  context.restore();
  return canvas;
}

//fashionIcon(document.body.appendChild(document.createElement('canvas')), 256, '#069', '#EEE');
