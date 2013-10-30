// let's dirtly feature detect browser capabilities
// in the worst case scenario, we'll prepare
// the most common icon fallback: the marker one
try{if(IE9Mobile||fontAwesomeIcon('map-marker',36).length<36)throw 0}catch(o_O){
  // ok, very old browser, icons should be static images
  // instead of runtime generated canvas
  // let's force them to be in there once needed
  window.compat = true;
  fontAwesomeIcon = function(chr) {
    return base64Icon[chr];
  };
  // download the fallback
  (function(d,p){
    p=d.documentElement;
    p.insertBefore(d.createElement('script'),p.lastChild).src='/cgi/base64_icon.php';
  }(document));
}

(function(window, document){

  var
    // which level is good enough to show proper icons ?
    ZOOM_FOR_ICONS = 12,
    ZOOM_FOR_BBOX = 15,
    // the shared map instance
    map,
    // all categories available on the map
    // will be an object containing all related groups
    // per each category. By defatult all
    categories,
    // current single group logic/implementation
    group,
    // user position
    positionIcon,
    // the location button
    findMe,
    // sections
    section,
    // data
    lastReceivedActivities,
    lastParsedActivities
  ;

  // first come first serve
  document.on('DOMContentLoaded', equolo);
  window.on('load', equolo);
  // in case it's already good to go
  if (/loaded|complete/.test(document.readyState)) {
    equolo();
  }

  // here the home page, Welcome to equolo.org !
  function equolo() {



// initialization
///////////////////////////////////////////////////////////////////////

    var el, tmp, watchId;
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

    // solve IE9MObile problem with fonts
    if (IE9Mobile)
    FontCawesome('../fonts/fontawesome-webfont.svg');

    // map all sections once
    // these won't change anyway during
    // interaction lifecycle ;-)
    section = {
      map: $('section#map')[0],
      about: $('#about')[0],
      contact: $('#contact')[0],
      pinIt: $('#pinIt')[0]
    };
    section.nav = $('nav', section.map)[0];

    // better quality image, or just same image?
    if (!window.compat) {
      createShortcutIcon();
      el = $('section#map img')[0];
      tmp = document.createElement('canvas');
      tmp.style.cssText = 'width:' + el.width + 'px;' +
                          'height:' + el.height + 'px;';
      el.replace(
        equoloIcon(
          tmp,
          el.width * display.ratio,
          '#E6A72A'
        )
      );
    }
    // make section good for synthetic `scrollingTo`
    onDisplayChange();

    // add shortcut icons per each resolution to the header at runtime
    function createShortcutIcon() {
      for(var
        link1, link2,
        // used to generate icons at runtime
        canvas = document.createElement('canvas'),
        // where to place links
        fragment = document.createDocumentFragment(),
        sizes = [
          30, 57, 60, 72, 114, 128, 144, 173, 196
          // completely random , hopefully future proof, entries
          , 214, 256
          // btw, the whole sizes and 2X idea is so wrong ...
        ],
        i = 0; i < sizes.length; i++
      ) {
        link1 = document.createElement('link');
        link2 = document.createElement('link');
        link1.rel = 'shortcut icon';
        link2.rel = 'apple-touch-icon';
        link1.type = link2.type = 'image/png';
        link1.href = link2.href = equoloIcon(
          canvas, sizes[i], '#E6A72A', '#286868'
        ).toDataURL();
        link1.setAttribute('sizes', link1.sizes = sizes[i] + 'x' + sizes[i]);
        link2.setAttribute('sizes', link1.sizes);
        fragment.appendChild(link1);
        fragment.appendChild(link2);
      }
      (document.head || document.querySelector('head')).appendChild(fragment);
    }





// navigation
///////////////////////////////////////////////////////////////////////

    // change navigation li class
    function swapNavSelection(parentNode, previous) {
      if (previous.parentNode) {
        previous.parentNode.classList.remove('selected');
      }
      previous.parentNode = parentNode;
      parentNode.classList.add('selected');
    }

    // TODO: move this to the relative relevant section
    categories = $('select[name=category]')[0];

    // take control over each section click
    $('nav a').on('click', function click(e) {
      var
        parentNode = this.parentNode,
        offsetHeight
      ;
      e.preventDefault();
      // in case kinetic was working
      if (click.sk) click.sk.cancel();
      // closing the whole menu if already selected
      if (parentNode.classList.contains('selected')) {
        click.parentNode = null;
        parentNode.classList.remove('selected');
        // new one
        click.sk = new SimpleKinetic({
          context: section.map,
          onstart: function () {
            // invert status
            click.ms.display = 'block';
            click.np.appendChild(section.nav).style.cssText = '';
          },
          onmove: function (x, y, dx, dy, ex, ey) {
            click.ms.minHeight = y + 'px';
          },
          onend: function (x, y, dx, dy, ex, ey) {
            click.ms.minHeight = null;
            findMe.style.zIndex = 
            categories.style.zIndex = 9999;
          }
        });
        offsetHeight = section.nav.offsetHeight;
        click.sk.init(
          0,
          offsetHeight,
          0,
          display.height - offsetHeight,
          false,
          true
        );
      }
      // in case it's already opened
      else if(click.parentNode) {
        // change section smoothly
        // go to the new scroll position first
        // then swap the current section selection
        swapNavSelection(parentNode, click);
      }
      // opening otherwise
      else {
        // create a SimpleKinetic instance
        // with the section map as context
        click.sk = new SimpleKinetic({
          context: section.map,
          onstart: function () {
            findMe.style.zIndex = 
            categories.style.zIndex = 0;
          },
          onmove: function (x, y, dx, dy, ex, ey) {
            click.ms.minHeight = y + 'px';
          },
          onend: function () {
            // top nav can be fixed now
            section.nav.style.cssText =
              'position:fixed;top:0;width:' + display.width + 'px;'
            ;
            document.body.appendChild(section.nav);
            // drop the map
            click.ms.display = 'none';
            setTimeout(
              swapNavSelection,
              50,
              click.sk.trigger,
              click
            );
          }
        });
        // shortcuts to speed up operations
        if (!click.np) {
          // these need to be addressed once
          click.np = section.nav.parentNode;
          click.ms = section.map.style;
        }
        click.sk.trigger = parentNode;
        offsetHeight = section.map.offsetHeight;
        click.sk.init(
          0,
          offsetHeight,
          0,
          (
            $('footer', section.map)[0].offsetHeight -
            offsetHeight
          ),
          false,
          true
        );
      }
      try{this.blur()}catch(o_O){}
    });


// section#map
///////////////////////////////////////////////////////////////////////

    // initialize once the map
    L.tileLayer(
      'http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg',
      {
        attribution: 'Map Tiles &copy; Open MapQuest',
        maxZoom: 18,
        minZoom: 3
      }
    ).addTo(
      // one map for all places of all activities
      map = L.map($('section#map > div.map')[0])
    );
    group = L.layerGroup().addTo(map);
    setMapView(
      navigator.country ?
        navigator.country.geo :
        [51.4791, 0]
      ,
      6
    );

    // locate the user when asked
    findMe = $('button#find-me')[0];
    if ('geolocation' in navigator) {
      findMe.on('click', function (e) {
        findMe.firstChild.classList.remove('fa-compass');
        findMe.firstChild.classList.add('fa-spin', 'fa-refresh');
        findMe.disabled = true;
        findMe.moved = false;
        try {
          if (watchId) navigator.geolocation.clearWatch(watchId);
          watchId = navigator.geolocation.watchPosition(
            function(position){
              // update current position marker on the map
              if (!findMe.moved) {
                findMe.moved = true;
                setMapView(position.coords, 14);
              }
              updatePositionIcon(position.coords);
              enableFindMe();
            },
            enableFindMe,
            // a new position every 5 minutes is OK
            // this is not a drive application
            // and the GPS usually drains phone batteries
            // in this way we are not too greedy
            {maximumAge: 300000}
          );
        } catch(o_O) {
          // geolocation unusable
          findMe.remove();
        }
        findMe.blur();
      });
    } else {
      // nothing to do, let's remove the button
      findMe.remove();
    }

    // grab activitites and show them
    grabActivities();

    // if there are already activities
    if (storage.length) {
      evaluateAndShowOnMap(
        // usually stored at the end of a section
        storage.getItem('equolo.activities')
      );
      tmp = storage.getItem('equolo.map');
      if (tmp) {
        setMapView.apply(null, JSON.parse(tmp));
      }
    }

    // in any case swap icons once zoom change
    map.on('zoomend', function zoom(e) {
      var
        z = map.getZoom(),
        c = zoom.current || 0
      ;
      zoom.current = z;
      if (c === 0 || (
        // there tehere are icons to swap
        (ZOOM_FOR_ICONS <= z && c < ZOOM_FOR_ICONS) ||
        (z < ZOOM_FOR_ICONS && ZOOM_FOR_ICONS <= c)
      )) {
        // in these cases icons
        // should be replaced
        updateMapMarkers();
      }
    });

    // when moved, the find-me should be marked as
    // true so that while waiting for position
    // the user won't be redirected
    map.on('movestart', function () {
      findMe.moved = true;
    });

    // this is for all actions needed once the map has been moved
    map.on('moveend', function () {
      var
        zoom = map.getZoom(),
        center = map.getCenter()
      ;
      if (ZOOM_FOR_BBOX <= zoom) {
        // console.log('DO STUFF');
      }
      storage.setItem(
        'equolo.map',
        JSON.stringify([center, zoom])
      );
    });

    window
      .on('pagehide', saveActivities)
      .on('unload', saveActivities)
    ;

    // time to setup IE9Mobile
    if (IE9Mobile) {
      window.trigger('leaflet:map', map);
    }

  }

  function saveActivities() {
    if (storage.length) {
      try {
        storage.setItem(
          'equolo.activities',
          lastReceivedActivities || ''
        );
      } catch(o_O) {
        // too much data, remove it or optimize it
        // TODO: optimize it
        storage.setItem('equolo.activities', '');
      }
    }
  }

  function enableFindMe() {
    findMe.firstChild.classList.remove('fa-spin', 'fa-download');
    findMe.firstChild.classList.add('fa-compass');
    findMe.disabled = false;
  }

  function addActivityToTheMap(activity) {
    for(var
      marker,
      putIcon = ZOOM_FOR_ICONS <= map.getZoom(),
      options = putIcon || {
        stroke: true,
        color: '#286868',
        weight: 2,
        opacity: 1,
        fill: true,
        fillColor: '#E6A72A',
        fillOpacity: 1,
        radius: 8,
        clickable: false,
        pointerEvents: false
      },
      place = activity.place,
      i = 0; i < place.length; i++
    ) {
      if (putIcon) {
        marker = createMarker(place[i]);
        marker.activity = activity;
        marker.placeIndex = i;
      } else {
        marker = L.circleMarker(toGeoArray(place[i]), options);
      }
      this.addLayer(marker);
    }
  }

  // simplifies the creation of a map icon
  // return the marker added to the map
  function createMarker(place) {
    return L.marker(
      toGeoArray(place),
      {
        icon: L.icon({
          // works with retina too and any pixel density
          iconUrl: fontAwesomeIcon(place.icon, 36),
          iconSize: [36, 36]
        })
      }
    );
  }

  function updatePositionIcon(coords) {
    var latLong = toGeoArray(coords);
    if (!positionIcon) {
      positionIcon = L.circleMarker(
        latLong,
        {
          clickable: false,
          pointerEvents: false
        }
      );
      positionIcon.addTo(map);
    }
    positionIcon.setLatLng(latLong);
  }

  function updateMapMarkers() {
    map.removeLayer(group);
    lastParsedActivities.forEach(
      addActivityToTheMap,
      group = L.layerGroup()
    );
    group.addTo(map);
  }

  // place all received markers on the map
  function evaluateAndShowOnMap(json) {
    // if there is something to do
    if (json) {
      lastParsedActivities = JSON.parse(json).map(unpack);
      lastReceivedActivities = json;
      updateMapMarkers();
    }
  }

  // grab all activities (once per session)
  function grabActivities() {
    var xhr = window.XMLHttpRequest ?
      new XMLHttpRequest :
      new ActiveXObject('Microsoft.XMLHTTP')
    ;
    xhr.open('GET', '/cgi/location.php', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (199 < xhr.status && xhr.status < 400) {
          evaluateAndShowOnMap(xhr.responseText);
        } else {
          // something is wrong, try again in 5 seconds
          setTimeout(grabActivities, 5000);
        }
      }
    };
    xhr.send(null);
  }

  // change the map view
  function setMapView(
    coords, zoom  // zoom is optional
  ) {
    map.setView(
      toGeoArray(coords),
      zoom || Math.max(
        14, map.getZoom()
      )
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

  // given a generic geo object
  // returns a leaflet compatible object
  function toGeoArray(coords) {
    return [
      // coords, geowhatever, array ? fine :-)
      coords.latitude || coords.lat || coords[0] || 0,
      coords.longitude || coords.lng || coords[1] || 0
    ];
  }

  // all places are packed via JSONH to preserve
  // both bandwidth and localStorage space once stringified
  // we then need to unpack them once parsed back
  function unpack(activity) {
    activity.place = JSONH.unpack(activity.place);
    return activity;
  }

  // every time the dispay changes
  display.on('change', onDisplayChange);

}(window, document));