/*! (C) Andrea Giammarchi */
var HorizontalScroll = (function(bugged, Math){

  // for IE10 and IE11 remember to add this
  // CSS to the element that should be scrolled by this
  // -ms-touch-action: none;
  // touch-action: none;

  var
    // shortcut for happy minifiers
    Prototype = HorizontalScroll.prototype,
    // quicker shortcuts
    abs = Math.abs,
    max = Math.max,
    min = Math.min
  ;

  // a very essential horizontal touch scroll handler

  // @param the target which parent can scroll
  // i.e. the <p> element within the scrollable container
  // <div class="scrlable"><p></p></div>
  // @param object with handlers
  function HorizontalScroll(el, obj) {
    for (var type in this) {
      if (type !== 'handleEvent') {
        el.addEventListener(type, this);
      }
    }
    if (!obj) obj = this;
    // by default, it really does nothing
    this.onStart  = obj.onStart || nothingToDoHere;
    this.onChange = obj.onChange || nothingToDoHere;
    this.onEnd    = obj.onEnd || nothingToDoHere;
    this.onClick  = obj.onClick || nothingToDoHere;;
    // this avoids checking while scrolling
    el.style.cssText += ';overflow:hidden;-ms-touch-action:none;touch-action:none';
  }

  function nothingToDoHere(o_O){/*literally*/}

  // entry point for the handler
  Prototype.handleEvent = function handleEvent(e) {
    this[e.type](e);
  };

  Prototype.touchstart = function touchstart(e) {
    e.preventDefault();
    // only if not scrolling yet
    if (!this._scrolling) {
      // remember first X in the page
      // even if slower to calculate,
      // pageX is better than screenX
      // due pixel density agnostic nature
      // once the viewport has been set as mobile
      this._x = e.touches[0].pageX >> 0;
      // I don't care about multiple fingers for now
    }
  };

  Prototype.touchmove = function touchmove(e) {
    var pageX = e.touches[0].pageX >> 0;
    // do not let it scroll by its own regardless
    e.preventDefault();
    // if already scrolling
    if (this._scrolling) {
      // do not propagate the action anywhere
      e.stopPropagation();
      // calculate the different x from
      // the beginning of the action
      e.x = pageX - this._diffX - this._x;
      // change the scroll
      this._p.scrollLeft = this._s - e.x;
      // however, Android 4.0 will ignore that
      // reflecting the value if get but not the layout
      if (bugged) {
        this._p.style.marginLeft = max(
          this._m,
          min(0, e.x + this._l)
        ) + 'px';
        this._e = e.x;
      }
      // notify the scroll changed
      this.onChange(e);
    } else {
      // calculate current diff from the first pageX
      this._diffX = pageX - this._x;
      // if that's about 15 or more
      this._scrolling = 14 < abs(this._diffX);
      // then it's scrolling
      if (this._scrolling) {
        // grab the element that should scroll
        this._p = e.currentTarget.parentNode;
        // store initial scrolling value
        this._s = this._p.scrollLeft;
        if (bugged) {
          if (!this._l) {
            this._l = 0;
            // minimum margin left
            // so it won't disappear from the screen
            this._m = this._p.clientWidth - this._p.scrollWidth;
          }
          this._s = -this._l;
        }
        // notify the action
        this.onStart(e);
      }
    }
  };

  Prototype.touchend = function touchend(e) {
    // do not do anything by default
    e.preventDefault();
    // and if there are no fingers anymore on the screen
    if (!e.touches.length) {
      // if it was scrolling
      if (this._scrolling) {
        // drop the parentNode reference
        // so we have one less leak to think about
        this._p = null;
        // set it as non scrolling
        this._scrolling = false;
        if (bugged)
          this._l = max(
            this._m,
            min(0, this._e + this._l)
          )
        ;
        // notify the end
        this.onEnd(e);
      } else {
        // no scrolled, this was a click intent
        this.onClick(e);
      }
    }
  };

  // the bare essential constructor
  return HorizontalScroll;

}(/Android 4\.0/.test(navigator.userAgent), Math));