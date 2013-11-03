// let's dirtly feature detect browser capabilities
// in the worst case scenario, we'll prepare
// the most common icon fallback: the marker one
try{if(IE9Mobile||fontAwesomeIcon('?',36).length<36)throw 0}catch(o_O){
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
    // all icons used per each category
    icons,
    iconDescription,
    // IE9Mobile FontCawesome glyphs
    glyphs,
    // current single group logic/implementation
    groups,
    group,
    // user position
    positionIcon,
    // the location button
    findMe,
    // sections
    section,
    // data
    lastReceivedActivities,
    lastParsedActivities,
    lastReducedActivities,
    // special lazy function case
    scroll
  ;

  // things that should be done ASAP
  function DOMContentLoaded() {

    // if performed already, do nothing
    // there are cases where this event is not fired
    // probably the reason is the document.write trick
    if (DOMContentLoaded.done) return;
    DOMContentLoaded.done = true;

    cleanTheStage();

    // solve IE9Mobile problem with fonts
    if (IE9Mobile)
      FontCawesome('../fonts/fontawesome-webfont.svg')
    ;

    // drop all noscript elements
    $('noscript').forEach(function(noscript){
      // place the navigation menu in place
      if (noscript.className == 'nav') {
        $('footer')[0].innerHTML = noscript.textContent;
      }
      noscript.remove();
    });
    // user should not be able to scroll
    DOMScroll(false);

  }
  document.once('DOMContentLoaded', DOMContentLoaded);

  // try window.onload to be sure everythingis there
  // (font, map, css, etc)
  window.once('load', equolo);

  // not necessary but nice to keep it semantic
  // also returns the map node
  function cleanTheStage() {
    while (document.body.firstChild.id != 'map') {
      // map is the firt valid section in a JS enabled env
      document.body.removeChild(
        document.body.firstChild
      );
    }
    return document.body.firstChild;
  }

  // here the home page, Welcome to equolo.org !
  function equolo() {



// initialization
///////////////////////////////////////////////////////////////////////

    var navLink, el, tmp, watchId;

    // be sure the document is prepared
    DOMContentLoaded();

    // if there's still no map
    // we need to wait for it
    if (!window.L) return setTimeout(equolo, 15);

    // map all sections once
    // these won't change anyway during
    // interaction lifecycle ;-)
    section = {
      map: cleanTheStage(),
      about: $('#about')[0],
      contact: $('#contact')[0],
      pinIt: $('#pin-it')[0]
    };
    section.nav = $('nav', section.map)[0];
    section.details = [
      section.about,
      section.contact,
      section.pinIt
    ];

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

      // same is for the welcome, an equolo logo would be nicer
      tmp = document.createElement('canvas');
      tmp.style.cssText = 'width:' + 20 + 'px;' +
                          'height:' + 20 + 'px;';
      $('li.intro h3 > i')[0].replace(
        equoloIcon(
          tmp,
          20 * display.ratio,
          '#064646'
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
      previous.section = parentNode.firstChild.href.split('#')[1];
      parentNode.classList.add('selected');
    }

    // TODO: move this to the relative section
    categories = $('select[name=category]')[0];
    categories.on('change', function(){
      updateMapMarkers(false);
    });
    icons = [].map.call(categories.options, function (option) {
      this[option.value] = option.textContent;
      return option.value;
    }, iconDescription = {});

    // take control over each section click
    navLink = $('nav a').on('click', function click(e) {
      var
        parentNode = this.parentNode,
        offsetHeight
      ;
      // in case kinetic was working
      if (click.sk) click.sk.cancel();
      // closing the whole menu if already selected
      if (parentNode.classList.contains('selected')) {
        e.preventDefault();
        click.parentNode = null;
        parentNode.classList.remove('selected');
        offsetHeight = section.nav.offsetHeight;
        // a new kinetic
        (click.sk = new SimpleKinetic({
          context: section.map,
          onstart: function () {
            click.kinetic = true;
            // in case DOM was scrolling
            if (scrollIntoSection.sk) scrollIntoSection.sk.cancel();
            // invert status
            DOMScroll(false);
            document.body.scrollTop =
            document.documentElement.scrollTop = 0;
            // NOTE: needed in IE9 Mobile
            click.ms.display = 'block';
            click.np.appendChild(section.nav);
          },
          onmove: function (x, y, dx, dy, ex, ey) {
            click.ms.minHeight = y + 'px';
          },
          onend: function (x, y, dx, dy, ex, ey) {
            click.ms.minHeight = null;
            findMe.style.zIndex = 
            categories.style.zIndex = 9999;
            map.invalidateSize();
            click.kinetic = false;
            click.doNotScroll = true;
          }
        })).init(
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
        if (IE9Mobile) {
          swapNavSelection(parentNode, click);
        } else {
          e.preventDefault();
          // change section smoothly
          // then go to the new scroll position
          swapNavSelection(parentNode, click);
          setTimeout(
            scrollIntoSection,
            300,
            parentNode
          );
        }
      }
      // opening otherwise
      else {
        e.preventDefault();
        // create a SimpleKinetic instance
        // with the section map as context
        click.sk = new SimpleKinetic({
          context: section.map,
          onstart: function () {
            click.doNotScroll = false;
            click.kinetic = true;
            findMe.style.zIndex = 
            categories.style.zIndex = 0;
            DOMScroll(true);
          },
          onmove: function (x, y, dx, dy, ex, ey) {
            click.ms.minHeight = y + 'px';
          },
          onend: function () {
            // top nav can be fixed now
            //section.nav.style.cssText = 'position:fixed;top:0;width:' + display.width + 'px;';
            //document.body.appendChild(section.nav);
            section.about.prepend(section.nav);
            // drop the map
            click.ms.display = 'none';
            setTimeout(
              swapNavSelection,
              50,
              click.lt,
              click
            );
            setTimeout(
              scrollIntoSection,
              350,
              click.lt
            );
            click.kinetic = false;
          }
        });
        // shortcuts to speed up operations
        if (!click.np) {
          // these need to be addressed once
          click.np = section.nav.parentNode;
          click.ms = section.map.style;
        }
        click.lt = parentNode;
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
        // once the menu gets clicked
        // the document could scroll
        // and the section might want
        // to be automagically updated
        // let's implement once such logic in here
        if (!click.scroll) {
          click.scroll = true;
          [ document,
            document.documentElement,
            document.body
          ].forEach(function(el){
            // add all events
            // and lazy detect later on
            el
              .on('scroll', this)
              .on('mousewheel', this)
            ;
            this.i = 0;
          }, function onscroll(e) {
            // if automatic scroll, do nothing, same if the map is visible
            // since the list of items might triger the scroll action too
            if (scrollIntoSection.kinetic || click.kinetic || click.doNotScroll) return;
            var
              // ask for position
              // in case it's the user scrolling
              // after pressing about (first section)
              // where no scrollTop is mutated
              scrollTop = scroll(),
              el, i, s, total
            ;
            // do checks only if knowing where
            if (scroll.el) {
              // document has no scrollTop
              // but might be the scroll event trigger
              el = 'scrollTop' in this ? this : scroll.el;
              // so we care only about the trigger
              if (el == scroll.el) {
                i = total = 0;
                s = scrollTop + display.height / 3;
                while(i < section.details.length) {
                  el = section.details[i++];
                  total += el.offsetHeight + 8;
                  if (s < total) {
                    --i;
                    break;
                  }
                }
                if (i != onscroll.i) {
                  onscroll.i = i;
                  swapNavSelection(navLink[i].parentNode, click);
                }
              } else {
                // otherwise we don't care
                // it's just capturing stuff
                this
                  .off('scroll', onscroll)
                  .off('mousewheel', onscroll)
                ;
              }
            }
          });
        }
      }
      try{this.blur()}catch(o_O){}
    });


// section#map
///////////////////////////////////////////////////////////////////////

    // initialize once the map
    L.tileLayer(
      'http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg',
      {
        attribution: 'Map Tiles <a href="http://open.mapquest.com/">&copy; Open MapQuest</a>',
        maxZoom: 18,
        minZoom: 3
      }
    ).addTo(
      // one map for all places of all activities
      map = L.map($('section#map > div.map')[0])
    );
    groups = {};
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
                setMapView(position.coords, 15);
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
      } else {
        $('section#map > div.location > ul > li.intro')[0].style.display = 'block';
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
        updateMapMarkers(true);
        updateInfoOnBar();
      }
    });

    // when moved, the find-me should be marked as
    // true so that while waiting for position
    // the user won't be redirected
    map.on('movestart', function () {
      findMe.moved = true;
    });

    // this is for all actions needed once the map has been moved
    map.on('moveend', tmp = Delayed(function () {
      var
        zoom = map.getZoom(),
        center = map.getCenter(),
        bounds
      ;
      storage.setItem(
        'equolo.map',
        JSON.stringify([center, zoom])
      );
    }));
    map.on('movestart', tmp.clear);

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

  function flatActivities() {
    return lastReducedActivities || (
      lastReducedActivities = lastParsedActivities.reduce(
        flatPlaces, []
      )
    );
  }

  function enrichPlace(place) {
    place.name = this.name;
    place.description = this.description;
    place.aid = this.id;
    return place;
  }

  function flatPlaces(p,c){
    return p.concat(c.place.map(enrichPlace, c));
  }

  function addActivityToTheMap(activity) {
    for(var
      marker, current, icon,
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
      current = place[i];
      icon = current.icon;
      if (putIcon) {
        marker = createMarker(current);
        marker.activity = activity;
        marker.placeIndex = i;
      } else {
        marker = L.circleMarker(toGeoArray(current), options);
      }
      groups[icon].addLayer(marker);
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

  function addMarkers() {
    for(var value = categories.value, i = 1; i < icons.length; i++) {
      if (value == 'all' || value == icons[i]) {
        groups[icons[i]].addTo(map);
      }
    }
  }

  function removeMarkers(erase) {
    // do not include all as layer, starts from 1
    for(var i = 1; i < icons.length; i++) {
      // if there was such layer
      if (groups.hasOwnProperty(icons[i])) {
        // remove it
        map.removeLayer(groups[icons[i]]);
      }
      if (erase) {
        // create a new layer for this category/icon
        groups[icons[i]] = L.layerGroup();
      }
    }
  }

  function updateStats(place) {
    if (!this.hasOwnProperty(place.icon)) {
      this[place.icon] = 0;
    }
    this[place.icon]++;
  }

  function updateInfoOnBar() {
    // TODO:  this is not working as expected
    //        plus it's completely user unfriendly
    if (updateInfoOnBar.moveend) {
      map.off('moveend', updateInfoOnBar.moveend);
      map.off('movestart', updateInfoOnBar.moveend.clear);
    }
    if (map.getZoom() < ZOOM_FOR_ICONS) {
      // show stats
      updateInfoOnBar.el = $('section#map > div.location > ul > li.stats')[0];
      updateInfoOnBar.el.style.display = 'block';
      map.on('moveend', updateInfoOnBar.moveend = Delayed(function () {
        // TODO:  IE9 Mobile won't reach this point
        //        find a solution
        var p, key, stats = {}, result = [];
        flatActivities().filter(
          onlyInBox,
          map.getBounds()
        ).forEach(
          updateStats,
          stats
        );
        for (key in stats) {
          if (stats.hasOwnProperty(key)) {
            result.push(
              '<i class="fa fa-' +
                key +
              '"></i> ' +
                iconDescription[key] +
                ' ' +
                stats[key]
            );
          }
        }
        p = updateInfoOnBar.el.childNodes[1];
        p.innerHTML = result.length ?
          result.join(', ') :
          'we have nothing nothing in this area :-(<br/>' +
          'do you know any activity that could be part of equolo?'
        ;
        if (IE9Mobile)
          FontCawesome.fix(p)
        ;
      }));
      map.on('movestart', updateInfoOnBar.moveend.clear);
    } else {
      // show details
      if (updateInfoOnBar.el) {
        updateInfoOnBar.el.style.display = 'none';
      }
      updateInfoOnBar.el = $('section#map div.location > ul')[0];
      map.on('moveend', updateInfoOnBar.moveend = Delayed(function () {
        var
          fragment = document.createDocumentFragment(),
          size = 0
        ;
        updateInfoOnBar.el.innerHTML = '';
        flatActivities().filter(
          onlyInBox,
          map.getBounds()
        ).forEach(
          function (place) {
            var
              li = this.appendChild(
                document.createElement('li')
              ),
              h3 = li.appendChild(
                document.createElement('h3')
              ),
              p = li.appendChild(
                document.createElement('p')
              )
            ;
            li.className = 'place';
            h3.appendChild(
              document.createElement('i')
            ).classList.add(
              'fa', 'fa-' + place.icon
            );
            h3.appendChild(
              document.createTextNode(' ' + place.name)
            );
            p.appendChild(
              document.createTextNode(place.description)
            );
            size += 276;
          },
          fragment
        );
        updateInfoOnBar.el.style.width = size + 'px';
        updateInfoOnBar.el.appendChild(fragment);
      }));
      map.on('movestart', updateInfoOnBar.moveend.clear);
    }
  }

  function updateMapMarkers(parseActivity) {
    // remove and if needed erase all layers
    removeMarkers(parseActivity);
    // if specified
    if (parseActivity) {
      // add all latest parsed activities
      lastParsedActivities.forEach(
        addActivityToTheMap
      );
    }
    // show them on map
    addMarkers();
  }

  // place all received markers on the map
  function evaluateAndShowOnMap(json) {
    // if there is something to do
    if (json) {
      lastParsedActivities = JSON.parse(json).map(unpack);
      lastReceivedActivities = json;
      lastReducedActivities = null;
      updateMapMarkers(true);
      updateInfoOnBar();
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

  scroll = function (value) {
    // this needs to be lazy detected
    var el = document.body.scrollTop ?
      // either it's the body
      document.body : (
        // or the html element
        document.documentElement.scrollTop ?
          document.documentElement :
          // otherwise we don't know yet
          null
      )
    ;
    // if we found the scrolling element
    if (el) {
      // we redefine this function once for all
      scroll = function (value) {
        // and we optimize as much as possible this operation
        return value == null ? el.scrollTop : (el.scrollTop = value);
      };
      scroll.el = el;
      return scroll(value);
    }
    // otherwise we wait to find the element
    else if (value == null) {
      return 0;
    } else {
      // trying to blidly set a value
      document.body.scrollTop =
      document.documentElement.scrollTop = value;
    }
  }

  function scrollIntoSection(el) {
    var
      clicked = el.firstChild.href.split('#')[1],
      details = section.details,
      find = true,
      total = 0,
      i = 0,
      length = details.length,
      current = scroll()
    ;
    while(find) {
      find = details[i].id != clicked;
      if (find) {
        total += details[i].offsetHeight + 8;
      }
      i++;
    }
    if (IEMobile) {
      scroll(total);
    } else {
      if (scrollIntoSection.sk) scrollIntoSection.sk.cancel();
      (scrollIntoSection.sk = new SimpleKinetic({
        onstart: function () {
          scrollIntoSection.kinetic = true;
        },
        onmove: function (x, y, dx, dy, ex, ey) {
          scroll(y);
        },
        onend: function (x, y, dx, dy, ex, ey) {
          scroll(ey);
          scrollIntoSection.kinetic = false;
        }
      })).init(
        0,
        current,
        0,
        total - current,
        false,
        true
      );
    }
  }

  // change the map view
  function setMapView(
    coords, zoom  // zoom is optional
  ) {
    map.setView(
      toGeoArray(coords),
      zoom || Math.max(
        15, map.getZoom()
      )
    );
  }

  function DOMScroll(init) {
    var op = init ? 'remove' : 'add';
    document.documentElement.classList[op]('no-scroll');
    document.body.classList[op]('no-scroll');
  }

  // what happens when the display size changes ?
  function onDisplayChange() {
    restyle({
      // section should have a proper minimum height
      'section': {
        'min-height': display.height + 'px'
      }
    });
    if (map) map.invalidateSize();
  }

  function onlyInBox(place) {
    return this.contains(new L.LatLng(
      place.latitude,
      place.longitude
    ));
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