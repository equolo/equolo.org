/*! (C) Andrea Giammarchi */
// @link https://gist.github.com/WebReflection/7311642
var HorizontalScroll = (function(UA, Math){

  var
    // this is horrible, unfortunately needed
    bugged = /Android 4\.0/.test(UA),
    // AFAIK no proper way to do feature in here detection :-(
    preventsAllDefaults = /Android/.test(UA) &&
                          /Chrom(?:e|ium)/.test(UA),
    // shortcut for happy minifiers
    Prototype = HorizontalScroll.prototype,
    // quicker shortcuts
    abs = Math.abs,
    max = Math.max,
    min = Math.min,
    gap = 15
  ;

  // a very essential horizontal touch scroll handler

  // @param the target which parent can scroll
  // i.e. the <p> element within the scrollable container
  // <div class="scrlable"><p></p></div>
  // @param object with handlers
  function HorizontalScroll(el, obj) {
    if (!obj) obj = this;
    // needs the original reference
    this._el = el;
    // and an element with an offset (mainly a Chrome problem)
    while (!el.offsetHeight) el = el.parentNode;
    addOrRemoveListeners(this, this._r = el, true);
    // mark as working
    this.disabled = false;
    // by default, it really does nothing
    // avoiding cheks per each call
    this.onstart  = obj.onstart || nothingToDoHere;
    this.onchange = obj.onchange || nothingToDoHere;
    this.onend    = obj.onend || nothingToDoHere;
    this.onclick  = obj.onclick || nothingToDoHere;
    if ('ontouchend' in document) {
      // MS needs this to drop original scroll behavior
      // others might want to enforce the scrolling
      this._el.parentNode.style.cssText += [
        ';-ms-touch-action:none',
        ';touch-action:none',
        ';overflow:hidden'
      ].join('');
    }
  }

  function nothingToDoHere(o_O){/*literally*/}

  // helps adding or removing listeners
  function addOrRemoveListeners(hs, el, add) {
    var method = (add ? 'add' : 'remove') + 'EventListener';
    el[method]('touchstart', hs, true);
    el[method]('touchmove', hs, true);
    el[method]('touchend', hs, true);
  }

  Prototype.clear = function clear() {
    addOrRemoveListeners(this, this._r, false);
  };

  // entry point for the handler
  Prototype.handleEvent = function handleEvent(e) {
    if (this._vscrolling && e.type !== 'touchend') return;
    if (preventsAllDefaults) e.preventDefault();
    this[e.type](e);
  };

  Prototype.touchstart = function touchstart(e) {
    // only if not scrolling yet
    if (!this._scrolling) {
      // remember first X in the page
      // also the first Y to avoid undesired clicks
      // even if slower to calculate,
      // pageX is better than screenX
      // due pixel density agnostic nature
      // once the viewport has been set as mobile
      e = e.touches[0];
      this._x = e.pageX >> 0;
      this._y = e.pageY >> 0;
      this._diffY = 0;
      this._t = 0;
      this._l = 0;
      // I don't care about multiple fingers for now
    }
  };

  Prototype.touchmove = function touchmove(e) {
    var
      touch = e.touches[0],
      pageX = touch.pageX >> 0
    ;
    if (this._scrolling) {
      // do not let it scroll by its own
      e.preventDefault();
      // do not propagate the action anywhere
      e.stopPropagation();
      // calculate the different x from
      // the beginning of the action
      e.x = pageX - this._diffX - this._x;
      // however, Android 4.0 will ignore that
      // reflecting the value if get but not the layout
      if (bugged) {
        this._p.style.marginLeft = max(
          this._m,
          min(0, e.x + this._l)
        ) + 'px';
        this._e = e.x;
      } else {
        // change the scroll
        this._p.scrollLeft = this._s - e.x;
      }
      // notify the scroll changed
      this.onchange(e);
    }
    // verify if scrolling
    else {
      // calculate current diff from the first pageX/Y
      this._diffX = pageX - this._x;
      this._diffY = touch.pageY - this._y;
      this._vscrolling = gap <= this._t++ || gap <= abs(this._diffY);
      // if that's about 15 or more
      this._scrolling = !this._vscrolling && gap <= abs(this._diffX);
      // then it's scrolling
      if (this._scrolling) {
        e.preventDefault();
        // grab the element that should scroll
        this._p = this._el.parentNode;
        // store initial scrolling value
        this._s = this._p.scrollLeft;
        if (bugged) {
          if (!this._l) {
            this._l = parseFloat(this._p.style.marginLeft || 0);
            if (!this._l && this._p.scrollLeft) {
              this._l = -this._p.scrollLeft;
              this._p.scrollLeft = 0;
              this._p.style.marginLeft = this._l + 'px';
            }
            // minimum margin left
            // so it won't disappear from the screen
            if (!this._m) {
              this._m = this._p.clientWidth - this._p.scrollWidth;
            }
          }
          this._s = -this._l;
        }
        // notify the action
        this.onstart(e);
      }
    }
  };

  Prototype.touchend = function touchend(e) {
    // and if there are no fingers anymore on the screen
    if (!e.touches.length) {
      // if it was scrolling
      if (this._scrolling) {
        // do not do anything by default
        e.preventDefault();
        // drop the parentNode reference
        // so we have one less leak to think about
        this._p = null;
        if (bugged)
          this._l = max(
            this._m,
            min(0, this._e + this._l)
          )
        ;
        // notify the end
        this.onend(e);
      } else if (!this._vscrolling) {
        // no scrolled, this was a click intent
        // bear in mind some browser might fire
        // the click regardless the default has been prevented
        this.onclick(e);
      }
      // reset them all
      this._t = 0;
      this._scrolling = false;
      this._vscrolling = false;
    }
  };

  // so it is possible to react differently
  // through the marginLeft out there
  HorizontalScroll.compat = bugged;

  // the bare essential constructor
  return HorizontalScroll;

}(navigator.userAgent, Math));