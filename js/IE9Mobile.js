// need to retrieve the leaflet map isntead of map
document.on('DOMContentLoaded', function(){
  function reset() {
    mapEngine.panBy(
      [lastDiffX * 6, lastDiffY * 6]
    );
    diffX = null;
    timer = 0;
    wrap.scrollLeft = parseFloat(wrap.style.width);
    wrap.scrollTop = parseFloat(wrap.style.height);
  }
  function resize() {
    wrap.style.top = header.offsetHeight + 'px';
    center.style.width = (
      parseFloat(
        wrap.style.width = display.width + 'px'
      ) * 3
    ) + 'px';
    center.style.height = (
      parseFloat(
        wrap.style.height = tiles.style.height
      ) * 3
    ) + 'px';
  }
  var
    tiles = document.getElementById('tiles'),
    header = tiles.parentNode.children[0],
    wrap = tiles.parentNode.appendChild(
      document.createElement('div')
    ),
    center = wrap.appendChild(
      document.createElement('span')
    ),
    panOptions = {
      animate: false,
      noMoveStart: true
    },
    timer = 0,
    lastDiffX = 0, lastDiffY = 0,
    diffX, diffY
  ;
  wrap.id = 'ie9-map-wrapper';
  center.id = 'ie9-map-center';
  display.on('change', resize);
  center.onmouseenter = center.onmouseleave = center.onselectionstart = 
  center.onmousedown = center.onmouseup = center.onmousemove =
  center.onclick = center.ondblclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.pageX < 60 && e.pageY < 100) {
      // eventually trigger those buttons to zoom
    }
  };
  reset();
  wrap.onscroll = function(e) {
    if (diffX != null) {
      mapEngine.panBy(
        [
          // maybe both should be negative
          (lastDiffX = wrap.scrollLeft - diffX),
          (lastDiffY = wrap.scrollTop - diffY)
        ],
        panOptions
      );
      clearTimeout(timer);
      timer = setTimeout(reset, 30);
    }
    diffX = wrap.scrollLeft;
    diffY = wrap.scrollTop;
  };
  setTimeout(resize);
});