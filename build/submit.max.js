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
}(Array.prototype, Function.prototype, String.prototype));// both UPPER and lower, you choose
var JSONH, jsonh = JSONH = function (Array, JSON) {"use strict"; // if you want

    /**
     * Copyright (C) 2011 by Andrea Giammarchi, @WebReflection
     * 
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     * 
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     * 
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    // transforms [{a:"A"},{a:"B"}] to [1,"a","A","B"]
    function hpack(list) {
        for (var
            length = list.length,
            // defined properties (out of one object is enough)
            keys = Object_keys(length ? list[0] : {}),
            klength = keys.length,
            // static length stack of JS values
            result = Array(length * klength),
            i = 0,
            j = 0,
            ki, o;
            i < length; ++i
        ) {
            for (
                o = list[i], ki = 0;
                ki < klength;
                result[j++] = o[keys[ki++]]
            );
        }
        // keys.length, keys, result
        return concat.call([klength], keys, result);
    }

    // transforms [1,"a","A","B"] to [{a:"A"},{a:"B"}]
    function hunpack(hlist) {
        for (var
            length = hlist.length,
            klength = hlist[0],
            result = Array(((length - klength - 1) / klength) || 0),
            i = 1 + klength,
            j = 0,
            ki, o;
            i < length;
        ) {
            for (
                result[j++] = (o = {}), ki = 0;
                ki < klength;
                o[hlist[++ki]] = hlist[i++]
            );
        }
        return result;
    }

    // recursive: called via map per each item h(pack|unpack)ing each entry through the schema
    function iteratingWith(method) {
        return function iterate(item) {
            for (var
                path = this,
                current = item,
                i = 0, length = path.length,
                j, k, tmp;
                i < length; ++i
            ) {
                if (isArray(tmp = current[k = path[i]])) {
                    j = i + 1;
                    current[k] = j < length ?
                        map.call(tmp, method, path.slice(j)) :
                        method(tmp)
                    ;
                }
                current = current[k];
            }
            return item;
        };
    }

    // called per each schema (pack|unpack)ing each schema
    function packOrUnpack(method) {
        return function parse(o, schema) {
            for (var
                wasArray = isArray(o),
                result = concat.call(arr, o),
                path = concat.call(arr, schema),
                i = 0, length = path.length;
                i < length; ++i
            ) {
                result = map.call(result, method, path[i].split("."));
            }
            return wasArray ? result : result[0];
        };
    }

    // JSONH.pack
    function pack(list, schema) {
        return schema ? packSchema(list, schema) : hpack(list);
    }

    // JSONH unpack
    function unpack(hlist, schema) {
        return schema ? unpackSchema(hlist, schema) : hunpack(hlist);
    }

    // JSON.stringify after JSONH.pack
    function stringify(list, replacer, space, schema) {
        return JSON_stringify(pack(list, schema), replacer, space);
    }

    // JSONH.unpack after JSON.parse
    function parse(hlist, reviver, schema) {
        return unpack(JSON_parse(hlist, reviver), schema);
    }

    var
        // recycled for different operations
        arr = [],
        // trapped once reused forever
        concat = arr.concat,
        // addressed cross platform Object.keys shim
        Object_keys = Object.keys || function (o) {
            var keys = [], key;
            for (key in o) o.hasOwnProperty(key) && keys.push(key);
            return keys;
        },
        // addressed cross platform Array.isArray shim
        isArray = Array.isArray || (function (toString, arrayToString) {
            arrayToString = toString.call(arr);
            return function isArray(o) {
                return toString.call(o) == arrayToString;
            };
        }({}.toString)),
        // fast and partial Array#map shim
        map = arr.map || function (callback, context) {
            for (var
                self = this, i = self.length, result = Array(i);
                i--;
                result[i] = callback.call(context, self[i], i, self)
            );
            return result;
        },
        // schema related (pack|unpack)ing operations
        packSchema = packOrUnpack(iteratingWith(hpack)),
        unpackSchema = packOrUnpack(iteratingWith(hunpack)),
        // JSON object shortcuts
        JSON_stringify = JSON.stringify,
        JSON_parse = JSON.parse
    ;

    return {
        pack: pack,
        parse: parse,
        stringify: stringify,
        unpack: unpack
    };

}(Array, JSON);/*! (C) WebReflection Mit Style License */
(function(e){"use strict";function t(t){return typeof t=="string"?e.document.createTextNode(t):t}function n(n){if(n.length===1)return t(n[0]);for(var r=e.document.createDocumentFragment(),i=h.call(n),s=0;s<n.length;s++)r.appendChild(t(i[s]));return r}for(var r,i,s,o=/^\s+|\s+$/g,u=/\s+/,a=" ",f=function(t,n){return this.contains(t)?n||this.remove(t):n&&this.add(t),!!n},l=(e.Element||e.Node||e.HTMLElement).prototype,c=["prepend",function(){var t=this.firstChild,r=n(arguments);t?this.insertBefore(r,t):this.appendChild(r)},"append",function(){this.appendChild(n(arguments))},"before",function(){var t=this.parentNode;t&&t.insertBefore(n(arguments),this)},"after",function(){var t=this.parentNode,r=this.nextSibling,i=n(arguments);t&&(r?t.insertBefore(i,r):t.appendChild(i))},"replace",function(){var t=this.parentNode;t&&t.replaceChild(n(arguments),this)},"remove",function(){var t=this.parentNode;t&&t.removeChild(this)}],h=c.slice,p=c.length;p;p-=2)r=c[p-2],r in l||(l[r]=c[p-1]);"classList"in document.documentElement?(s=document.createElement("div").classList,s.add("a","b"),"a b"!=s&&(l=s.constructor.prototype,"add"in l||(l=e.DOMTokenList.prototype),i=function(e){return function(){var t=0;while(t<arguments.length)e.call(this,arguments[t++])}},l.add=i(l.add),l.remove=i(l.remove),l.toggle=f)):(i=function(e){if(!e)throw"SyntaxError";if(u.test(e))throw"InvalidCharacterError";return e},s=function(e){var t=e.className.replace(o,"");t.length&&c.push.apply(this,t.split(u)),this._=e},s.prototype={length:0,add:function(){for(var t=0,n;t<arguments.length;t++)n=arguments[t],this.contains(n)||c.push.call(this,r);this._.className=""+this},contains:function(e){return function(n){return p=e.call(this,r=i(n)),-1<p}}([].indexOf||function(e){p=this.length;while(p--&&this[p]!==e);return p}),item:function(t){return this[t]||null},remove:function(){for(var t=0,n;t<arguments.length;t++)n=arguments[t],this.contains(n)&&c.splice.call(this,p,1);this._.className=""+this},toggle:f,toString:function v(){return c.join.call(this,a)}},(Object.defineProperty||function(e,t,n){e.__defineGetter__(t,n.get)})(l,"classList",{get:function(){return new s(this)},set:function(){}}));try{new e.CustomEvent("?")}catch(d){e.CustomEvent=function(e,t){function n(n,i){var s=document.createEvent(e);if(typeof n!="string")throw new Error("An event name must be provided");return e=="Event"&&(s.initCustomEvent=r),i==null&&(i=t),s.initCustomEvent(n,i.bubbles,i.cancelable,i.detail),s}function r(e,t,n,r){this.initEvent(e,t,n),this.detail=r}return n}(e.CustomEvent?"CustomEvent":"Event",{bubbles:!1,cancelable:!1,detail:null})}})(window);/*! (C) Andrea Giammarchi Mit Style License */
(function(e){"use strict";function E(){return{l:{},m:[],b:[]}}function S(e){var t=E();return c.value=t,p(e,f,c),c.value=null,t}function x(e,t,n){typeof t=="function"?t.apply(e,n):t.handleEvent.apply(t,n)}function T(e,t,n){n&&y(this,"detail",n),y(this,"type",t),y(this,"target",e),y(this,"timeStamp",m())}if(e.eddy)return;e.eddy=!0;var t=Array.prototype,n=e.prototype,r=T.prototype,i=n.hasOwnProperty,s=t.push,o=t.slice,u=t.unshift,a="toLocaleString",f={toLocaleString:1}.propertyIsEnumerable(a)?"_@eddy"+Math.random():a,l=f===a,c=(e.create||e)(null),h=[],p=l?function(e,t,n){e[t]=n.value}:e.defineProperty,d=function(e){var t=this;return function(){return t.apply(e,arguments)}},v=t.indexOf||function(e){var t=this.length;while(t--&&this[t]!==e);return t},m=Date.now||function(){return(new Date).getTime()},g={boundTo:function(t){var n=i.call(this,f)?this[f]:S(this),r=n.m,o=n.b,u=typeof t=="string"?this[t]:t,a=v.call(r,u);return a<0?o[s.call(r,u)-1]=d.call(u,this):o[a]},emit:function(t){var n=i.call(this,f),r=n&&this[f].l,s=n&&i.call(r,t),u=s&&r[t],a=s&&o.call(arguments,1),l=0,c=s?u.length:l;while(l<c)x(this,u[l++],a);return s},listeners:function(t){return i.call(this,f)&&i.call(this[f].l,t)&&this[f].l[t].slice()||[]},off:function(t,n){var r=i.call(this,f),s=r&&this[f].l,o=r&&i.call(s,t)&&s[t],u;return o&&(u=v.call(o,n),-1<u&&(o.splice(u,1),o.length||delete s[t])),this},on:function(t,n,r){var o=i.call(this,f),a=(o?this[f]:S(this)).l,l=o&&i.call(a,t)?a[t]:a[t]=[];return v.call(l,n)<0&&(r?u:s).call(l,n),this},once:function(t,n,r){var i=function(e){s.off(t,i,r),x(s,n,arguments)},s=this;return s.on(t,i,r)},trigger:function(t,n){var s=i.call(this,f),o=s&&this[f].l,u=typeof t=="string",a=u?t:t.type,l=s&&i.call(o,a),c=l&&o[a].slice(0),p=u?new T(this,a,n):t,d=0,v=l?c.length:d,m=!(p instanceof T);m&&(p._active=!0,p.stopImmediatePropagation=r.stopImmediatePropagation),p.currentTarget=this,h[0]=p;while(p._active&&d<v)x(this,c[d++],h);return m&&(delete p._active,delete p.stopImmediatePropagation),!p.defaultPrevented}},y=function(e,t,n){i.call(e,t)||(e[t]=n)},b=!1,w;r.defaultPrevented=!1,r._active=r.cancelable=!0,r.preventDefault=function(){this.defaultPrevented=!0},r.stopImmediatePropagation=function(){this._active=!1};for(w in g)i.call(g,w)&&p(n,w,{enumerable:!1,configurable:!0,writable:!0,value:g[w]});(function(e){function n(t){function n(e){e[t].apply(e,this)}return function(){return e.call(this,n,arguments),this}}for(var r in g)g.hasOwnProperty(r)&&!/^listeners|boundTo$/.test(r)&&p(t,r,{enumerable:!1,configurable:!0,writable:!0,value:n(r)})})(t.forEach);var N={boundTo:g.boundTo,data:function k(e,t){var n="dataset"in this;return arguments.length<2?n?this.dataset[e]:(t=this.getAttribute("data-"+e.replace(k.gre||(k.gre=/-[a-z]/g),k.gplace||(k.gplace=function(e,t){return t.toUpperCase()}))))==null?void 0:t:n?t==null?delete this.dataset[e]:(this.dataset[e]=t,t):(k.sre||(k.sre=/([a-z])([A-Z])/g,k.splace=function(e,t,n){return t+"-"+n.toLowerCase()}),e="data-"+e.replace(k.sre,k.splace),t==null?!this.removeAttribute(e):(this.setAttribute(e,t),t))},emit:function(n){var r=new CustomEvent(n);return r.arguments=t.slice.call(arguments,1),this.dispatchEvent(r)},listeners:function(t){return[]},off:function(e,t,n){return this.removeEventListener(e,t,n),this},on:function(e,t,n){return this.addEventListener(e,t,n),this},once:g.once,trigger:function(t,n){var r=typeof t=="string",i=r?t:t.type,s=r?new CustomEvent(i,(c.detail=n,c)):t;return c.detail=null,T.call(s,this,i),this.dispatchEvent(s)}};c.cancelable=!0,c.bubbles=!0;try{document.createEvent("Event").target=document}catch(C){b=!0,y=function(e,t,n){if(!i.call(e,t))try{e[t]=n}catch(r){}}}(function(e){var t=e.Window,n=t?t.prototype:e,r=(e.Node||e.Element||e.HTMLElement).prototype,s=(e.Document||e.HTMLDocument).prototype,o=(e.XMLHttpRequest||function(){}).prototype,u,a;for(u in N)i.call(N,u)&&(a={enumerable:!1,configurable:!0,writable:!0,value:N[u]},p(n,u,a),p(r,u,a),p(s,u,a),u!=="data"&&p(o,u,a))})(window)})(Object);window.$=function(a){return function(c,p){return a.slice.call(a.concat(p||document)[0].querySelectorAll(c))}}([]);/*! SimpleKinetic v0.1.1 - MIT license */


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
/**
 * Hello There,
 *  this area is specific for equolo and it's born
 *  from a quick and fast prototype.
 * 
 * We couldn't wait to go out with the possibility
 *  to let you insert your data in a hopefully
 *  very user friendly way but unfortunately
 *  the time to optimize everything or split in files
 *  or implement some external framework a part from
 *  Leaflet so it might look a huge file
 *  but actualy is kinda organized in events sections
 *  plus it's commented almost everywhere.
 * 
 * We hope you'll enjoy or maybe learn something here
 * 
 *  Happy equolo )°(,
 */
document.once('DOMContentLoaded', function () {
  var
    RE_EMAIL = /^[^@]+?@[^\1@]+\.([a-z]{2,})$/,
    RE_VALID_GEO = /^-?\d+(?:\.\d+)?$/, // well, sort of ..
    uid = 0,
    JSONPid = 0,
    JSONPrefix = '_JSONP',
    // used as indicator for automatic searching
    searchStateIcon = $('fieldset#step-4 fieldset.address > legend > i')[0],
    searchState = {
      no: 'icon-angle-down',
      ok: 'icon-ok',
      error: 'icon-exclamation-sign',
      searching: 'icon-refresh icon-spin'
    },
    // the single user shared across all logic
    user = {},
    walkThrough = {
      // per each triggered event
      handleEvent: function (e) {
        var
          // shortcut next type
          type = e.type,
          // use temporary var as placeholder
          tmp
        ;
        // if there was a type
        if ('_type' in this) {
          // previsous type termination name
          tmp = this._type + '-terminate';
          // if present
          if (tmp in this) {
            // invoke it
            this[tmp](e);
          }
        }
        // update current _type
        this._type = type;
        // if there is an initialization name
        tmp = type + '-init';
        if (tmp in this) {
          // invoke it
          this[tmp](e);
        }
        // enable current fieldSet
        FieldSet.enable($('fieldset#' + type)[0]);
        // invoke current type
        this[type](e);
      },



///////////////////////////////////////////////////////////////////////
//        sections: each one a step-N name for simplicity ^_^
///////////////////////////////////////////////////////////////////////



// language
///////////////////////////////////////////////////////////////////////
      'step-1': function (e) {
        var
          fieldSet = $('fieldset#' + e.type)[0],
          select = $('select', fieldSet)
        ;
        select.once('change', function(){
          // redirect to the specified language
          location.href = location.href.split(/[\?#]/)[0] +
                          '?lang=' + this.value;
        });
        this.trigger('step-2');
      },



// email
///////////////////////////////////////////////////////////////////////
      'step-2': function (e) {
        var
          fieldSet = $('fieldset#' + e.type)[0],
          email = $('input', fieldSet)[0]
        ;
        // what hapens once everything has been verified?
        this.on('email:verified', verifyEmailCompleted);
        // what happens each time the user change the input?
        email.on('keyup', this.boundTo(verifyEmailDelayed));
        // in case the value is already filled via cookies
        // check it directly through events
        email.emit('keyup');
      },



// activity
///////////////////////////////////////////////////////////////////////
      'step-3': function (e) {
        var
          user = e.detail,
          fieldsets = $('fieldset'),
          fieldSet = $('fieldset#' + e.type)[0],
          activities = $('select[name=activity]', fieldSet)[0],
          add = $('button[name=add]', fieldSet)[0],
          remove = $('button[name=remove]', fieldSet)[0],
          next = $('button.next', fieldSet)[0],
          name = $('input[name=name]', fieldSet)[0],
          description = $('textarea[name=description]', fieldSet)[0],
          lang = $('select[name=lang]', fieldSet)[0],
          counter = $('div.lang > p > span', fieldSet)[0],
          languages = $('ul', fieldSet)[0],
          checkboxes = $('div.criteria input', fieldSet),
          certified = checkboxes.shift(),
          criteria = checkboxes.shift(),
          createLanguageIndicator = function (key) {
            var
              li = languages.appendChild(
                document.createElement('li')
              ),
              mark = li.appendChild(
                document.createElement('strong')
              )
            ;
            mark.append('√');
            li.append(mark);
            li.append(' ' + findLanguageByValue(lang, key));
          },
          // if there was something in the textarea and it has a name
          enableAddRemoveButtons = function () {
            remove.disabled = activities.options.length < 2;
            next.disabled = add.disabled =
              !(description.value && name.value && (
                // the company is certified
                isInputChecked(certified) ||
                // or at least respect 4 criterias
                3 < checkboxes.filter(isInputChecked).length
              ))
            ;
            if (next.disabled) {
              // all next fieldset should be disabled
              // if already initialized and next is not enabled yet
              if (this.hasOwnProperty('map')) {
                fieldsets.slice(
                  fieldsets.indexOf(fieldSet) + 1
                ).forEach(FieldSet.disable);
              }
            } else {
              // unlock automagically next section
              next.emit('click');
            }
          }.bind(this),
          tmp
        ;
        // clear everything regardless
        counter.innerHTML = 140;
        name.value = description.value =
        activities.innerHTML = languages.innerHTML = '';
        // after change, do everything again from the scratch
        activities.on(
          'change',
          this.onActivityChange || (
          this.onActivityChange = function () {
            user.currentActivity = this.value;
            // trigger again the same event
            e.currentTarget.trigger(e);
          }
        ));
        // when the current activity changes
        // update the activity object with the new name
        name.on(
          'keyup',
          // TRICK: handler needed to be created only once
          // because the outer closure/scope is needed too
          // all those DOM references won't change later on
          // so let's create a single listener
          // so that it won't be added twice
          this.onNameChange || (
          this.onNameChange = function (e) {
            // the activity name
            var
              activityName = name.value.trim(),
              option = activities.options[activities.selectedIndex]
            ;
            getOrCreateActivity(user).name = activityName;
            if (activityName) {
              // update activities option entry too
              option.value = user.currentActivity;
              option.innerHTML = '';
              option.append(activityName);
            }
            enableAddRemoveButtons();
          }
        ));
        // when the description changes
        // update the counter
        description.on(
          'keyup',
          // same trick
          this.onDescriptionChange || (
          this.onDescriptionChange = function (e) {
            var
              value = description.value.trim(),
              maxChars = parseInt(
                description.getAttribute('maxlength'),
                10
              ),
              numberOfCharsAvailable = (
                maxChars - value.length
              ),
              activityDescription
            ;
            if (numberOfCharsAvailable < 0) {
              numberOfCharsAvailable = 0;
              description.value = value.slice(0, maxChars);
            }
            counter.innerHTML = numberOfCharsAvailable;
            // update the related activity description too
            activityDescription = getOrCreateActivity(user).description;
            if (!(lang.value in activityDescription)) {
              createLanguageIndicator(lang.value);
            }
            activityDescription[lang.value] = value;
            // only in case the user removed all text
            if (!value.length) {
              // remove current language from the system
              delete activityDescription[lang.value];
              // clean the list
              languages.innerHTML = '';
              // add all already available langauges
              Object.keys(activityDescription).forEach(createLanguageIndicator);
            }
            enableAddRemoveButtons();
          }
        ));
        // on language change, the description should change too
        lang.on(
          'change',
          // same trick
          this.onLanguageDescriptionChange || (
          this.onLanguageDescriptionChange = function (e) {
            var activityDescription = getOrCreateActivity(user).description;
            description.value = activityDescription[lang.value] || '';
            // notify the textarea and let it handle the rest
            description.emit('keyup');
          }
        ));
        // populate the field set with all available data
        user.activities.forEach(function (activity, i) {
          // only activity that have not been removed
          if (/^remove:/.test(activity.id)) return;
          // create an entry in the main select
          var
            option = activities.appendChild(document.createElement('option')),
            activityLanguages
          ;
          option.value = activity.id;
          option.append(activity.name);
          // show realted data
          if (
            // if no activity, show the first
            !user.hasOwnProperty('currentActivity') ||
            // otherwise show the selected
            activity.id == user.currentActivity
          ) {
            // be sure this happens only once
            user.currentActivity = activity.id;
            option.selected = 'selected';
            name.value = activity.name;
            activityLanguages = Object.keys(activity.description);
            // set the language as the first one
            activityLanguages.forEach.call(
              lang.options,
              selectOptionByValue,
              activityLanguages[0]
            );
            // add all already available langauges
            activityLanguages.forEach(createLanguageIndicator);
            // show the description
            description.value = activity.description[lang.value] || '';
            // update the counter too
            description.emit('keyup');
          }
        }, this);
        // what is needed to add a new activity
        add.on(
          'click',
          // same usual trick
          this.onAnotherActivity || (
          this.onAnotherActivity = function (e) {
            var
              options = activities.options,
              onlyOne = !options.length
            ;
            // reset current activity
            user.currentActivity = null;
            // new entry in the main list
            activities.appendChild(
              document.createElement('option')
            ).append(' - ');
            activities.disabled = onlyOne;
            // clean up name and description
            name.value = description.value = '';
            // let the description handle the rest
            description.emit('keyup');
            // try to simplify user life
            try{name.focus()}catch(o_O){/*OK*/}
            // clean up all checks
            checkboxes.concat(criteria, certified).forEach(
              function(input){
                input.checked = false;
              }
            );
            // change the selected index
            activities.selectedIndex = options.length - 1;
          }
        ));
        // what to do in order to remove an activity
        remove.on(
          'click',
          this.onRemoveActivity || (
          this.onRemoveActivity = function (e) {
            user.currentActivity = null;
            removeGenericObject(
              user.activities,
              activities
            );
          }
        ));
        // checkbox should notify buttons that maybe the user can go on
        // we need a single listener for this
        checkboxes.on(
          'change',
          this.onCriteriaChange || (
          this.onCriteriaChange = function () {
            // save current activity status
            checkboxes.forEach(
              updateUserCriteria,
              getOrCreateActivity(user).criteria = []
            );
            // verify
            enableAddRemoveButtons();
          }
        ));

        // need to setup criterias too
        // not a criteria concern to create a new user
        // in this case a manual check is better
        tmp = user.currentActivity ?
          getOrCreateActivity(user) :
          {criteria: [], certification: []}
        ;
        // so per each criteria
        checkboxes.forEach(function(checkbox) {
          // set it up for current activity criteria
          checkbox.checked = -1 < this.criteria.indexOf(checkbox.value);
          // and make the outer li a better helper
          checkbox.parentNode.on('click', onCriteriaLIClick);
        }, tmp);
        // clean certified and criteria too
        criteria.checked = 0 < tmp.criteria.length;
        // the order isimportant to ensure only one checked
        // certified has priority so it's checked later
        certified.checked = 0 < tmp.certification.length;
        // criteria, when selected without checks
        // should invoke the activity "next" check
        criteria.on(
          'change',
          this.enableAddRemoveButtons || (
          this.enableAddRemoveButtons = function() {
            if (criteria.checked) {
              getOrCreateActivity(user).certification = [];
            }
            enableAddRemoveButtons();
          }
        ));
        // while certified should flag
        // the object as certified and
        // still do the check
        certified.on(
          'change',
          this.onCertifiedEnabled || (
          this.onCertifiedEnabled = function() {
            if (certified.checked) {
              // right now the certification is just a static flag
              getOrCreateActivity(user).certification = [1];
            }
            enableAddRemoveButtons();
          }
        ));
        // what to do after ?
        next.on(
          'click',
          // same trick,
          // this time bound to the walkThrough object
          this.onNextActivity || (
          this.onNextActivity = function (e) {
            getOrCreateActivity(user).currentPlace = null;
            this.trigger('step-4', user);
          }.bind(this)
        ));
        // verify button status (enable or disable them)
        enableAddRemoveButtons();
        // if both disabled
        if (add.disabled && remove.disabled) {
          // simulate adding a first element
          add.emit('click');
        }
      },



// location
///////////////////////////////////////////////////////////////////////
      'step-4': function (e) {
        // NOTE: e.detail/user is the only variable we can trust
        // inside shared methods across all options
        // (except for all DOM nodes, those are the same)
        var
          user = e.detail,
          activity = getOrCreateActivity(user),
          place = activity.currentPlace || !activity.place.length ?
            getOrCreatePlace(activity) : activity.place[0]
          ,
          fieldSet = $('fieldset#' + e.type)[0],
          icon = $('i', fieldSet)[0],
          places = $('select[name=place]', fieldSet)[0],
          add = $('button[name=add]', fieldSet)[0],
          remove = $('button[name=remove]', fieldSet)[0],
          next = $('button.next', fieldSet)[0],
          category = $('select[name=category]', fieldSet)[0],
          findMe = $('div.map > button', fieldSet)[0],
          fields = $('div.fields > input', fieldSet),
          // fields that should trigger the search
          searchRelevantFields = [
            fields[0],
            fields[2],
            fields[3],
            fields[4],
            fields[5],
            fields[6]
          ],
          optionRelevantFields = [
            fields[0],
            fields[2]
          ],
          enabledAddOrRemove = function () {
            // if there's no latitude, longitude
            // or the icon hasn't been set yet
            next.disabled = add.disabled = (
              place.latitude == null && icon.value != 'question'
            );
            remove.disabled = places.options.length < 2;
          }
        ;

        searchStateIcon.className = searchState.no;

        // which is the currentPlace for this session?
        activity.currentPlace = place.id;

        // be sure searches happen
        // if the user came back to edit
        this.hasExplicitPlace = false;

        // this one contains nested fieldSets
        $('fieldset', fieldSet).forEach(FieldSet.enable);

        // setup the map once
        // use this as flag to setup once
        // everything else too
        if (!this.hasOwnProperty('map')) {

          // bear in mind
          // it's forbidden here to refer
          // outer shortcut instead of fields
          // so activity and place must be retrived each time

          L.tileLayer(
            'http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg',
            {
              attribution: 'Map Tiles &copy; Open MapQuest',
              maxZoom: 18
            }
          ).addTo(
            // one map for all places of all activities
            this.map = L.map('map')
          );

          // helper for map position
          this.setMapView = function setMapView(
            coords, zoom  // zoom is optional
          ) {
            this.map.setView(
              [
                coords.latitude || coords.lat,
                coords.longitude || coords.lng
              ],
              zoom || Math.max(
                14, this.map.getZoom()
              )
            );
          };

          // helper for all places
          this.setPlaceView = function setPlaceView(
            place // same as coords
          ) {
            // remove the previous one
            this.dropMarker();
            // create a new marker
            this.marker = L.marker(
              [
                place.latitude || place.lat,
                place.longitude || place.lng
              ],
              {
                icon:L.icon({
                  iconUrl: fontAwesomeIcon(category.value, 36),
                  // shouldn't be needed with display
                  // iconRetinaUrl: fontAwesomeIcon(category.value, 36, 2),
                  iconSize: [36, 36]
                })
              }
            ).addTo(this.map);
            this.setMapView(place);
            enabledAddOrRemove();
          };

          // simple way to clean the current marker
          this.dropMarker = function () {
            if (this.marker) {
              this.map.removeLayer(this.marker);
              this.marker = null;
            }
          };

          // show curent country by default
          this.setMapView(navigator.country.geo, 5);

          // as it is for step-3, after change,
          // do everything again from the scratch
          places.on('change', function () {
            getOrCreateActivity(user).currentPlace = this.value;
            // trigger again the same event
            e.currentTarget.trigger(e);
          });

          // simplified approach to add new place
          add.on('click', function () {
            var
              activity= getOrCreateActivity(user),
              options = places.options,
              place   = (activity.currentPlace = null) ||
                        getOrCreatePlace(activity),
              option  = places.appendChild(
                          document.createElement('option')
                        )
            ;
            option.append(' - ');
            option.value = place.id;
            places.selectedIndex = options.length - 1;
            places.emit('change');
          });

          // same simplification for the remove action
          remove.on('click', function () {
            var activity = getOrCreateActivity(user);
            activity.currentPlace = null;
            removeGenericObject(
              activity.place,
              places
            );
          });

          // the usual procedure to move forward

          // category should update the icon and whatever is on the map
          // plus it should actually update the place icon too
          category.on(
            'change',
            // same trick used in step-3
            this.onCategoryChange || (
            this.onCategoryChange = function (e) {
              icon.className = 'icon-' + category.value;
              getOrCreatePlace(
                getOrCreateActivity(user)
              ).icon = category.value;
              if (this.marker) {
                this.setPlaceView(this.marker.getLatLng());
              }
            }.bind(this)
          ));

          next.on('click', this.boundTo(function () {
            var result = verifyAllUserData(user);
            if (result === true) {
              this.trigger('step-5', user);
            } else {
              notifyProblemsWithData(result);
            }
          }));

          // perform a search if needed
          searchRelevantFields.on(
            'keyup',
            function (e) {
              if (!this.hasExplicitPlace) {
                // this cannot be greedy since it's a request
                // to an external site. 1 second shoul dbe good enough
                clearTimeout(this.findPlaceTimer || 0);
                searchStateIcon.className = searchState.searching;
                this.findPlaceTimer = setTimeout(
                  this.boundTo(checkBeforeSearchingPlace),
                  1000,
                  searchRelevantFields
                );
              }
            }.bind(this)
          );

          // and once the search has been completed ..
          this.on('search:place', function (e) {
            // being asynchronous
            // be sure there's no place explicilty set before
            if (!this.hasExplicitPlace) {
              // we can show the place now
              this.setPlaceView(
                // updating it first, of course
                updatePlacePosition(
                  getOrCreatePlace(
                    getOrCreateActivity(user)
                  ),
                  fields,
                  // will be the coordinates
                  e.detail
                )
              );
            }
          });

          // however, a place might be explicitly positioned
          // through the right click of a mouse
          $('#map').on(
            'contextmenu',
            function contextmenu(e) {
              e.preventDefault();
              e.stopPropagation();
              if (this.hasExplicitPlace) {
                search.address = '';
                searchStateIcon.className = searchState.no;
                this.hasExplicitPlace = false;
                // this is needed if the palce
                // was set wrongly or by accident
                // but we'd like to let the user
                // search again through the fields
                this.dropMarker();
              } else if (
                // inform the user that with right click
                // it is possible to position the place directly
                this.askedUserIfPutAPlaceOnMap ||
                confirm('would like to pin it here ?')
              ) {
                this.hasExplicitPlace =
                this.askedUserIfPutAPlaceOnMap = true;
                e = this.map.containerPointToLatLng(
                  this.map.mouseEventToContainerPoint(e)
                );
                if (!(isNaN(e.lat) || isNaN(e.lng))) {
                  this.setPlaceView(
                    updatePlacePosition(
                      getOrCreatePlace(
                        getOrCreateActivity(user)
                      ),
                      fields,
                      {
                        latitude: e.lat,
                        longitude: e.lng
                      }
                    )
                  );
                  searchStateIcon.className = searchState.ok;
                }
              }
            }.bind(this)
          );

          // if asked, find the position
          findMe.on(
            'click',
            // need to access the map later on
            function () {
              // do not allow multiple clicks
              // until the first operation is completed
              findMe.disabled = true;
              try {
                navigator.geolocation.getCurrentPosition(
                  function success(position) {
                    this.setView([
                      position.coords.latitude,
                      position.coords.longitude
                    ],
                    // show this closer
                    // but not further
                    Math.max(
                      14, this.getZoom()
                    ));
                    findMe.disabled = false;
                  }.bind(this),
                  function error() {
                    // shall we retry later on ?
                    findMe.disabled = false;
                  },
                  // as option, we just wait
                  // until the position has been found
                  {maximumAge: 600000}
                );
              } catch(o_O) {
                // something went wrong
                // probably there's no support
                // for this functionality at all
                // we can leave the button disabled
                // since it worth nothing trying again
              }
            }.bind(this.map)
          );

          // when the first filed
          // or the post code one change
          optionRelevantFields.on(
            'keyup',
            function () {
              // update the current option name
              var option = places.options[
                places.selectedIndex
              ];
              option.innerHTML = '';
              option.append(
                optionRelevantFields.map(
                  mapTrimmedValue
                ).join(' - ')
              );
            }
          );

        }

        // if there is a Marker displayed
        // it's from another place so ...
        this.dropMarker(); // drop it!


        // clean up all places/locations
        while (places.options.length) {
          places.options[0].remove();
        }
        // and repopulate them
        activity.place.forEach(function(place, i) {
          // only places that have not been removed
          if (/^remove:/.test(place.id)) return;
          var option = places.appendChild(
            document.createElement('option')
          );
          option.value = place.id;
          option.append(place.road + ' - ' + place.postcode);
          if (place.id == activity.currentPlace) {
            option.selected = 'selected';
            places.selectedIndex = i;
          }
        });

        // cleanup all fields
        fields.forEach(function (input) {
          var value = place && place[input.name] || '';
          if (value.length && input.name === 'twitter') {
            value = '@' + value;
          }
          input.value = value;
        });
        // update relative user data when fields change
        fields.on('keyup', updatePlaceData);
        // but be sure only the right place is updated
        updatePlaceData.target = place;

        // if there is already an icon
        // use it otherwise set it with the default
        changePlaceCategory(
          category,
          place.icon ||
          category.options[0].value,
          icon
        );

        enabledAddOrRemove();

        // position the map, if possible
        if (place.latitude != null) {
          this.setPlaceView(place);
        }

        // no place or just one? no need to bother
        places.disabled = places.options.length < 2;

      },



// terms of use
///////////////////////////////////////////////////////////////////////
      'step-5': function (e) {
        var
          user = e.detail,
          fieldSet = $('fieldset#' + e.type)[0],
          termsOfService = $('div', fieldSet)[0],
          agreed = $('input[type=checkbox]', fieldSet)[0],
          submit = $('input[type=submit]', fieldSet)[0]
        ;
        submit.disabled = true;
        agreed.on(
          'change',
          this.onAgreement || (
          this.onAgreement = function () {
            submit.disabled = !this.checked;
          }
        ));
        submit.on(
          'click',
          this.onSaveAllTheData || (
          this.onSaveAllTheData = function () {
            var
              // double/triple check before sending
              result = verifyAllUserData(user),
              clone,
              xhr
            ;
            if (result === true) {
              submit.disabled = true;
              // quick and dirty way to clone the object
              clone = JSON.parse(JSON.stringify(user));
              // little cleanup
              delete clone.currentActivity;
              // since places should be packed before being sent
              // gaining a relevant gain in bytes via JSONH
              clone.activities.forEach(packPlaces);
              // console.log(JSON.stringify(clone));console.log(clone);
              xhr = new XMLHttpRequest;
              xhr.open("POST", 'cgi/create.php', true);
              xhr.setRequestHeader("If-Modified-Since", "Mon, 26 Jul 1997 05:00:00 GMT");
              xhr.setRequestHeader("Cache-Control", "no-cache");
              xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
              xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
              xhr.on('readystatechange', function () {
                if (xhr.readyState == 4) {
                  $('fieldset').forEach(FieldSet.enable);
                  switch(xhr.responseText) {
                    case 'OK':          // yeah!
                      alert(')°(,');
                      return location.reload();
                      break;

                    case 'bad-data':    // something went terribly wrong!
                      alert('bad data');
                      break;

                    default:            // probably connection error
                                        // or server busy, or ... 
                      alert(xhr.responseText || 'connection error');
                      break;
                  }
                  submit.disabled = false;
                }
              });
              xhr.send('info=' + encodeURIComponent(JSON.stringify(clone)));
            } else {
              notifyProblemsWithData(result);
            }
          }
        ));
      }
    },


///////////////////////////////////////////////////////////////////////

    // all user events to disable
    commonMouseEvents = [
      'mousedown',
      'mousemove',
      'mouseup',
      'click'
    ],
    // utility for common DOM fieldSet operations
    FieldSet = {
      disable: function (fieldSet) {
        fieldSet.classList.add('disabled');
        commonMouseEvents.forEach(FieldSet._addStopEvent, fieldSet);
      },
      enable: function (fieldSet) {
        fieldSet.classList.remove('disabled');
        commonMouseEvents.forEach(FieldSet._removeStopEvent, fieldSet);
      },
      _addStopEvent: function (type) {
        this.on(type, stop, true);
      },
      _removeStopEvent: function (type) {
        this.off(type, stop, true);
      }
    }
  ;

  function stop(e) {
    e.preventDefault();
    (e.stopImmediatePropagation || e.stopPropagation).call(e);
  }


///////////////////////////////////////////////////////////////////////
////                        <<< EMAIL >>>
///////////////////////////////////////////////////////////////////////

  // used to expand JSONH records once verified
  function unpackPlaces(activity) {
    activity.place = JSONH.unpack(activity.place);
  }

  // used to save and check the user email
  function verifyEmail(controller, input) {
    var
      value = input.value.trim(),
      email = input.data('email'),
      xhr
    ;
    if (RE_EMAIL.test(value) && value !== email) {
      // avoid further pointless checks
      // for the same address
      input.data('email', value);
      controller.xhr = xhr = new XMLHttpRequest;
      xhr.target = controller;
      xhr.open('get', 'cgi/verify.php?email=' + encodeURIComponent(value), true);
      xhr.on('readystatechange', verifyEmailRequest).send(null);
      // save the user.email for further operations
      user.email = value;
    }
  }

  // once the email is OK
  function verifyEmailCompleted(e) {
    var detail = e.detail;
    user.currentActivity = null;
    if (detail == null) {
      user.activities = [];
    } else if(typeof detail == 'object') {
      user.activities = detail;
      if (user.activities.length) {
        // expand via JSONH
        user.activities.forEach(unpackPlaces);
        user.currentActivity = user.activities[0].id;
      }
    } else {
      // user in but not authenticated
      // or never confirmed the email
      // inform the user and
      // ask if a new email should be sent
      // silently failing in the backend
      // if already sent in last 24 hours
      return location.href = 'http://equolo.org/';
    }
    if (user.hasOwnProperty('activities')) {
      this.trigger('step-3', user);
    }
    
  }

  // do not perform this check every keyup event
  function verifyEmailDelayed(e) {
    var input = e.currentTarget;
    // drop the user email regardless what happens after
    user.email = null;
    // kill previous xhr if possible
    try{this.xhr.abort()}catch(itsOK){}
    // clear previous timeout, if any
    clearTimeout(parseInt(input.data('timer') || 0, 10));
    // now, only if it's worth asking to the server ...
    if (RE_EMAIL.test(input.value.trim())) {
      // address the new timer as data-timer attribute
      input.data('timer', setTimeout(verifyEmail, 1000, this, input));
    } else {
      // disable all fields after this one
      while(input = input.parentNode) {
        // once found the fieldSet
        if (input.nodeName === 'FIELDSET') {
          $('fieldset').slice(
            $('fieldset').indexOf(input) + 1
          ).forEach(FieldSet.disable);
          break;
        }
      }
    }
  }

  // only once an email has been verified
  function verifyEmailRequest() {
    // and the network has finished
    if (this.readyState === 4) {
      // emit the event with
      // received details
      this.target.trigger(
        'email:verified',
        JSON.parse(this.responseText)
      );
    }
  }



///////////////////////////////////////////////////////////////////////
////                    <<< ACTIVITY >>>
///////////////////////////////////////////////////////////////////////

  function findActivityById(activities, id) {
    for(var i = 0, length = activities.length, tmp; i < length; i++) {
      tmp = activities[i];
      if (tmp.id == id) return tmp;
    }
  }

  function findLanguageByValue(lang, value) {
    for(var options = lang.options, i = 0; i < options.length; i++) {
      if (options[i].value == value) return options[i].innerHTML;
    }
  }

  function getOrCreateActivity(user) {
    if (!user.currentActivity) {
      user.activities.push({
        // create a temporary client side only activity
        id: (user.currentActivity = 'new:'.concat(++uid)),
        name: '',
        description: {},
        criteria: [],
        certification: [],
        place: []
      });
    }
    return findActivityById(
      user.activities,
      user.currentActivity
    );
  }

  function isInputChecked(checkbox) {
    return checkbox.checked;
  }

  function onCriteriaLIClick(e) {
    // if the target was the checkbox, don't double check it
    if (e.target == this) {
      this.firstChild.checked = !this.firstChild.checked;
      // trigger the change so tep-4 can go on
      this.firstChild.emit('change');
    }
  }

  // used to drop activities and later on places too
  function removeGenericObject(collection, select) {
    var object = findActivityById(
      collection,
      select.value
    );
    // same logic used for activity
    if (/^new:/.test(object.id)) {
      collection.splice(
        collection.indexOf(object), 1
      );
    } else if(!/^remove:/.test(object.id)) {
      object.id = 'remove:' + object.id;
    }
    select.options[select.selectedIndex--].remove();
    select.emit('change');
  }

  function selectOptionByValue(option) {
    option.selected = option.value == this ? 'selected' : '';
  }

  function updateUserCriteria(input) {
    if (input.checked) {
      this.push(input.value);
    }
  }



///////////////////////////////////////////////////////////////////////
////                    <<< LOCATION >>>
///////////////////////////////////////////////////////////////////////

  function changePlaceCategory(select, value, icon) {
    for (var options = select.options, i = options.length; i--;) {
      if (options[i].value == value) {
        select.selectedIndex = i;
        options[i].selected = true;
        icon.className = 'icon-' + value;
      } else {
        options[i].selected = false;
      }
    }
  }

  function onSearchResult(result) {
    // if there is actually a result
    if (result && result.length) {
      searchStateIcon.className = searchState.ok;
      // notify the walkThrough object
      this.trigger(
        'search:place',
        {
          latitude: result[0].lat,
          longitude: result[0].lon
        }
      );
    } else if(
      // maybe there was some problem
      // with the way the address was written ?
      /^[0-9][\w-]*|[0-9][\w-]*$/.test(
        search.fields[0]
      )
    ) {
      search.fields[0] = search.fields[0]
        .replace(
          RegExp.lastMatch, ''
        )
        .replace(
          /[,;]/, ''
        ).trim()
      ;
      // give it just another try without that part
      search.call(this, search.fields);
    } else {
      searchStateIcon.className = searchState.error;
    }
  }

  function search(fields, previousClassName) {
    var
      address = fields.join(', '),
      script, i;
    // avoid duplicated searches for the same address
    if (search.address != address) {
      // remember last search to avoid repeating same searches
      search.address = address;
      // also remember fields to change later on
      // if necessary only the first one
      search.fields = fields;
      // if any previous result is still waiting for an answer
      // just make its call pointless
      i = JSONPid++;
      while (i--) window[JSONPrefix + i] = Object;
      // what to do once invoked ?
      window[JSONPrefix + JSONPid] = this.boundTo(onSearchResult);
      // common JSONP operations
      script = document.body.appendChild(
        document.createElement('script')
      );
      // drop the script once laoded
      // or even if an error occurred
      script
        .on('load', script.remove)
        .on('error', script.remove)
      ;
      script.type = 'text/javascript';
      // special thanks to openstreetmap.org !
      script.src =  'http://nominatim.openstreetmap.org/' +
                    'search?format=json&json_callback=' +
                    JSONPrefix + JSONPid +
                    '&q=' + encodeURIComponent(address);
    } else {
      searchStateIcon.className = this.marker ?
        searchState.ok : searchState.error;
    }
  }

  // used to search via JSONP a place
  function checkBeforeSearchingPlace(fields) {
    var values = fields
      .map(mapTrimmedValue)
      .filter(filterTrimmedValue)
    ;
    
    // JSONP calls are expensive for both client and server
    // so let's try to avoid unnecessary calls. How ?
    // If at least 4 values are not specified
    // there's no reason to trigger any request
    if (3 < values.length) {
      // otherwise we can bother the remote server
      // hoping these info will be enough
      search.call(
        // `this` is the walkThrough object
        this,
        // the address to search
        values
      );
    }
  }

  // same Activity logic for place
  function getOrCreatePlace(activity) {
    if (!activity.currentPlace) {
      activity.place.push({
        // create a temporary client side only place
        id: (activity.currentPlace = 'new:'.concat(++uid)),
        icon: '',
        latitude: null,
        longitude: null,
        road: '',
        extra: '',
        postcode: '',
        city: '',
        county: '',
        state: '',
        country: '',
        email: '',
        phone: '',
        website: '',
        twitter: '',
        facebook: ''
      });
    }
    // still same logic recycled
    return findActivityById(
      activity.place,
      activity.currentPlace
    );
  }

  // avoid empty fields in the search address
  function filterTrimmedValue(value) {
    return 0 < value.length;
  }

  // avoid unnecessary spaces
  function mapTrimmedValue(input) {
    return input.value.trim();
  }

  function notifyProblemsWithData(result) {
    alert([
      'uhm, something does not seem right',
      '----------------------------------',
      result.join('\n'),
      '----------------------------------',
      'it looks like something is wrong with the data',
      'please verify the following:',
      '  1. every activity has at least one place',
      '  2. there are no places without a location',
      '  3. every place has at least 4 address fields',
      '  4. every place has a specific icon'
    ].join('\n'));
  }

  // every time an input is changed
  // the corresponding plce should be updated
  function updatePlaceData(e) {
    var input = e.currentTarget;
    updatePlaceData.target[input.name] = input.value;
  }

  // keeps in sync place position and relative field
  function updatePlacePosition(place, fields, coords) {
    var fLength = fields.length;
    place.latitude = fields[fLength - 2].value = coords.latitude;
    place.longitude = fields[fLength - 1].value = coords.longitude;
    // just convinient
    return place;
  }

  // used to check all user data
  function verifyAllUserData(user) {
    var result = [];
    if (!RE_EMAIL.test(user.email)) {
      return result.push('wrong email address') && result;
    }
    return  user.activities.every(verifyActivity, result) ||
            result.reverse();
  }

  // helper for each activity
  function verifyActivity(activity, i, arr) {
    return (
      // the activity has a name
      activity.name.trim().length &&
      // there is at least one description
      (arr = Object.keys(activity.description)) && arr.length &&
      // it is not empty
      activity.description[arr[0]].trim().length &&
      (
        // the activity is certified
        activity.certification.length ||
        // the amount of criteria is reasonable
        3 < activity.criteria.length
      ) &&
      (
        (
          // there are no palces
          !activity.place.length &&
          // 'cause the activity should be removed
          /^remove:/.test(activity.id)
        )
        || // or .. 
        (
          // there are places
          activity.place.length &&
          // and these are all valid
          activity.place.every(verifyPlace, this)
        )
      ) &&
      // last but not least
      !!activity.id
    ) || !this.push('[activity] ' + (activity.name || '?'));
  }

  // helper for each place
  function verifyPlace(place) {
    /** debugging purpose only
    console.log(
      RE_VALID_GEO.test(place.latitude),
      RE_VALID_GEO.test(place.longitude),
      place.road.trim(),
      place.postcode.trim().length +
      place.city.trim().length +
      place.county.trim().length +
      place.state.trim().length +
      place.country.trim().length,
      place.icon,
      place.id
    );
    //*/
            // there is a palce and it's valid
    return  (
      RE_VALID_GEO.test(place.latitude) &&
      RE_VALID_GEO.test(place.longitude) &&
      // there is an address
      place.road.trim().length &&
      // at least 3 other fields
      2 < (
        place.postcode.trim().length +
        place.city.trim().length +
        place.county.trim().length +
        place.state.trim().length +
        place.country.trim().length
      ) &&
      // there is an icon and it's not the default one
      place.icon && place.icon != 'question' &&
      // last but not least
      !!place.id
    ) || !this.push('  ' +
                    (place.road || '?') +
                    ' - ' +
                    (place.postcode || '?')
                  );

  }

  // @link https://github.com/WebReflection/JSONH
  function packPlaces(activity) {
    activity.place = JSONH.pack(activity.place);
    // some clean up here too ^_^
    delete activity.currentPlace;
  }


///////////////////////////////////////////////////////////////////////
////                        <<< INIT >>>
///////////////////////////////////////////////////////////////////////

  // per each key in the walkThrough object
  Object.keys(walkThrough).forEach(
    function (key) {
      // if it's an event name we expect
      // (all but the one used to handle them)
      if (key !== 'handleEvent') {
        // add walkTrhough as listener of itself
        this.on(key, this);
      }
    },
    // the context
    walkThrough
  );

  // disable all fields by default
  $('fieldset').forEach(FieldSet.disable);

  // let's start with step 1 :-)
  walkThrough.trigger('step-1');

});}(this));