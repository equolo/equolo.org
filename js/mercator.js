/*! (C) Andrea Giammarchi */
function Mercator(TILE_SIZE) {
  var
    Math = window.Math,
    atan = Math.atan,
    exp = Math.exp,
    log = Math.log,
    max = Math.max,
    min = Math.min,
    pow = Math.pow,
    round = Math.round,
    sqrt = Math.sqrt,
    tan = Math.tan,
    PI = Math.PI,
    POINT_FIVE = .5,
    NINETY = 90,
    ONE_EIGHTY = NINETY * 2,
    THREE_SIXTY = NINETY * 4,
    PI_DIVIDED_2 = PI / 2,
    PI_DIVIDED_4 = PI / 4,
    PI_DIVIDED_180 = PI / ONE_EIGHTY,
    PI_DIVIDING_180 = ONE_EIGHTY / PI,
    PI_MULTIPLIED_2 = PI * 2,
    PI_MULTIPLIED_4 = PI * 4
  ;
  if (!TILE_SIZE) TILE_SIZE = 256;
  return {
    coordsToPoint: function coordsToPoint(coords, zoom) {
      var size = TILE_SIZE << zoom;
      return {
        x: round((coords.longitude / THREE_SIXTY + POINT_FIVE) * size),
        y: round(min(
          1,
          max(
            0,
            POINT_FIVE - (
              log(
                tan(
                  PI_DIVIDED_4 + PI_DIVIDED_2 * coords.latitude / ONE_EIGHTY
                )
              ) / PI
            ) / 2
          )
        ) * size)
      };
    },
    pointDistance: function pointsDistance(a, b) {
      return sqrt(pow(b.y - a.y, 2) + pow(b.x - a.x, 2));
    },
    pointToCoords: function pointToCoords(point, zoom) {
      var
        size = TILE_SIZE << zoom,
        x = point.x / size,
        y = point.y / size
      ;
      return {
        latitude: y <= 0 ?
          NINETY :
          y >= 1 ?
            -NINETY :
            PI_DIVIDING_180 * (2 * atan(exp(PI * (1 - 2 * y))) - PI_DIVIDED_2),
        longitude: (x === 1 ? 1 : (x % 1 + 1) % 1) * THREE_SIXTY - ONE_EIGHTY
      };
    }
  };
}