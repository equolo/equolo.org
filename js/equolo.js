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
    ZOOM_MAX = 18,
    ZOOM_MIN = 3,
    // coordinates utility
    mercator = new Mercator(256),
    // the shared map instance
    map,
    minimap,
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
    scroll,
    // as a matter of welcome :-)
    veryFirstTime = true
  ;

  // things that should be done ASAP
  window.onDOM(function(){

    // solve IE9Mobile problem with fonts
    if (IE9Mobile)
      FontCawesome('../fonts/fontawesome-webfont.svg')
    ;

    // clean dirty nodes on stage
    cleanTheStage();

    // drop all noscript elements
    $('noscript').forEach(function(noscript){
      // navigation menu in place
      /* actually some browser won't parse noscript content
      // so we need to duplicate this in the HTML page
      if (noscript.className == 'nav') {
        alert(noscript.parentNode.innerHTML);
        $('footer')[0].innerHTML = noscript.textContent;
      }
      */
      noscript.remove();
    });

    // user should not be able to scroll
    DOMScroll(false);

  });

  // use window.onload to "hope" everythingis there
  // (font, map, css, etc)
  window.onLoad(equolo);

  // not necessary but nice to keep the body semantic
  function cleanTheStage() {
    while (document.body.firstChild.id != 'map') {
      // map is the firt valid section in a JS enabled env
      document.body.removeChild(
        document.body.firstChild
      );
    }
  }

  // here the home page, Welcome to equolo.org !
  function equolo() {



// initialization
///////////////////////////////////////////////////////////////////////

    var navLink, el, tmp, watchId;

    // if there's still no map
    // we need to wait for it
    if (!window.L) return setTimeout(equolo, 15);

    // map all sections once
    // these won't change anyway during
    // interaction lifecycle ;-)
    section = {
      map: $('section#map')[0],
      about: $('section#about')[0],
      contact: $('section#contact')[0],
      pinIt: $('section#pin-it')[0]
    };
    section.nav = $('nav', section.map)[0];
    section.placeDetails = $('div.details', section.map)[0];
    section.location = $('div.location', section.map)[0];
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
      updateInfoOnBar();
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
            section.placeDetails.style.height =
              section.placeDetails.style._height;
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
            findMe.style.zIndex = 
            categories.style.zIndex = 0;
            section.placeDetails.style._height =
              section.placeDetails.style.height;
            section.placeDetails.style.height = 0;
            click.doNotScroll = false;
            click.kinetic = true;
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
    section.tiles = $('#tiles')[0];
    map = createMap(section.tiles);
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
        veryFirstTime = false;
        setMapView.apply(null, JSON.parse(tmp));
      }
    }
    if(veryFirstTime) {
      $('li.intro', section.map)[0].style.cssText = 'display:block;margin-left:' + (
        getScrollableMargin()
      ) + 'px;';
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
      veryFirstTime = false;
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

  function createMap(node, extraOptions) {
    var
      options = {
        attribution: 'Map Tiles <a href="http://open.mapquest.com/">&copy; Open MapQuest</a>',
        maxZoom: ZOOM_MAX,
        minZoom: ZOOM_MIN
      },
      map
    ;
    map = extraOptions ? L.map(node, extraOptions) : L.map(node);
    L.tileLayer(
      'http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg',
      options
    ).addTo(map);
    return map;
  }

  function enableFindMe() {
    findMe.firstChild.classList.remove('fa-spin', 'fa-download');
    findMe.firstChild.classList.add('fa-compass');
    findMe.disabled = false;
  }

  function flatActivities() {
    if (!lastReducedActivities) {
      lastReducedActivities = lastParsedActivities.reduce(
        flatPlaces, []
      );
      /*
      // simplified and quite dumb algo
      // to have ordered points by distance
      for(var
        current, nd, od, p, n,
        changed = false
        j = 0,
        i = 0,
        length = lastReducedActivities.length;
        i < length; i++
      ) {
        current = lastReducedActivities[i];
        if (!current.point) {
          current.point = mercator.coordsToPoint(current, ZOOM_MAX);
        }
        for(od = null, j = i + 1; j < length; j++) {
          p = lastReducedActivities[j];
          nd = mercator.pointDistance(
            current.point,
            p.point || (
              p.point = mercator.coordsToPoint(p, ZOOM_MAX)
            )
          );
          if (!od) {
            od = nd;
          } else if (nd < od || p.point.x < n.point.x) {
            changed = true;
            od = nd;
            lastReducedActivities[j - 1] = p;
            lastReducedActivities[j] = n;
            --j;
          }  
          n = p;
        }
        if (changed && i + 1 == length) {
          i = -1;
          changed = false;
        }
      }
      */
    }
    return lastReducedActivities;
  }

  function orderByDistance(a, b) {
    var distance = mercator.pointDistance(
      mercator.coordsToPoint(a, ZOOM_MAX),
      mercator.coordsToPoint(b, ZOOM_MAX)
    );
    if (!('distance' in a)) {
      a.distance = distance;
    }
    if (!('distance' in b)) {
      b.distance = distance;
    }
    if (a.distance < b.distance) {
      if (distance < a.distance) {
        a.distance = distance;
        return 1;
      }
      return 0;
    } else if(b.distance < a.distance) {
      return -1;
    } else {
      return 0;
    }
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
    var marker = L.marker(
      toGeoArray(place),
      {
        icon: L.icon({
          // works with retina too and any pixel density
          iconUrl: fontAwesomeIcon(place.icon, 36),
          iconSize: [36, 36]
        })
      }
    );
    marker.on('click', onMarkerClick);
    marker.id = place.id;
    return marker;
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
    if (veryFirstTime) return;
    // TODO:  this is not working as expected
    //        plus it's completely user unfriendly
    if (updateInfoOnBar.moveend) {
      map.off('moveend', updateInfoOnBar.moveend);
      map.off('movestart', updateInfoOnBar.moveend.clear);
    }
    // clean up sections
    $('li', section.location).forEach(function (li) {
      if (li.classList.contains('place')) {
        li.remove();
      } else {
        li.style.display = 'none';
      }
    });
    updateInfoOnBar.map = {};
    if (map.getZoom() < ZOOM_FOR_ICONS) {
      // show stats
      if (updateInfoOnBar.el) {
        updateInfoOnBar.el.style.width = null;
      }
      updateInfoOnBar.el = $('li.stats', section.map)[0];
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
        fixFonts(p);
      }));
      map.on('movestart', updateInfoOnBar.moveend.clear);
    } else {
      updateInfoOnBar.el = $('ul', section.map)[0];
      map.on('moveend', updateInfoOnBar.moveend = Delayed(function () {
        var
          activities = flatActivities().filter(
            onlyInBox,
            map.getBounds()
          ),
          length = activities.length,
          fragment = length && document.createDocumentFragment(),
          size = 0,
          keys
        ;
        if (!length) return;
        keys = [];
        activities.forEach(
          function (place) {
            keys.push(place.id);
            if (updateInfoOnBar.map[place.id]) return;
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
            h3.classList.add('ellipsis');
            li.data('coords', place.latitude + '/' + place.longitude);
            li.classList.add('place', 't-all');
            li.id = 'place-' + place.id;
            updateInfoOnBar.map[place.id] = place;
            h3.appendChild(
              document.createElement('i')
            ).classList.add(
              'fa', 'fa-' + place.icon
            );
            h3.appendChild(
              document.createTextNode(' ' + place.name)
            );
            h3.appendChild(
              document.createElement('span')
            ).textContent = place.postcode;
            p.appendChild(
              document.createTextNode(place.description)
            );
            li.on('click', onPlaceClick);
          },
          fragment
        );
        updateInfoOnBar.el.appendChild(fragment);
        length = $('li.place', updateInfoOnBar.el).filter(function(li){
          var id = li.id.slice(6);
          if (keys.indexOf(id) < 0) {
            delete updateInfoOnBar.map[id];
            li.remove();
            return false;
          }
          return true;
        }).length;
        updateInfoOnBar.el.style.width = (
          length * 276 +
          getScrollableMargin() * 2 +
          1
        ) + 'px';
        fixFonts(updateInfoOnBar.el);
        if (!updateInfoOnBar.hscroll) {
          updateInfoOnBar.hscroll = new HorizontalScroll(
            updateInfoOnBar.el, {
              onStart: function () {
                this.x = updateInfoOnBar.el.scrollLeft;
                this.el = onPlaceClick.last || $('li.place', updateInfoOnBar.el)[0];
                onPlaceClick.reset();
              },
              onChange: function (e) {
                this.x = e.x - this.x;
              },
              onEnd: function (e) {
                onPlaceClick.call((
                  this.x < 0 ?
                    this.el.nextElementSibling :
                    this.el.previousElementSibling
                  ) ||
                  this.el,
                  {}
                );
                /*
                var
                  i = Math.round(
                    ( updateInfoOnBar.el.parentNode.scrollLeft -
                      getScrollableMargin()
                    ) / 276
                  ),
                  target = $('li.place', updateInfoOnBar.el)[i]
                ;
                if (target) {
                  if (target === this.el) {
                    target = target[this.x < 0 ? 'previousSibling' : 'nextSibling'];
                    if (target) {
                      onPlaceClick.call(target, {});
                    }
                  }
                }
                */
              },
              onClick: function (e) {
                if (IEMobile) return;
                var target = e.target;
                e.preventDefault();
                e.stopPropagation();
                while(target && target.nodeName !== 'LI') {
                  target = target.parentNode;
                }
                if (target && target.nodeName === 'LI') {
                  onPlaceClick.call(target, {});
                }
              }
            }
          );
        }
        /*
        if (onPlaceClick.last) {
          fragment = onPlaceClick.last;
          onPlaceClick.reset();
          onPlaceClick.call(fragment);
        }
        */
      }));
      map.on('movestart', updateInfoOnBar.movestart = function () {
        updateInfoOnBar.moveend.clear();
        onPlaceClick.cancel();
      });
      updateInfoOnBar.moveend();
    }
  }

  function onMarkerClick() {
    $('li#place-' + this.id).trigger('click', false);
  }

  function isPlaceFieldNotEmpty(key) {
    return this[key].length;
  }

  function getObjectProperty(key) {
    return this[key];
  }

  function showDetailsIfNeeded(where, place, fields) {
    var tmp = fields.filter(
      isPlaceFieldNotEmpty,
      place
    );
    if (tmp.length) {
      (where.appendChild(
        document.createElement('li')
      )).textContent = tmp.map(getObjectProperty, place).join(', ');
    }
  }

  function showButtonIfNeeded(where, place, field, icon, content) {
    var li;
    if (place[field]) {
      li = where.appendChild(
        document.createElement('li')
      );
      li.classList.add('button');
      li.appendChild(
        document.createElement('i')
      ).classList.add('fa', 'fa-' + icon);
      li = li.appendChild(
        document.createElement('a')
      );
      li.classList.add('ellipsis');
      li.href = field === (
        'phone' ? 'tel:' : (
          field === 'email' ? 'mailto:' : ''
        )
      ) + place[field];
      li.textContent = place[field];
    }
  }

  function showAllDetails(place) {
    var el, ul, height;
    showAllDetails.showing = true;
    if (!showAllDetails.footer) {
      showAllDetails.footer = section.nav.parentNode.offsetHeight;
    }
    if (!showAllDetails.el) {
      showAllDetails.el = $('div.details', section.map)[0];
    }
    height = section.tiles.offsetHeight;
    el = showAllDetails.el;
    el.style.cssText ='opacity:1;' +
                      'top:' + ($('header', section.map)[0].offsetHeight) + 'px;' +
                      'height:' + (
                        height < 276 ? (height + showAllDetails.footer) : height
                      ) + 'px;';
    if (height < 276) {
      section.location.style.bottom =
      section.nav.parentNode.style.height = 0;
    }
    if (!minimap) {
      showAllDetails.h3 = $('h3', el)[0];
      showAllDetails.info = $('ul', el)[0];
      showAllDetails.address = $('ul.address', el)[0];
      showAllDetails.contact = $('ul.contact', el)[0];
      minimap = createMap($('div.minimap', el)[0], {
        zoomControl: false,
        dragging: false,
        touchZoom: false,
        doubleClickZoom: false,
        scrollWheelZoom: false,
        boxZoom: false,
        keyboard: false,
        attributionControl: false,
        tap: false
      });
    }
    // no need to remove others
    // nicer effect, not a huge deal, practically ...
    createMarker(place).addTo(minimap);
    minimap.setView(
      toGeoArray(place),
      15
    );
    showAllDetails.h3.textContent =
    showAllDetails.address.textContent =
    showAllDetails.contact.textContent = '';
    showAllDetails.h3.appendChild(
      document.createElement('i')
    ).className = 'fa fa-' + place.icon;
    showAllDetails.h3.appendChild(
      document.createTextNode(' ' + place.name)
    );
    ul = showAllDetails.address;
    showDetailsIfNeeded(ul, place, [
      'address',
      'extra',
      'postcode',
      'city'
    ]);
    /*
    showDetailsIfNeeded(ul, place, [
      'county',
      'state',
      'country'
    ]);
    */
    place.phone = '+393387621067';
    place.email = 'polpetta@polpetti.po';
    place.website = 'www.polpetti.com';
    showButtonIfNeeded(ul, place, 'phone', 'phone');
    showButtonIfNeeded(ul, place, 'email', 'envelope');
    showButtonIfNeeded(ul, place, 'website', 'globe');

    fixFonts(el);
    console.log(place);
  }

  function onPlaceClick(e) {
    var
      coords = this.data('coords').split('/'),
      doubleClick = onPlaceClick.last == this,
      scroller = this.parentNode.parentNode,
      placeId = this.id.slice(6),
      li, x, onend
    ;
    if (doubleClick) {
      if (showAllDetails.showing) {
        showAllDetails.showing = false;
        showAllDetails.el.style.cssText = '';
        section.location.style.bottom =
        section.nav.parentNode.style.height = null;
      } else {
        showAllDetails(updateInfoOnBar.map[placeId]);
      }
    } else {
      onend = e.detail === false ? Object : function (x, y, dx, dy, ex, ey) {
        var cancel = onPlaceClick.cancel;
        onPlaceClick.cancel = Object;
        setMapView(
          {
            latitude: parseFloat(coords[0]),
            longitude: parseFloat(coords[1])
          },
          map.getZoom()
        );
        onPlaceClick.cancel = cancel;
        if (showAllDetails.showing) {
          showAllDetails(updateInfoOnBar.map[placeId]);
        }
      };
      onPlaceClick.cancel();
      (onPlaceClick.last = this).classList.add('selected');
      x = 0;
      li = this.previousElementSibling;
      while (li.classList.contains('place')) {
        li = li.previousElementSibling;
        x += 276;
      }
      (onPlaceClick.sk = new SimpleKinetic({
        onmove: function (x, y, dx, dy, ex, ey) {
          scroller.scrollLeft = x;
        },
        onend: onend
      })).init(
        scroller.scrollLeft,
        0,
        x - scroller.scrollLeft,
        0,
        true,
        false
      ) || onend();
    }
  }

  onPlaceClick.reset = function () {
    if (onPlaceClick.last) {
      onPlaceClick.last.classList.remove('selected');
      onPlaceClick.last = null;
    }
  };

  onPlaceClick.cancel = function () {
    if (onPlaceClick.sk) {
      onPlaceClick.sk.cancel();
    }
    onPlaceClick.reset();
  };

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

  function getScrollableMargin() {
    return (display.width - 276) >> 1;
  }

  // what happens when the display size changes ?
  function onDisplayChange() {
    var placeMargin = getScrollableMargin();
    restyle({
      // section should have a proper minimum height
      'section': {
        'min-height': display.height + 'px'
      },
      'section#map > div.location li.place:nth-child(3)': {
        'margin-left': placeMargin + 'px'
      },
      'section#map > div.location li.place:last-child': {
        'margin-right': placeMargin + 'px'
      },
      'section#map > div.location > ul > li': {
        'min-height': (150 - SCROLLBAR_SIZE) + 'px'
      }
    });
    if (map) map.invalidateSize();
    if (minimap) minimap.invalidateSize();
  }

  function onlyInBox(place) {
    var value = categories.value;
    return place.icon == value || value == 'all' && this.contains(new L.LatLng(
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

  function fixFonts(el) {
    if (IE9Mobile)
      FontCawesome.fix(el)
    ;
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