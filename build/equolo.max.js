/*! ---------------------------------------------

  )°(, equolo - discovering a sustainable world

  http://equolo.org

  Github Open Source Project:
  https://github.com/equolo/equolo.org

-------------------------------------------------
Copyright (C) 2013 by equolo.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
/*@cc_on
(function(f){
window.setTimeout=f(window.setTimeout);
window.setInterval=f(window.setInterval);
})(function(f){return function(c,t,a){a=[].slice.call(arguments,2);return f(function(){c.apply(this,a)},t)}});
@*/
var
IEMobile=/*@cc_on/\bIEMobile\b/.test(navigator.userAgent)||@*/false,
IE9Mobile=/*@cc_on(IEMobile&&@_jscript_version<10)||@*/false,
IE10Mobile=/*@cc_on(IEMobile&&@_jscript_version/10>=1)||@*/false
;
IE9Mobile&&document.write('<link rel="stylesheet" href="css/IE9Mobile.css"/><script src="js/IE9Mobile.js"></script>');(function(window){
/*! display v0.1.3 - MIT license */
/** easy way to obtain the full window size and some other prop */
var display = function (global) {

  var
    Math = global.Math,
    abs = Math.abs,
    max = Math.max,
    min = Math.min,
    Infinity = global.Infinity,
    screen = global.screen || Infinity,
    matchMedia = window.matchMedia,
    addEventListener = 'addEventListener',
    documentElement = global.document.documentElement,
    shouldBeMobile  = /\bMobile\b/.test(navigator.userAgent),
    handlers = {
      change: []
    },
    display = {
      width: 0,
      height: 0,
      ratio: 0,
      on: function (type, callback) {
        // right now only change is supported
        // throws otherwise
        handlers[type].push(callback);
      }
    },
    forEach = handlers.change.forEach || function (callback, self) {
      // partial polyfill for this case only
      for(var i = 0; i < this.length; i++) {
        callback.call(self, this[i], i, this);
      }
    },
    timer
  ;

  function notify(callback) {
    callback.call(display, display.width, display.height);
  }

  function delayed(e) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(recalc, 300, e);
  }

  function recalc(e) {
    timer = 0;
    var
      devicePixelRatio = global.devicePixelRatio || 1,
      hasOrientation = 'orientation' in this,
      landscape = hasOrientation ?
        abs(this.orientation || 0) === 90 :
        !!matchMedia && matchMedia("(orientation:landscape)").matches
      ,
      swidth = screen.width,    // TODO: verify screen.availWidth in some device
      sheight = screen.height,  // only if width/height not working as expected
      width = min(
        global.innerWidth || documentElement.clientWidth,
        // some Android has 0.75 ratio
        devicePixelRatio < 1 ? Infinity : (
          // Android flips screen width and height size in landscape
          // Find biggest dimension in landscape otherwise width is OK
          (shouldBeMobile && landscape ? max(swidth, sheight) : swidth) || Infinity
        )
      ),
      height = min(
        global.innerHeight || documentElement.clientHeight,
        // some Android has 0.75 ratio
        devicePixelRatio < 1 ? Infinity : (
          // Android flips screen width and height size in landscape
          // Find biggest dimension in landscape otherwise width is OK
          (shouldBeMobile && landscape ? min(swidth, sheight) : sheight) || Infinity
        )
      )
    ;

    if (width !== display.width || height !== display.height) {
      display.width = width;
      display.height = height;
      forEach.call(handlers.change, notify);
    }
  }

  // 
  if (addEventListener in global) {
    global[addEventListener]('orientationchange', delayed, true);
    global[addEventListener]('resize', delayed, true);
    try {
      // W3C proposal
      screen[addEventListener]('orientationchange', delayed, true);
    } catch(e) {}
  } else {
    global.attachEvent('onresize', recalc);
  }

  recalc.call(global);

  // calculated only once
  // works with MS Tablets/Phones too
  display.ratio = global.devicePixelRatio ||
                  screen.width / display.width ||
                  (screen.deviceXDPI || 1) / (screen.logicalXDPI || 1);

  return display;

// ---------------------------------------------------------------------------

}(window);
(function(Array, Function, String){
  'indexOf' in Array || (Array.indexOf = function (v){
    for(var i = this.length; i-- && this[i] !== v;);
    return i;
  });
  'bind' in Function || (Function.bind = function (c){
    var f = this, s = Array.slice, a = s.call(arguments, 1);
    return function () {
      return f.apply(c, a.concat(s.call(arguments)));
    };
  });
  'trim' in String || (String.trim = function(){
    return this.replace(/^[^\S]+|[^\S]+$/g, '');
  });
}(Array.prototype, Function.prototype, String.prototype));/*! (C) WebReflection Mit Style License */
(function(e){"use strict";function t(t){return typeof t=="string"?e.document.createTextNode(t):t}function n(n){if(n.length===1)return t(n[0]);for(var r=e.document.createDocumentFragment(),i=h.call(n),s=0;s<n.length;s++)r.appendChild(t(i[s]));return r}for(var r,i,s,o=/^\s+|\s+$/g,u=/\s+/,a=" ",f=function(t,n){return this.contains(t)?n||this.remove(t):n&&this.add(t),!!n},l=(e.Element||e.Node||e.HTMLElement).prototype,c=["prepend",function(){var t=this.firstChild,r=n(arguments);t?this.insertBefore(r,t):this.appendChild(r)},"append",function(){this.appendChild(n(arguments))},"before",function(){var t=this.parentNode;t&&t.insertBefore(n(arguments),this)},"after",function(){var t=this.parentNode,r=this.nextSibling,i=n(arguments);t&&(r?t.insertBefore(i,r):t.appendChild(i))},"replace",function(){var t=this.parentNode;t&&t.replaceChild(n(arguments),this)},"remove",function(){var t=this.parentNode;t&&t.removeChild(this)}],h=c.slice,p=c.length;p;p-=2)r=c[p-2],r in l||(l[r]=c[p-1]);"classList"in document.documentElement?(s=document.createElement("div").classList,s.add("a","b"),"a b"!=s&&(l=s.constructor.prototype,"add"in l||(l=e.DOMTokenList.prototype),i=function(e){return function(){var t=0;while(t<arguments.length)e.call(this,arguments[t++])}},l.add=i(l.add),l.remove=i(l.remove),l.toggle=f)):(i=function(e){if(!e)throw"SyntaxError";if(u.test(e))throw"InvalidCharacterError";return e},s=function(e){var t=e.className.replace(o,"");t.length&&c.push.apply(this,t.split(u)),this._=e},s.prototype={length:0,add:function(){for(var t=0,n;t<arguments.length;t++)n=arguments[t],this.contains(n)||c.push.call(this,r);this._.className=""+this},contains:function(e){return function(n){return p=e.call(this,r=i(n)),-1<p}}([].indexOf||function(e){p=this.length;while(p--&&this[p]!==e);return p}),item:function(t){return this[t]||null},remove:function(){for(var t=0,n;t<arguments.length;t++)n=arguments[t],this.contains(n)&&c.splice.call(this,p,1);this._.className=""+this},toggle:f,toString:function v(){return c.join.call(this,a)}},(Object.defineProperty||function(e,t,n){e.__defineGetter__(t,n.get)})(l,"classList",{get:function(){return new s(this)},set:function(){}}));try{new e.CustomEvent("?")}catch(d){e.CustomEvent=function(e,t){function n(n,i){var s=document.createEvent(e);if(typeof n!="string")throw new Error("An event name must be provided");return e=="Event"&&(s.initCustomEvent=r),i==null&&(i=t),s.initCustomEvent(n,i.bubbles,i.cancelable,i.detail),s}function r(e,t,n,r){this.initEvent(e,t,n),this.detail=r}return n}(e.CustomEvent?"CustomEvent":"Event",{bubbles:!1,cancelable:!1,detail:null})}})(window);/*! (C) Andrea Giammarchi Mit Style License */
(function(e){"use strict";function E(){return{l:{},m:[],b:[]}}function S(e){var t=E();return c.value=t,p(e,f,c),c.value=null,t}function x(e,t,n){typeof t=="function"?t.apply(e,n):t.handleEvent.apply(t,n)}function T(e,t,n){n&&y(this,"detail",n),y(this,"type",t),y(this,"target",e),y(this,"timeStamp",m())}if(e.eddy)return;e.eddy=!0;var t=Array.prototype,n=e.prototype,r=T.prototype,i=n.hasOwnProperty,s=t.push,o=t.slice,u=t.unshift,a="toLocaleString",f={toLocaleString:1}.propertyIsEnumerable(a)?"_@eddy"+Math.random():a,l=f===a,c=(e.create||e)(null),h=[],p=l?function(e,t,n){e[t]=n.value}:e.defineProperty,d=function(e){var t=this;return function(){return t.apply(e,arguments)}},v=t.indexOf||function(e){var t=this.length;while(t--&&this[t]!==e);return t},m=Date.now||function(){return(new Date).getTime()},g={boundTo:function(t){var n=i.call(this,f)?this[f]:S(this),r=n.m,o=n.b,u=typeof t=="string"?this[t]:t,a=v.call(r,u);return a<0?o[s.call(r,u)-1]=d.call(u,this):o[a]},emit:function(t){var n=i.call(this,f),r=n&&this[f].l,s=n&&i.call(r,t),u=s&&r[t],a=s&&o.call(arguments,1),l=0,c=s?u.length:l;while(l<c)x(this,u[l++],a);return s},listeners:function(t){return i.call(this,f)&&i.call(this[f].l,t)&&this[f].l[t].slice()||[]},off:function(t,n){var r=i.call(this,f),s=r&&this[f].l,o=r&&i.call(s,t)&&s[t],u;return o&&(u=v.call(o,n),-1<u&&(o.splice(u,1),o.length||delete s[t])),this},on:function(t,n,r){var o=i.call(this,f),a=(o?this[f]:S(this)).l,l=o&&i.call(a,t)?a[t]:a[t]=[];return v.call(l,n)<0&&(r?u:s).call(l,n),this},once:function(t,n,r){var i=function(e){s.off(t,i,r),x(s,n,arguments)},s=this;return s.on(t,i,r)},trigger:function(t,n){var s=i.call(this,f),o=s&&this[f].l,u=typeof t=="string",a=u?t:t.type,l=s&&i.call(o,a),c=l&&o[a].slice(0),p=u?new T(this,a,n):t,d=0,v=l?c.length:d,m=!(p instanceof T);m&&(p._active=!0,p.stopImmediatePropagation=r.stopImmediatePropagation),p.currentTarget=this,h[0]=p;while(p._active&&d<v)x(this,c[d++],h);return m&&(delete p._active,delete p.stopImmediatePropagation),!p.defaultPrevented}},y=function(e,t,n){i.call(e,t)||(e[t]=n)},b=!1,w;r.defaultPrevented=!1,r._active=r.cancelable=!0,r.preventDefault=function(){this.defaultPrevented=!0},r.stopImmediatePropagation=function(){this._active=!1};for(w in g)i.call(g,w)&&p(n,w,{enumerable:!1,configurable:!0,writable:!0,value:g[w]});(function(e){function n(t){function n(e){e[t].apply(e,this)}return function(){return e.call(this,n,arguments),this}}for(var r in g)g.hasOwnProperty(r)&&!/^listeners|boundTo$/.test(r)&&p(t,r,{enumerable:!1,configurable:!0,writable:!0,value:n(r)})})(t.forEach);var N={boundTo:g.boundTo,data:function k(e,t){var n="dataset"in this;return arguments.length<2?n?this.dataset[e]:(t=this.getAttribute("data-"+e.replace(k.gre||(k.gre=/-[a-z]/g),k.gplace||(k.gplace=function(e,t){return t.toUpperCase()}))))==null?void 0:t:n?t==null?delete this.dataset[e]:(this.dataset[e]=t,t):(k.sre||(k.sre=/([a-z])([A-Z])/g,k.splace=function(e,t,n){return t+"-"+n.toLowerCase()}),e="data-"+e.replace(k.sre,k.splace),t==null?!this.removeAttribute(e):(this.setAttribute(e,t),t))},emit:function(n){var r=new CustomEvent(n);return r.arguments=t.slice.call(arguments,1),this.dispatchEvent(r)},listeners:function(t){return[]},off:function(e,t,n){return this.removeEventListener(e,t,n),this},on:function(e,t,n){return this.addEventListener(e,t,n),this},once:g.once,trigger:function(t,n){var r=typeof t=="string",i=r?t:t.type,s=r?new CustomEvent(i,(c.detail=n,c)):t;return c.detail=null,T.call(s,this,i),this.dispatchEvent(s)}};c.cancelable=!0,c.bubbles=!0;try{document.createEvent("Event").target=document}catch(C){b=!0,y=function(e,t,n){if(!i.call(e,t))try{e[t]=n}catch(r){}}}(function(e){var t=e.Window,n=t?t.prototype:e,r=(e.Node||e.Element||e.HTMLElement).prototype,s=(e.Document||e.HTMLDocument).prototype,o=(e.XMLHttpRequest||function(){}).prototype,u,a;for(u in N)i.call(N,u)&&(a={enumerable:!1,configurable:!0,writable:!0,value:N[u]},p(n,u,a),p(r,u,a),p(s,u,a),u!=="data"&&p(o,u,a))})(window)})(Object);window.$=function(a){return function(c,p){return a.slice.call(a.concat(p||document)[0].querySelectorAll(c))}}([]);function Mercator(TILE_SIZE) {
  /*! (C) Andrea Giammarchi */
  var
    Math = window.Math,
    atan = Math.atan,
    exp = Math.exp,
    log = Math.log,
    max = Math.max,
    min = Math.min,
    round = Math.round,
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
}var SCROLLBAR_SIZE = SCROLLBAR_SIZE || function(d){
  var
    e = d.documentElement,
    p = d.createElement('p'),
    r
  ;
  p.style.cssText = [
    ';position:absolute',
    ';margin:0',
    ';padding:0',
    ';display:block',
    ';overflow:scroll',
    ';width:50px',
    // actually needed to avoid clientWidth 0
    ';line-height:50px',
    ';font-size:50px'
  ].join(' !important');
  p.innerHTML = '0';
  e.insertBefore(p, e.lastChild);
  r = p.offsetWidth - p.clientWidth;
  e.removeChild(p);
  return r;
}(document);/*! SimpleKinetic v0.1.1 - MIT license */


var SimpleKinetic = function(global) {

// ---------------------------------------------------------------------------

'use strict';

var
  //  fast scoped lookup
  isNaN = global.isNaN,
  Math = global.Math,
  abs = Math.abs,
  round = Math.round,
  sqrt = Math.sqrt,
  setInterval = global.setInterval,
  clearInterval = global.clearInterval,
  //  deceleration
  friction = .2,
  //  kinetic distance multiplier
  multiplier = 9,
  //  frames per second
  FPS = 1000 / 60,
  // shortcut
  SimpleKineticPrototype = SimpleKinetic.prototype
;

/**
 * @param options Obect an object containing a context and/or methods to invoke
 * @api public
 * @example
 *  var sk = new SimpleKinetic({
 *    context: aDOMNode,
 *    onmove: function (x, y, dx, dy, ex, ey) {
 *      this.style.cssText = 'top:' + y + 'px;left:' + x + 'px;';
 *    }
 *  });
 *  // simulating a mouse moved on the element
 *  sk.init(0, 0, 10, 10);
 */
function SimpleKinetic(options) {
  for (var key in options) {
    // ignore anything else
    if (/^on|context|interval/.test(key)) {
      this[key] = options[key];
    }
  }
}

/** Accordingly with start and end point, starts eventually kinetics
 * @param   Number    current x as start value
 * @param   Number    current y as start value
 * @param   Number    xdist distance as force or end x point
 * @param   Number    ydist distance as force or end y point
 * @param   Boolean   optional destination point. false by default, true to use it
 * @param   Boolean   optional destination point. false by default, true to use it
 */
SimpleKineticPrototype.init = function (x, y, xdist, ydist, xdest, ydest) {
  var
      self = clear(this),
      xdist1 = (abs(xdist) < 1 ? 0 : xdist) * (xdest ? 1 : multiplier),
      ydist1 = (abs(ydist) < 1 ? 0 : ydist) * (ydest ? 1 : multiplier),
      xdist2 = xdist1 * xdist1,
      ydist2 = ydist1 * ydist1,
      distance = sqrt(xdist2 + ydist2),
      xangle = xdist1 / distance,
      yangle = ydist1 / distance,
      ex, ey
  ;
  self.cancel(self._cx, self._cy);
  if (!(isNaN(xangle) || isNaN(yangle))) {
    //  start in advance regardless
    //  useful to avoid flicks at the very beginning
    self._a = setInterval(next, self.interval || FPS, self);
    //  used properties in next call
    self._t = 0;                        //  total
    self._d = distance;                 //  distance
    self._sx = self._cx = x;            //  start and current X
    self._sy = self._cy = y;            //  start and current Y
    self._xa = xangle;                  //  angle X
    self._ya = yangle;                  //  angle Y
    ex = round(x + distance * xangle);  //  end X
    ey = round(y + distance * yangle);  //  end Y
    self._ex = ex;
    self._ey = ey;
    if (
      // if end X and end Y are different from start X and start X
      (x !== ex || y !== ey) &&
      // and if the start event does not explicitly return false
      self.start(x, y, 0, 0, ex, ey) !== false
    ) {
      // returns true as kinetic started
      return true;
    }
    // otherwise stop the interval and return false
    clear(self._a);
  }
  return false;
};

// methods handled by the init and the interval
// if necessary is possible to invoke them manually
// Each method will invoke, if defined, the equivalent
// "on" + method counter part with the right context
SimpleKineticPrototype.start = defineCommonMethod('start');
SimpleKineticPrototype.move = defineCommonMethod('move');
SimpleKineticPrototype.end = defineCommonMethod('end');
SimpleKineticPrototype.cancel = function (
  currentX, currentY,
  diffX, diffY,
  endX, endY
) {
  // cancel should invoke oncancel
  // only if not already canceled before
  if (this._a) {
    clear(this).oncancel.call(
      this.context || this,
      currentX, currentY,
      diffX, diffY,
      endX, endY
    );
  }
};

// method invoked "on" actions
SimpleKineticPrototype.onstart =
SimpleKineticPrototype.onmove =
SimpleKineticPrototype.onend =
SimpleKineticPrototype.oncancel = function (
  currentX, currentY,
  diffX, diffY,
  endX, endY
) {
  // avoid checks every single call. by default: invoked
};

function clear(self) {
  clearInterval(self._a);
  self._a = 0;
  return self;
}

function defineCommonMethod(name) {
  name = 'on' + name;
  return function (
    currentX, currentY,
    diffX, diffY,
    endX, endY
  ) {
    return this[name].call(
      this.context || this,
      currentX, currentY,
      diffX, diffY,
      endX, endY
    );
  };
}

function next(self) {
  // all these properties accessed at runtime... I know, disturbing... *but*
  // it avoids creation of N functions over N objects per each kinetic
  var
      t = (self._t += (self._d - self._t) * friction),
      x = round(self._sx + t * self._xa),
      y = round(self._sy + t * self._ya),
      ex = self._ex,
      ey = self._ey,
      diffx = x - self._cx,
      diffy = y - self._cy
  ;
  if (x === ex && y === ey) {
    clear(self).end(ex, ey, diffx, diffy, ex, ey);
  } else {
    self.move(x, y, diffx, diffy, ex, ey);
    self._cx = x;
    self._cy = y;
  }
}

// detect and monkey patch IE < 9
// for this use case only (only 1 extra arg)
var timer = setInterval(function(one){
  clearInterval(timer);
  if (!one) setInterval = function (callback, delay, arg1) {
    return global.setInterval(function () {
      callback(arg1);
    }, delay);
  };
}, 0, 1);

/**
 * Expose SimpleKinetic
 */

return SimpleKinetic;

}(this);// creates a png Map icon SRC out of FontAwesome
var fontAwesomeIcon = function(canvas){
  var
    context = canvas.getContext('2d'),
    // all names mapped to code
    // right now I need only these icons
    code = {
      question: 0xf128,
      'shopping-cart': 0xf07a,
      gift: 0xf06b,
      food: 0xf0f5,
      home: 0xf015,
      glass: 0xf000,
      briefcase: 0xf0b1,
      group: 0xf0c0,
      truck: 0xf0d1,
      'map-marker': 32 //0xf041
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
    //context.fillStyle = "rgb(40,104,104)";
    context.fillStyle = "rgb(240,240,240)";
    ellipse(size / 2, size / 2.5, size / 2.8);
    context.font = context.mozTextStyle =
      Math.round(size / 2) + "px FontAwesome";
    context.translate((canvas.width - (
      context.measureText || context.mozMeasureText
    ).call(context, chr).width) / 2, 0);
    //context.fillStyle = "rgb(0,0,0)";
    context.fillStyle = "rgb(40,104,104)";
    context.fillText(chr, 0, size / 1.5);
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
        String.fromCharCode(code[chr]),
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
}(this));