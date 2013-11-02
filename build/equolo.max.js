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
/*! display v0.1.6 - MIT license */
/** easy way to obtain the full window size and some other prop */
var display = function (global) {

  var
    Math = global.Math,
    abs = Math.abs,
    max = Math.max,
    min = Math.min,
    Infinity = global.Infinity,
    screen = global.screen || Infinity,
    matchMedia = global.matchMedia,
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
      timer = 0;
    }
    // ignore this event if keyboard comes up (300 should be enough)
    return(!isLandscape() && innerHeight < 300) ||
          (timer = setTimeout(recalc, 300, e));
  }

  function isLandscape() {
    return 'orientation' in global ?
      abs(global.orientation || 0) === 90 :
      !!matchMedia && matchMedia("(orientation:landscape)").matches;
  }

  function recalc(e) {
    timer = 0;
    var
      devicePixelRatio = global.devicePixelRatio || 1,
      landscape = isLandscape(),
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
/*jslint browser: true, plusplus: true, indent: 2 */
// @link https://gist.github.com/WebReflection/6924133
function restyle(
  rules,  // an object containing selectors and
          // a collection of key/value pairs per each
          // selector, i.e.
          //  restyle({
          //    'body > section.main': {
          //      color: '#EEE',
          //      'margin-left': (innerWidth - 200) + 'px'
          //    }
          //  });
  doc     // the document, if necessary
) {
  'use strict';
  /*! (C) Andrea Giammarchi - Mit Style License */
  //  somehow inspired by the fully featured absurd.js
  //  https://github.com/krasimir/absurd#absurdjs
  if (!doc) {
    doc = document;
  }
  doc.getElementsByTagName('head')[0].appendChild(
    doc.createElement('style')
  ).appendChild(doc.createTextNode(''));
  var
    styleSheets = doc.styleSheets,
    styleSheet = styleSheets[styleSheets.length - 1],
    add = styleSheet.addRule || function (selector, rule, index) {
      this.insertRule(selector + '{' + rule + '}', index);
    },
    i = 0,
    selector, // the CSS selector, i.e. body > section.main
    current,  // the current style with one or more key value pairs
    key,      // each property, i.e. transition or color or margin-left
    value,    // the value associated, i.e. #EEDDF0, 20px
    css;      // the list of all rules per each selector
  for (selector in rules) {
    if (rules.hasOwnProperty(selector)) {
      css = [];
      current = rules[selector];
      for (key in current) {
        if (current.hasOwnProperty(key)) {
          value = current[key];
          css.push(
            '-webkit-' + key + ':' + value,
            '-khtml-' + key + ':' + value,
            '-blink-' + key + ':' + value,
            '-moz-' + key + ':' + value,
            '-ms-' + key + ':' + value,
            '-o-' + key + ':' + value,
            key + ':' + value
          );
        }
      }
      add.call(styleSheet, selector, css.join(';') + ';', i++);
    }
  }
}// quite an ambitious name
// however, this is all we might need/want to normalize
(function(Array, Function, String){
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
(function(e){"use strict";function E(){return{l:{},m:[],b:[]}}function S(e){var t=E();return c.value=t,p(e,f,c),c.value=null,t}function x(e,t,n){typeof t=="function"?t.apply(e,n):t.handleEvent.apply(t,n)}function T(e,t,n){n&&y(this,"detail",n),y(this,"type",t),y(this,"target",e),y(this,"timeStamp",m())}if(e.eddy)return;e.eddy=!0;var t=Array.prototype,n=e.prototype,r=T.prototype,i=n.hasOwnProperty,s=t.push,o=t.slice,u=t.unshift,a="toLocaleString",f={toLocaleString:1}.propertyIsEnumerable(a)?"_@eddy"+Math.random():a,l=f===a,c=(e.create||e)(null),h=[],p=l?function(e,t,n){e[t]=n.value}:e.defineProperty,d=function(e){var t=this;return function(){return t.apply(e,arguments)}},v=t.indexOf||function(e){var t=this.length;while(t--&&this[t]!==e);return t},m=Date.now||function(){return(new Date).getTime()},g={boundTo:function(t){var n=i.call(this,f)?this[f]:S(this),r=n.m,o=n.b,u=typeof t=="string"?this[t]:t,a=v.call(r,u);return a<0?o[s.call(r,u)-1]=d.call(u,this):o[a]},emit:function(t){var n=i.call(this,f),r=n&&this[f].l,s=n&&i.call(r,t),u=s&&r[t],a=s&&o.call(arguments,1),l=0,c=s?u.length:l;while(l<c)x(this,u[l++],a);return s},listeners:function(t){return i.call(this,f)&&i.call(this[f].l,t)&&this[f].l[t].slice()||[]},off:function(t,n){var r=i.call(this,f),s=r&&this[f].l,o=r&&i.call(s,t)&&s[t],u;return o&&(u=v.call(o,n),-1<u&&(o.splice(u,1),o.length||delete s[t])),this},on:function(t,n,r){var o=i.call(this,f),a=(o?this[f]:S(this)).l,l=o&&i.call(a,t)?a[t]:a[t]=[];return v.call(l,n)<0&&(r?u:s).call(l,n),this},once:function(t,n,r){var i=function(e){s.off(t,i,r),x(s,n,arguments)},s=this;return s.on(t,i,r)},trigger:function(t,n){var s=i.call(this,f),o=s&&this[f].l,u=typeof t=="string",a=u?t:t.type,l=s&&i.call(o,a),c=l&&o[a].slice(0),p=u?new T(this,a,n):t,d=0,v=l?c.length:d,m=!(p instanceof T);m&&(p._active=!0,p.stopImmediatePropagation=r.stopImmediatePropagation),p.currentTarget=this,h[0]=p;while(p._active&&d<v)x(this,c[d++],h);return m&&(delete p._active,delete p.stopImmediatePropagation),!p.defaultPrevented}},y=function(e,t,n){i.call(e,t)||(e[t]=n)},b=!1,w;r.defaultPrevented=!1,r._active=r.cancelable=!0,r.preventDefault=function(){this.defaultPrevented=!0},r.stopImmediatePropagation=function(){this._active=!1};for(w in g)i.call(g,w)&&p(n,w,{enumerable:!1,configurable:!0,writable:!0,value:g[w]});(function(e){function n(t){function n(e){e[t].apply(e,this)}return function(){return e.call(this,n,arguments),this}}for(var r in g)g.hasOwnProperty(r)&&!/^listeners|boundTo$/.test(r)&&p(t,r,{enumerable:!1,configurable:!0,writable:!0,value:n(r)})})(t.forEach);var N={boundTo:g.boundTo,data:function k(e,t){var n="dataset"in this;return arguments.length<2?n?this.dataset[e]:(t=this.getAttribute("data-"+e.replace(k.gre||(k.gre=/-[a-z]/g),k.gplace||(k.gplace=function(e,t){return t.toUpperCase()}))))==null?void 0:t:n?t==null?delete this.dataset[e]:(this.dataset[e]=t,t):(k.sre||(k.sre=/([a-z])([A-Z])/g,k.splace=function(e,t,n){return t+"-"+n.toLowerCase()}),e="data-"+e.replace(k.sre,k.splace),t==null?!this.removeAttribute(e):(this.setAttribute(e,t),t))},emit:function(n){var r=new CustomEvent(n);return r.arguments=t.slice.call(arguments,1),this.dispatchEvent(r)},listeners:function(t){return[]},off:function(e,t,n){return this.removeEventListener(e,t,n),this},on:function(e,t,n){return this.addEventListener(e,t,n),this},once:g.once,trigger:function(t,n){var r=typeof t=="string",i=r?t:t.type,s=r?new CustomEvent(i,(c.detail=n,c)):t;return c.detail=null,T.call(s,this,i),this.dispatchEvent(s)}};c.cancelable=!0,c.bubbles=!0;try{document.createEvent("Event").target=document}catch(C){b=!0,y=function(e,t,n){if(!i.call(e,t))try{e[t]=n}catch(r){}}}(function(e){var t=e.Window,n=t?t.prototype:e,r=(e.Node||e.Element||e.HTMLElement).prototype,s=(e.Document||e.HTMLDocument).prototype,o=(e.XMLHttpRequest||function(){}).prototype,u,a;for(u in N)i.call(N,u)&&(a={enumerable:!1,configurable:!0,writable:!0,value:N[u]},p(n,u,a),p(r,u,a),p(s,u,a),u!=="data"&&p(o,u,a))})(window)})(Object);// very simple jQueryish approach: inefficient but handy enough
window.$=function(a){return function(c,p){return a.slice.call(a.concat(p||document)[0].querySelectorAll(c))}}([]);function Mercator(TILE_SIZE) {
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

}(this);function equoloIcon(canvas, size, fillColor, backgroundColor) {
  /*! (C) equolo.org */
  var
    originalSize = 192,
    ratio = size / originalSize,
    fillStyle = fillColor || '#286868',
    context = canvas.getContext('2d')
  ;
  function moveTo(x, y) {
    context.moveTo(x * ratio, y * ratio);
  }
  function bezierCurveTo(a, b, c, d, e, f) {
    context.bezierCurveTo(
      a * ratio,
      b * ratio,
      c * ratio,
      d * ratio,
      e * ratio,
      f * ratio
    );
  }
  context.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = canvas.height = size;
  if (backgroundColor) {
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, size, size);
  }
  context.fillStyle = fillStyle;
  context.save();
  context.scale(1.25, 1.25);
  context.beginPath();
  moveTo(95.32 + 10,10.21);
  bezierCurveTo(101.05 + 10, 7.85, 108.56 + 10, 12.68, 108.09 + 10, 19.01);
  bezierCurveTo(108.39 + 10, 25.61, 100.46 + 10, 30.49, 94.67 + 10, 27.28);
  bezierCurveTo(87.81 + 10, 24.1, 88.04 + 10, 12.79, 95.32 + 10, 10.21);
  context.closePath();
  context.fill();
  context.beginPath();
  moveTo(67.01 + 10, 7.48);
  bezierCurveTo(72.33 + 10, 20.59, 82.54 + 10, 31.7, 95.46 + 10, 37.57);
  bezierCurveTo(104.17 + 10, 41.72, 113.89 + 10, 43.25, 123.47 + 10, 43.1);
  bezierCurveTo(108.12 + 10, 48.29, 96.34 + 10, 60.6, 88.32 + 10, 74.31);
  bezierCurveTo(79.91 + 10, 88.85, 78.34 + 10, 106.86, 83.29 + 10, 122.84);
  bezierCurveTo(72.84 + 10, 106.64, 59.08 + 10, 91.84, 41.39 + 10, 83.57);
  bezierCurveTo(30.55 + 10, 78.74, 18.41 + 10, 76.4, 6.58 + 10, 77.64);
  bezierCurveTo(24.52 + 10, 73.08, 42.99 + 10, 65.59, 54.74 + 10, 50.61);
  bezierCurveTo(64.15 + 10, 38.49, 68.55 + 10, 22.74, 67.01 + 10, 7.48);
  context.closePath();
  context.fill();
  context.beginPath();
  moveTo(43.22 + 10, 119.97);
  bezierCurveTo(43.75 + 10, 102.87, 43.89 + 10, 94.92, 48.72 + 10, 89.2);
  bezierCurveTo(50.5 + 10, 93.22, 49.73 + 10, 97.67, 50.54 + 10, 101.88);
  bezierCurveTo(51.34 + 10, 107.31, 53.13 + 10, 112.93, 57.29 + 10, 116.73);
  bezierCurveTo(61.3 + 10, 121.01, 68.71 + 10, 121.41, 70.94 + 10, 127.44);
  bezierCurveTo(72.27 + 10, 133.19, 66.42 + 10, 138.03, 61.08 + 10, 138.09);
  bezierCurveTo(54.7 + 10, 138.64, 49.47 + 10, 133.66, 46.69 + 10, 128.39);
  bezierCurveTo(43.41 + 10, 122.84, 43.52 + 10, 116.2, 43.22 + 10, 109.97);
  context.closePath();
  context.fill();
  context.restore();
  return canvas;
}

// document.body.appendChild(new Image).src=equoloIcon(document.createElement('canvas'), 256, '#E6A72A').toDataURL();// creates a png Map icon SRC out of FontAwesome
// works with retina displays too but it uses
// the display.js file in order to do that
var fontAwesomeIcon = function(canvas){
  var
    context = canvas.getContext('2d'),
    // all names mapped to code
    // right now I need only these icons
    code = {
      question: 0xf128,
      'shopping-cart': 0xf07a,
      gift: 0xf06b,
      cutlery: 0xf0f5,
      home: 0xf015,
      glass: 0xf000,
      briefcase: 0xf0b1,
      group: 0xf0c0,
      truck: 0xf0d1
      //,'map-marker': 32 //0xf041
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
    context.fillStyle = "rgb(240,240,240)";
    ellipse(size / 2, size / 2.5, size / 2.8);
    context.font = context.mozTextStyle =
      Math.round(size / 2) + "px FontAwesome";
    context.translate((canvas.width - (
      context.measureText || context.mozMeasureText
    ).call(context, chr).width) / 2, 0);
    context.fillStyle = "rgb(40,104,104)";
    if (chr.length) {
      context.fillText(chr, 0, size / 1.5);
    } else {
      context.drawImage(
        equoloIcon(
          document.createElement('canvas'),
          size / 1.5
        ),
        -size / 2.8,
        size / 10
      );
    }
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
        code.hasOwnProperty(chr) ?
          String.fromCharCode(code[chr]) : ''
        ,
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
var storage = localStorage;
try{storage.setItem('0',0)}catch(iOS7){
  storage = {
    length: 0,    // do not store data
    getItem: function (key) {
      var
        cookie = document.cookie,
        i = cookie.indexOf(
          key = escape('' + key)
        ),
        l
      ;
      if (-1 < i) {
        i += 1 + key.length;
        l = cookie.indexOf(';', i);
        return unescape(
          cookie.substring(
            i, l < 0 ? cookie.length : l
          )
        );
      }
    },
    setItem: function (key, data) {
      document.cookie = [
        escape('' + key) + '=' + escape('' + data),
        'expires=' + (new Date(
          Date.now() + 1000 * 60 * 60 * 24)
        ).toUTCString(),
        'path=/'
      ].join('; ');
    }
  };
}// need to retrieve the leaflet map isntead of map
window.on('leaflet:map', function(e){
  function reset() {
    map.panBy(
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
        wrap.style.height = tiles.offsetHeight + 'px'
      ) * 3
    ) + 'px';
  }
  var
    map = e.detail,
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
      map.panBy(
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
});/*! (C) Andrea Giammarchi - Mit Style License */
var FontCawesome=function(e){function s(e,t){var s=new XMLHttpRequest,a,l;s.open("get",e,!0),s.onreadystatechange=function(){s.readyState==4&&(l=s.responseXML,l.firstChild||(l=document.createElement("div"),l.innerHTML=s.responseText),n=o(l,"font-face","units-per-em"),r=o(l,"font-face","ascent"),i=o(l,"font-face","descent"),Array.prototype.forEach.call(l.getElementsByTagName("glyph"),f,a={}),(t||u)(a))},s.send(null)}function o(e,t,n){return parseFloat(e.getElementsByTagName(t)[0].getAttribute(n))}function u(e){Array.prototype.forEach.call(document.querySelectorAll(".fa"),function(t,n){var r=t.offsetHeight,i=getComputedStyle(t,":before"),s=i.getPropertyValue("content"),o=e[s.length!==1?s.charAt(1):s].size(r,i.getPropertyValue("color"));t.parentNode.replaceChild(o,t)})}function a(r,s,o){var u=0,a=0,f=r.length,l=s/n*(typeof display=="object"?display.ratio:1.5),c,h,p,d,v,m,g,y;e.width=e.height=Math.round(l*n),t.translate(0,e.height),t.scale(1,-1),t.fillStyle=o||"rgb(0,0,0)",t.globalCompositeOperation="xor";while(u<f){y=r[u++],g=1;switch(y.type){case"T":g=0;case"t":t.quadraticCurveTo(l*(v=2*p-(v||p)),l*(m=2*d-(m||d)),l*(p=p*g+y.arguments[0]),l*(d=d*g+y.arguments[1]));break;case"Q":g=0;case"q":t.quadraticCurveTo(l*(v=p*g+y.arguments[0]),l*(m=d*g+y.arguments[1]),l*(p=p*g+y.arguments[2]),l*(d=d*g+y.arguments[3]));break;case"L":g=0;case"l":t.lineTo(l*(p=p*g+y.arguments[0]),l*(d=d*g+y.arguments[1]));break;case"H":g=0;case"h":t.lineTo(l*(p=p*g+y.arguments[0]),l*d);break;case"V":g=0;case"v":t.lineTo(l*p,l*(d=d*g+y.arguments[0]));break;case"z":case"Z":t.lineTo(l*c,l*h),t.closePath(),t.fill();break;case"M":g=0,t.moveTo(l*(p=c=y.arguments[0]),l*(d=h=y.arguments[1]-i)),t.beginPath(),a=2;while(a<y.arguments.length)t.lineTo(l*(p=y.arguments[a]),l*(d=y.arguments[a+1])),a+=2;break;default:throw"unknown "+y.type}}}function f(e,t){var n=e.getAttribute("d");n&&(this[e.getAttribute("unicode")]={size:h,path:n})}function l(e){var t=0,n=[],r;e=e.replace(l.re||(l.re=/\s*([achlmqstvzACHLMQSTVZ])\s*/g),"$1");while(t<e.length)n.push(r={}),t=c(r,e,t);return n}function c(e,t,n){var r=n,i=!1;switch(e.type=t[n]){case"z":case"Z":return n+1}e.arguments=[];while(r++<t.length)switch(t[r]){case"A":case"a":case"C":case"c":case"H":case"h":case"L":case"l":case"M":case"m":case"Q":case"q":case"S":case"s":case"T":case"t":case"V":case"v":case"Z":case"z":i=!0;case" ":e.arguments.push(parseFloat(t.substring(n+1,r))),n=r;if(i)return n}}function h(r,i){var s=new Image;return a(this._actions||(this._actions=l(this.path)),r,i),s.src=e.toDataURL(),s.style.cssText="width:"+r+"px;"+"height:"+r+"px;",t.clearRect(0,0,n,n),s}var t=e.getContext("2d"),n,r,i;return s}(document.createElement("canvas"));// let's dirtly feature detect browser capabilities
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

    // solve IE9MObile problem with fonts
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
      return option.value;
    });

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
            click.ms.display = null;
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
            // if automatic scroll, do nothing
            if (scrollIntoSection.kinetic || click.kinetic) return;
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
        attribution: 'Map Tiles &copy; Open MapQuest',
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
        center = map.getCenter(),
        bounds
      ;
      if (ZOOM_FOR_BBOX <= zoom) {
        // TODO:  IE9 Mobile won't reach this point
        //        find a solution
        console.log(
          lastParsedActivities.reduce(
            flatPlaces, []
          )
          .filter(
            onlyInBox,
            map.getBounds()
          )
        );
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

  function flatPlaces(p,c){
    return p.concat(c.place);
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
      updateMapMarkers(true);
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

}(window, document));}(this));