// let's dirtly feature detect browser capabilities
// in the worst case scenario, we'll prepare
// the most common icon fallback: the marker one
try{fontAwesomeIcon('map-marker',36)}catch(o_O){
  // ok, very old browser, icons should be static images
  // instead of runtime generated canvas
  // let's force them to be in there once needed
  this.compat = true;
  document.write('<script src="cgi/base64_icon.php"></script>');
}
(function(window, document, map){
  // first come first serve
  document.on('DOMContentLoaded', equolo);
  window.on('load', equolo);
  // in case it's already good to go
  if (/loaded|complete/.test(document.readyState)) {
    equolo();
  }
  // here the home page, Welcome to equolo.org !
  function equolo() {
    var el, tmp;
    // we need to be sure this won't be fired twice
    document.off('DOMContentLoaded', equolo);
    window.off('load', equolo);
    // but if there's still no map
    // we need to wait for it
    if (!window.L) {
      return setTimeout(equolo, 15);
    }
    // user, please do not scroll by your own
    document.documentElement.classList.add('no-scroll');
    document.body.classList.add('no-scroll');
    // better quality image, or just same image?
    if (!window.compat) {
      el = $('section#map img')[0];
      tmp = document.createElement('canvas');
      tmp.style.cssText = 'width:' + el.width + 'px;' +
                          'height:' + el.height + 'px;';
      el.replace(
        equoloIcon(
          tmp,
          36 * display.ratio,
          '#E6A72A'
        )
      );
    }
    // make section good for synthetic `scrollingTo`
    onDisplayChange();
    // initialize once the map
    L.tileLayer(
      'http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg',
      {
        attribution: 'Map Tiles &copy; Open MapQuest',
        maxZoom: 18
      }
    ).addTo(
      // one map for all places of all activities
      map = L.map($('section#map > div.map')[0])
    );
    setMapView(
      navigator.country ?
        navigator.country.geo :
        [51.4791, 0]
      ,
      6
    );
  }
  // what happens when the display size changes ?
  function onDisplayChange() {
    restyle({
      // section should have a proper minimum height
      'section': {
        'min-height': display.height + 'px'
      }
    });
  }
  function setMapView(
    coords, zoom  // zoom is optional
  ) {
    map.setView(
      [
        // coords, geowhatever, array ? fine :-)
        coords.latitude || coords.lat || coords[0],
        coords.longitude || coords.lng || coords[1]
      ],
      zoom || Math.max(
        14, map.getZoom()
      )
    );
  }
  display.on('change', onDisplayChange);
}(this, document));