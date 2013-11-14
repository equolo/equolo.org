/*! (C) Andrea Giammarchi */
// @link https://gist.github.com/WebReflection/7461879
// @example
//  isFontLoaded('FontAwesome', '\uf06b')
var isFontLoaded = function(canvas1, canvas2) {
  function reset(canvas, fontName) {
    var context = canvas.getContext('2d');
    canvas.width = canvas.height = 16;
    context.clearRect(0, 0, 16, 16);
    context.fillStyle = "rgb(0,0,0)";
    context.font = "16px '" + fontName + "'";
    context.fillText('\uf06b', 0, 16);
    return canvas.toDataURL();
  }
  return function (fontName, specialChar) {
    return  reset(canvas1, 'default', specialChar) !==
            reset(canvas2, fontName, specialChar);
  };
}(
  document.createElement('canvas'),
  document.createElement('canvas')
);