/*! (C) Andrea Giammarchi */
// @link https://gist.github.com/WebReflection/7313880
(function (navigator, document, pointerEnabled) {

  // highly experimental, should work on IE10 and IE11 only

  if (!(
    (pointerEnabled = !!navigator.pointerEnabled) ||
    navigator.msPointerEnabled
  ) ||
    'ontouchend' in document
  ) return;

  var
    // IE10 and IE11 have different names
    TYPE_MOUSE = (pointerEnabled ? '' : 'MS') + 'POINTER_TYPE_MOUSE',
    // for types too
    type = function (type) {
      return pointerEnabled ? type.toLowerCase() : 'MS' + type;
    },
    // so we might want to unwrap these
    untype = pointerEnabled ?
      function (type) {
        return type;
      } :
      function (type) {
        return type.slice(2).toLowerCase();
      }
    ,
    // while here a shortcut
    addListener = function (where, how, which) {
      // intercept all the pointer events
      how.call(where, type(which), handler, true);
    },
    // these are calls to the passed event
    commonMethod = function (name) {
      return {
        value: function () {
          Event[name].call(this);
          this._[name]();
        }
      };
    },
    // these are common DOM overrides
    commonOverride = function (proto, name) {
      var original = proto[name];
      Object.defineProperty(proto, name, {
        configurable: true,
        value: function (type, eventHandler, capture) {
          if (type in types) {
            original.call(this, types[type], handler, capture);
          }
          return original.call(this, type, eventHandler, capture);
        }
      });
    },
    // these are delegated properties
    commonProperty = function (name) {
      return {
        get: function () {
          return this._[name];
        }
      };
    },
    // shortcut for all events
    dispatchEvent = function (type, e) {
      var c = document.createEvent('Event');
      c.initEvent(type, true, true);
      _.value = e;
      Object.defineProperties(c, TouchEventProperties);
      e.target.dispatchEvent(c);
    },
    // basically says if it's touch or not
    humanReadablePointerType = function (e) {
      var pointerType = e.pointerType;
      return (
        pointerType === e[TYPE_MOUSE] ||
        pointerType === 'mouse'
      ) ? 'mouse' : 'touch'; // right now pen is fine as touch
    },
    // silly method for the TouchList nobody uses anyway
    item = function (i) {
      return this[i];
    },
    // recycle all the Array extras functions
    returnTouch = function (id) {
      return touches[id];
    },
    // recycle common descriptors too
    _ = {value: null},
    Event = document.createEvent('Event'),
    // all properties per each event
    // defined at runtime .. not so fast
    // but still OKish in terms of RAM and CPU
    TouchEventProperties = {
      _: _,
      touches: {
        configurable: true,
        get: function () { // lazily defined once
          _.value = Object.keys(touches).map(returnTouch);
          return Object.defineProperty(this, 'touches', _).touches;
        }
      },
      // almost everything is mirrored
      relatedTarget: commonProperty('relatedTarget'),
      currentTarget: commonProperty('currentTarget'),
      target: commonProperty('target'),
      altKey: commonProperty('altKey'),
      metaKey: commonProperty('metaKey'),
      ctrlKey: commonProperty('ctrlKey'),
      shiftKey: commonProperty('shiftKey'),
      // including methods
      preventDefault: commonMethod('preventDefault'),
      stopPropagation: commonMethod('stopPropagation'),
      stopImmediatePropagation: commonMethod('stopImmediatePropagation')
    },
    // the list of touches
    touches = Object.create(null),
    // all types translated
    types = Object.create(null),
    // the unique handler for all the things
    handler = {
      handleEvent: function (e) {
        // when an event occurres
        if (humanReadablePointerType(e) === 'touch') {
          // invoke normalized methods
          handler[untype(e.type)](e);
        }
      },
      pointerdown: function (e) {
        touches[e.pointerId] = new Touch(e);
        dispatchEvent('touchstart', e);
      },
      pointermove: function (e) {
        touches[e.pointerId]._ = e;
        dispatchEvent('touchmove', e);
      },
      pointerup: function (e) {
        delete touches[e.pointerId];
        dispatchEvent('touchend', e);
      }
    }
  ;

  // faacde for initial events info
  function Touch(_) {
    // the event needs to be refreshed
    // each touchmove
    this._ = _;
  }

  // all common properties
  Object.defineProperties(
    Touch.prototype,
    {
      identifier: commonProperty('pointerId'),
      target: commonProperty('target'),
      screenX: commonProperty('screenX'),
      screenY: commonProperty('screenY'),
      clientX: commonProperty('clientX'),
      clientY: commonProperty('clientY'),
      pageX: commonProperty('pageX'),
      pageY: commonProperty('pageY')
    }
  );

  types['touchstart'] = type('PointerDown');
  types['touchmove']  = type('PointerMove');
  types['touchend']   = type('PointerUp');

  commonOverride(document, 'addEventListener');
  commonOverride(document, 'removeEventListener');
  commonOverride(Element.prototype, 'addEventListener');
  commonOverride(Element.prototype, 'removeEventListener');

  // mark these are available
  document.ontouchstart =
  document.ontouchmove =
  document.ontouchend = null;

}(navigator, document));