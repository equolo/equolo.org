// creates a png Map icon SRC out of FontAwesome
// works with retina displays too but it uses
// the display.js file in order to do that
var fontAwesomeIcon = function(canvas){
  var
    context = canvas.getContext('2d'),
    // all names mapped to code
    // right now I need only these icons
    code = {
      question: 0xf128,
      'shopping-cart': 0xf07a,
      gift: 0xf06b,
      cutlery: 0xf0f5,
      home: 0xf015,
      glass: 0xf000,
      briefcase: 0xf0b1,
      group: 0xf0c0,
      truck: 0xf0d1
      //,'map-marker': 32 //0xf041
    },
    cache = {}
  ;
  function ellipse(x, y, r) {
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, true); 
    context.closePath();
    context.fill();
  }
  function icon(chr, size) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = canvas.height = size;
    context.textBaseline = 'bottom';
    context.fillStyle = "rgb(25,138,138)";
    ellipse(size / 2, size / 2.5, size / 2.5);
    triangle(size, size / 4.9);
    context.fillStyle = "rgb(240,240,240)";
    ellipse(size / 2, size / 2.5, size / 2.8);
    context.font = context.mozTextStyle =
      Math.round(size / 2) + "px FontAwesome";
    context.translate((canvas.width - (
      context.measureText || context.mozMeasureText
    ).call(context, chr).width) / 2, 0);
    context.fillStyle = "rgb(40,104,104)";
    if (chr.length) {
      context.fillText(chr, 0, size / 1.5);
    } else {
      context.drawImage(
        equoloIcon(
          document.createElement('canvas'),
          size / 1.5
        ),
        -size / 2.8,
        size / 10
      );
    }
    return canvas.toDataURL();
  }
  function triangle(size, delta) {
    context.beginPath();
    context.moveTo(size / 2, size);
    context.lineTo(delta, size / 1.5);
    context.lineTo(size - delta, size / 1.5);
    context.lineTo(size / 2, size);
    context.closePath();
    context.fill();
  }
  return function fontAwesomeIcon(chr, size, ratio) {
    return cache[chr + size + ratio] || (
      cache[chr + size + ratio] = icon(
        code.hasOwnProperty(chr) ?
          String.fromCharCode(code[chr]) : ''
        ,
        Math.round(size * (
          ratio || (
            typeof display === 'undefined' ?
              1 : display.ratio
          )
        ))
      )
    );
  };
}(
  document.createElement('canvas')
);
