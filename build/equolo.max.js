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
/*! display v0.1.8 - MIT license */
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
    document = global.document,
    documentElement = document.documentElement,
    shouldBeMobile  = /\bMobile\b/.test(navigator.userAgent),
    rFS = documentElement.requestFullscreen ||
          documentElement.mozRequestFullScreen ||
          documentElement.webkitRequestFullScreen
    ,
    cFS = document.exitFullscreen ||
          document.cancelFullscreen ||
          document.mozCancelFullScreen ||
          document.webkitExitFullscreen
    ,
    handlers = {
      change: []
    },
    display = {
      width: 0,
      height: 0,
      ratio: 0,
      full: rFS && cFS ? function (onOrOff) {
        var
          isFS =  document.fullscreenElement ||
                  document.mozFullScreenElement ||
                  document.webkitFullscreenElement
        ;
        if (onOrOff || onOrOff == null) {
          display.fullScreen = true;
          if (!isFS) {
            rFS.call(documentElement);
          }
        } else if (isFS) {
          display.fullScreen = false;
          cFS.call(document);
        }
      } : Object,
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
        global.innerWidth || Infinity,
        documentElement.clientWidth || Infinity,
        // some Android has 0.75 ratio
        devicePixelRatio < 1 ? Infinity : (
          // Android flips screen width and height size in landscape
          // Find biggest dimension in landscape otherwise width is OK
          (shouldBeMobile && landscape ? max(swidth, sheight) : swidth) || Infinity
        )
      ),
      height = min(
        global.innerHeight || Infinity,
        documentElement.clientHeight || Infinity,
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
/*! (C) Andrea Giammarchi Mit Style License */
var restyle=function(e){"use strict";function u(e,t){this.node=e,this.css=t}function a(e,t,n){return t+"-"+n.toLowerCase()}function f(e,t,n){var i=[],s=typeof t=="number"?"px":"",o=e.replace(r,a),u=n.length;while(u--)i.push("-",n[u],"-",o,":",t,s,";");return i.push(o,":",t,s,";"),i.join("")}function l(e,t){return e.length?e+"-"+t:t}function c(e,t,r,s){var o,u,a;for(o in r)if(n.call(r,o))if(typeof r[o]=="object")if(i(r[o])){u=r[o];for(a=0;a<u.length;a++)e.push(f(l(t,o),u[a],s))}else c(e,l(t,o),r[o],s);else e.push(f(l(t,o),r[o],s));return e.join("")}function h(e,t){var r=[],i,o,u,a,f,l,p;for(a in e)if(n.call(e,a)){i=a.charAt(0)==="@",o=i?a.slice(1):a,f=s.concat(e[a]);for(l=0;l<f.length;l++){u=f[l];if(i){p=t.length;while(p--)r.push("@-",t[p],"-",o,"{",h(u,[t[p]]),"}");r.push(a,"{",h(u,t),"}")}else r.push(a,"{",c([],"",u,t),"}")}}return r.join("")}var t=e.toString,n=e.hasOwnProperty,r=/([a-z])([A-Z])/g,i=Array.isArray||function(e){return t.call(e)==="[object Array]"},s=[],o;return u.prototype={remove:function(){var e=this.node,t=e.parentNode;t&&t.removeChild(e)},valueOf:function(){return this.css}},typeof document=="undefined"?(o=function(e,t){return h(e,t||s)},o.restyle=o):o=function(e,t,n){var r=n||document,i=h(e,t||o.prefixes),s=r.head||r.getElementsByTagName("head")[0]||r.documentElement,a=s.insertBefore(r.createElement("style"),s.lastChild);return a.type="text/css","styleSheet"in a?a.styleSheet.cssText=i:a.appendChild(r.createTextNode(i)),new u(a,i)},o.prefixes=["o","ms","moz","webkit"],o}({});// quite an ambitious name
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
(function(e){"use strict";function S(){return{w:{},l:{},m:[],b:[]}}function x(e,t,n){typeof t=="function"?t.apply(e,n):t.handleEvent.apply(t,n)}function T(e,t,n){n!==void 0&&b(this,"detail",n),b(this,"type",t),b(this,"target",e),b(this,"timeStamp",m())}if(e.eddy)return;e.eddy=!0;var t=Array.prototype,n=e.prototype,r=T.prototype,i=n.hasOwnProperty,s=t.push,o=t.slice,u=t.unshift,a="toLocaleString",f={toLocaleString:1}.propertyIsEnumerable(a)?"_@eddy"+Math.random():a,l=f===a,c=(e.create||e)(null),h=[],p=l?function(e,t,n){e[t]=n.value}:e.defineProperty,d=function(e){var t=this;return function(){return t.apply(e,arguments)}},v=t.indexOf||function(e){var t=this.length;while(t--&&this[t]!==e);return t},m=Date.now||function(){return(new Date).getTime()},g=function(e){var t=S();return c.value=t,p(e,f,c),c.value=null,t},y={boundTo:function k(e,t){var n=i.call(this,f)?this[f]:g(this),r=n.m,o=n.b,u=typeof e=="string"?typeof t===void 0||i.call(this,e)?this[e]:this[e]=t:e,a=v.call(r,u);return a<0?o[s.call(r,u)-1]=d.call(u,this):o[a]},emit:function L(e){var t=i.call(this,f),n=t&&this[f].l,r=t&&i.call(n,e),s=r&&n[e].slice(0),u=r&&o.call(arguments,1),a=0,l=r?s.length:a;while(a<l)x(this,s[a++],u);return r},listeners:function A(e){return i.call(this,f)&&i.call(this[f].l,e)&&this[f].l[e].slice()||[]},off:function O(e,t){var n=i.call(this,f),r=n&&this[f].l,s=n&&i.call(r,e)&&r[e],o;return s&&(o=v.call(s,t),-1<o&&(s.splice(o,1),s.length||delete r[e])),this},on:function M(e,t,n){var r=i.call(this,f),o=(r?this[f]:g(this)).l,a=r&&i.call(o,e)?o[e]:o[e]=[];return v.call(a,t)<0&&(n?u:s).call(a,t),this},once:function _(e,t,n){var r=function(s){i.off(e,r,n),x(i,t,arguments)},i=this;return i.on(e,r,n)},trigger:function D(e,t){var n=i.call(this,f),s=n&&this[f].l,o=typeof e=="string",u=o?e:e.type,a=n&&i.call(s,u),l=a&&s[u].slice(0),c=o?new T(this,u,t):e,p=0,d=a?l.length:p,v=!(c instanceof T);v&&(c._active=!0,c.stopImmediatePropagation=r.stopImmediatePropagation),c.currentTarget=this,h[0]=c;while(c._active&&p<d)x(this,l[p++],h);return v&&(delete c._active,delete c.stopImmediatePropagation),!c.defaultPrevented},when:function(e,t){var n=i.call(this,f),r=(n?this[f]:g(this)).w,s=n&&i.call(r,e);return s?(x(this,t,r[e]),this):this.once(e,function(){i.call(r,e)||(r[e]=arguments)},!0).once(e,t)}},b=function(e,t,n){i.call(e,t)||(e[t]=n)},w=!1,E;r.defaultPrevented=!1,r._active=r.cancelable=!0,r.preventDefault=function(){this.defaultPrevented=!0},r.stopImmediatePropagation=function(){this._active=!1};for(E in y)i.call(y,E)&&p(n,E,{enumerable:!1,configurable:!0,writable:!0,value:y[E]});(function(e){function n(t){function n(e){e[t].apply(e,this)}return function(){return e.call(this,n,arguments),this}}for(var r in y)y.hasOwnProperty(r)&&!/^listeners|boundTo$/.test(r)&&p(t,r,{enumerable:!1,configurable:!0,writable:!0,value:n(r)})})(t.forEach);var N={boundTo:function(e){try{e.call(document.createElement("div"),function(){})}catch(t){g=function(e){return e[f]=S(),e[f]}}return e}(y.boundTo),data:function P(e,t){var n="dataset"in this,r;return arguments.length<2?n?e in this.dataset?this.dataset[e]:r:(t=this.getAttribute("data-"+e.replace(P.gre||(P.gre=/-[a-z]/g),P.gplace||(P.gplace=function(e,t){return t.toUpperCase()}))))==null?r:t:n?t==null?delete this.dataset[e]:(this.dataset[e]=t,t):(P.sre||(P.sre=/([a-z])([A-Z])/g,P.splace=function(e,t,n){return t+"-"+n.toLowerCase()}),e="data-"+e.replace(P.sre,P.splace),t==null?!this.removeAttribute(e):(this.setAttribute(e,t),t))},emit:function H(e){var n=new CustomEvent(e);return n.arguments=t.slice.call(arguments,1),this.dispatchEvent(n)},listeners:function B(e){return[]},off:function(e,t,n){return this.removeEventListener(e,t,n),this},on:function(e,t,n){return this.addEventListener(e,t,n),this},once:y.once,trigger:function j(e,t){var n=typeof e=="string",r=n?e:e.type,i=n?new CustomEvent(r,(c.detail=t,c)):e;return c.detail=null,T.call(i,this,r),this.dispatchEvent(i)},when:y.when};c.cancelable=!0,c.bubbles=!0;try{document.createEvent("Event").target=document}catch(C){w=!0,b=function(e,t,n){if(!i.call(e,t))try{e[t]=n}catch(r){}}}(function(t){var n=t.Window,r=n?n.prototype:t,s=(t.Node||t.Element||t.HTMLElement).prototype,o=(t.Document||t.HTMLDocument).prototype,u=(t.XMLHttpRequest||function(){}).prototype,a=function(){f.trigger("ready")},f=t.document,l,c;for(l in N)i.call(N,l)&&(c={enumerable:!1,configurable:!0,writable:!0,value:N[l]},p(s,l,c),l!=="data"&&(p(r,l,c),p(o,l,c),p(u,l,c)));f.when("ready",e),/loaded|complete/.test(f.readyState)?(t.setImmediate||setTimeout)(a):f.once("DOMContentLoaded",a,!0)})(window)})(Object);// very simple jQueryish approach: inefficient but handy enough
window.$=function(a){return function(c,p){return a.slice.call(a.concat(p||document)[0].querySelectorAll(c))}}([]);/*! (C) Andrea Giammarchi */
function Mercator(TILE_SIZE) {
  var
    Math = window.Math,
    atan = Math.atan,
    exp = Math.exp,
    log = Math.log,
    max = Math.max,
    min = Math.min,
    pow = Math.pow,
    round = Math.round,
    sqrt = Math.sqrt,
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
    pointDistance: function pointsDistance(a, b) {
      return sqrt(pow(b.y - a.y, 2) + pow(b.x - a.x, 2));
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

// document.body.appendChild(new Image).src=equoloIcon(document.createElement('canvas'), 256, '#E6A72A').toDataURL();// add shortcut icons per each resolution to the header at runtime
// requires equoloIcon();
function createShortcutIcon(equoloIcon) {
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
}var storage = localStorage;
try{storage.setItem('0',0);storage.removeItem('0')}catch(iOS7){
  storage = {
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
});/*! (C) Andrea Giammarchi */
// https://gist.github.com/WebReflection/7286687
var Delayed = function(delay){
  function Delayed(callback, delay) {
    function delayed() {
      // ensure the right clear method
      clear.call(delayed);
      // re-set the timeout (still waiting after)
      delayed.waiting = setTimeout(
        invoke, delay, delayed, callback, this, arguments
      );
    }
    if (!delay) delay = Delayed.delay;
    // a ways to stop the execution
    delayed.clear = clear;
    // although waiting will be false only once executed
    delayed.waiting = Infinity;
    // **or** if explicitly blocked by a user
    return delayed;
  }
  function clear() {
    if (this.waiting !== Infinity) {
      clearTimeout(this.waiting);
    }
    this.waiting = 0;
  }
  function invoke(delayed, callback, context, args) {
    // mark as consumed already, not waiting anymore
    delayed.waiting = 0;
    // finally invoke the callback
    callback.apply(context, args);
  }
  Delayed.delay = delay;
  return Delayed;
}(500);/*! (C) Andrea Giammarchi */
function Mercator(TILE_SIZE) {
  var
    Math = window.Math,
    atan = Math.atan,
    exp = Math.exp,
    log = Math.log,
    max = Math.max,
    min = Math.min,
    pow = Math.pow,
    round = Math.round,
    sqrt = Math.sqrt,
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
    pointDistance: function pointsDistance(a, b) {
      return sqrt(pow(b.y - a.y, 2) + pow(b.x - a.x, 2));
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
}/*! (C) Andrea Giammarchi */
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

}(navigator.userAgent, Math));/*! (C) Andrea Giammarchi */
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

}(navigator, document));// once notified, creates a full screen logo
window.on('wp:hs-icon', function(e) {
  var
    wp = document.body.appendChild(
      document.createElement('wp')
    ),
    tmp = document.createElement('canvas'),
    width = (Math.min(display.width, display.height) / 2) >> 0
  ;
  tmp.style.cssText = 'width:' + width + 'px;' +
                      'height:' + width + 'px;';
  wp.appendChild(
    equoloIcon(
      tmp,
      width * display.ratio,
      '#E6A72A',
      '#286868'
    )
  );
  wp.appendChild(
    document.createElement('h1')
  ).textContent = 'equolo.org';
  wp.onclick = wp.remove;
  if (IE9Mobile) {
    wp.style.cssText =  [
      ';top:', document.documentElement.scrollTop, 'px',
      ';width:', display.width, 'px',
      ';height:', display.height, 'px'
    ].join('');
  }
  e.arguments[0].preventDefault();
});// install equolo.org as App in Firefox OS
window.on('wp:ffos-install', function(e) {
  try {
    navigator.mozApps.install('http://equolo.org/equolo.webapp').onerror = function () {
      // something went wrong
      alert(':-(\n' + this.error.name);
    };
  } catch(notFirefoxOS) {}
  e.arguments[0].preventDefault();
});function GoogleAnalytics() {
  if(location.href.indexOf('equolo') < 0) return;
  window._gaq = [
    ['_setAccount','UA-924021-6'],
    ['_trackPageview']
  ];
  var
    ga = document.createElement('script'),
    s = document.getElementsByTagName('script')[0]
  ;
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'http://www.google-analytics.com/ga.js';
  s.parentNode.insertBefore(ga, s);
}function PayPal() {
  var
    url = 'https://www.paypalobjects.com/',
    fragment = document.createDocumentFragment(),
    input = fragment.appendChild(document.createElement('input')),
    img = fragment.appendChild(document.createElement('img'))
  ;
  input.type = 'image';
  input.src = url + 'en_US/i/btn/btn_donate_SM.gif';
  input.border = img.border = 0;
  input.name = 'submit';
  input.alt = 'PayPal - The safer, easier way to pay online!';
  img.alt = '';
  img.src = url + 'de_DE/i/scr/pixel.gif';
  img.width = img.height = 1;
  $('form#paypal')[0].appendChild(fragment);
}// WARNING ===================================================
// this is not how you should do JavaScript for any website
// this is a rushed code out of a prototype and potentially
// full of any sort of bug, not organized, not optimized
// not ... you name it, it's **not** !
// Please feel free to use some hint used in this file
// but do not copy the style, it's a mess,
// and we deeply apologize about such state at this point.
// If we'll ever have more time to test properly all devices
// we are curently supported in a properly well organized
// code and repository, we'll just do that!
// Right now, we are looking forward to any sort of bug report
// so we can organize our time and resources to fix
// what's really important/missing and prioritize accordingly.
// THANK YOU FOR YOUR UNDERSTANDING!!!
// =================================================== WARNING



// let's dirtly feature detect browser capabilities
// in the worst case scenario, we'll prepare
// the most common icon fallback: the marker one
/*
try{if(IE9Mobile||fontAwesomeIcon('?',36).length<36||/Silk/.test(navigator.userAgent))throw 0}catch(o_O){
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
*/

(function(window, document){

  var
    // which level is good enough to show proper icons ?
    ZOOM_FOR_ICONS = 12,
    ZOOM_FOR_BBOX = 15,
    ZOOM_MAX = 18,
    ZOOM_MIN = 3,
    TOUCH = 'ontouchend' in document,
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
    veryFirstTime = true,
    // should it show the intro ?
    SHOW_INTRO
  ;

  // things that should be done ASAP
  document.when('ready', function(){

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
    DOMScroll(false, true);

  });

  // use window.onload to "hope" everythingis there
  // (font, map, css, etc)
  window.once('load', equolo);

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

    var navLink, el, tmp, watchId, width;

    if (!window.L) {
      // wait for it
      return setTimeout(equolo, 50);
    }

    // map all sections once
    // these won't change anyway during
    // interaction lifecycle ;-)
    section = {
      map: $('section#map')[0],
      about: $('section#about')[0],
      contact: $('section#contact')[0],
      pinIt: $('section#pin-it')[0],
      intro: $('section#intro')[0]
    };

    SHOW_INTRO =  section.intro.classList.contains('show') &&
                  !storage.getItem('equolo.show-intro');
    if (SHOW_INTRO) {
      $('.choice button').on('click', function() {
        if (this.classList.contains('map')) {
          storage.setItem('equolo.show-intro', 1);
          hideIntro();
          setTimeout(function() {
            SHOW_INTRO = false;
            section.intro.classList.remove('show', 't-all');
          }, 1000);
        } else {
          location.href = '/submit.php';
        }
      });
      setTimeout(function () {
        section.intro.style.left = '50%';
      }, 2000);
    }

    section.nav = $('nav', section.map)[0];
    section.placeDetails = $('div.details', section.map)[0];
    section.location = $('div.location', section.map)[0];
    section.details = [
      section.about,
      section.contact,
      section.pinIt
    ];

    $('.logo', section.map).on('click', fullScreen);
    if (!window.compat) {
      createShortcutIcon(equoloIcon);
    } else {
      tmp = $('head')[0].appendChild(
        document.createElement('link')
      );
      tmp.rel = 'shortcut icon';
      tmp.type = 'image/png';
      tmp.href = '/img/equolo-favicon.png';
    }

    // make section good for synthetic `scrollingTo`
    onDisplayChange();

    // swap all emails indercovered by spans
    // do this randomly asynchronously just because :P
    setTimeout(revealEmails, Math.random() * 1000);

    // Google Analytics async load
    GoogleAnalytics();
    // paypal too
    PayPal();


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
      hideIntro();
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
            if (IE9Mobile) {
              section.nav.style.top = null;
            }
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
            invalidateMapSize();
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
              100,
              click.lt,
              click
            );
            setTimeout(
              scrollIntoSection,
              400,
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
                if (IE9Mobile) {
                  section.nav.style.top = document.documentElement.scrollTop + 'px';
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

    navLink.some(function (a) {
      if (a.href.split('#')[1] == this) {
        setTimeout(a.trigger.bind(a), 2000, 'click');
        return true;
      }
    }, location.href.split('#')[1]);


// section#map
///////////////////////////////////////////////////////////////////////

    // initialize once the map
    section.tiles = $('#tiles')[0];
    map = createMap(section.tiles);
    groups = {};
    setMapView(
      // not so many places in US yet, right now Germany is shown instead
      navigator.country && navigator.country.iso2 != 'US' ?
        navigator.country.geo :
        [49.6, 6.116667]
      ,
      5
    );

    // locate the user when asked
    findMe = $('button#find-me')[0];
    if ('geolocation' in navigator) {
      findMe.on('click', function (e) {
        findMe.firstChild.classList.remove('icon-compass');
        findMe.firstChild.classList.add('fx-spin', 'icon-refresh');
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
    tmp = storage.getItem('equolo.activities');
    if (tmp) {
      evaluateAndShowOnMap(tmp);
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
      hideIntro();
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
    findMe.firstChild.classList.remove('fx-spin', 'icon-download');
    findMe.firstChild.classList.add('icon-compass');
    findMe.disabled = false;
  }

  function flatActivities() {
    if (!lastReducedActivities) {
      lastReducedActivities = lastParsedActivities.reduce(
        flatPlaces, []
      );
    }
    return lastReducedActivities;
  }

  function hideIntro() {
    if (SHOW_INTRO) {
      section.intro.style.left = '100%';
    }
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
          iconUrl: '/img/map/' + place.icon + '.png',
          iconSize: [36, 36],
          iconAnchor: [18, 36]
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
              '<i class="icon-' +
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
              'icon-' + place.icon
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
            if (!TOUCH) {
              li.on('click', onPlaceClick);
            }
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
        if (TOUCH && !updateInfoOnBar.hscroll) {
          updateInfoOnBar.hscroll = new HorizontalScroll(
            updateInfoOnBar.el, {
              onstart: function () {
                this.x = updateInfoOnBar.el.scrollLeft;
                this.el = onPlaceClick.last || $('li.place', updateInfoOnBar.el)[0];
                onPlaceClick.reset();
              },
              onchange: function (e) {
                this.x = e.x - this.x;
              },
              onend: function (e) {
                onPlaceClick.call((
                  this.x < 0 ?
                    this.el.nextElementSibling :
                    this.el.previousElementSibling
                  ) ||
                  this.el,
                  {}
                );
              },
              onclick: function (e) {
                var target = e.target;
                while(target && target.nodeName !== 'LI') {
                  target = target.parentNode;
                }
                if (target && target.nodeName === 'LI') {
                  onPlaceClick.call(target, target);
                }
              }
            }
          );
        }
      }));
      map.on('movestart', updateInfoOnBar.movestart = function () {
        updateInfoOnBar.moveend.clear();
        onPlaceClick.cancel();
      });
    }
    updateInfoOnBar.moveend();
  }

  function onMarkerClick() {
    onPlaceClick.call($('li#place-' + this.id)[0], {detail:false});
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

  function showSocialIfNeeded(where, place, field, icon) {
    var a;
    if (place[field]) {
      a = where.lastChild.appendChild(
        document.createElement('a')
      );
      a.target = '_blank';
      a.classList.add('social');
      switch(field) {
        case 'twitter':
          a.href = /^https?:\/\/(?:www.)?twitter\./.test(place[field]) ?
            place[field] :
            'https://twitter.com/' + place[field].replace(/^@/, '')
          ;
          break;
        case 'facebook':
          a.href = /^https?:\/\/(?:www.)?facebook\./.test(place[field]) ?
            place[field] :
            'https://www.facebook.com/' + place[field]
          ;
          break;
        case 'gplus':
          a.href = /^https?:\/\/plus\.google\./.test(place[field]) ?
            place[field] :
            'https://plus.google.com/' + place[field]
          ;
          break;
      }
      a.appendChild(
        document.createElement('i')
      ).classList.add('icon-' + icon);
    }
  }

  function showButtonIfNeeded(where, place, field, icon) {
    var li;
    if (place[field]) {
      li = where.appendChild(
        document.createElement('li')
      );
      li.classList.add('button');
      li.appendChild(
        document.createElement('i')
      ).classList.add('icon-' + icon);
      li = li.appendChild(
        document.createElement('a')
      );
      li.classList.add('ellipsis');
      switch(field) {
        case 'phone':
          li.href = 'tel:' + place[field].replace(/[^0-9+]/g, '');
          break;
        case 'email':
          li.href = 'mailto:' + place[field];
          break;
        default:
          li.target = '_blank';
          li.href = /^https?:\/\//i.test(place[field]) ?
            place[field] :
            'http://' + place[field]
          ;
          break;
      }
      li.textContent = place[field];
    }
  }

  function showAllDetails(place) {
    var el, ul, height, coords;
    showAllDetails.showing = true;
    if (!showAllDetails.footer) {
      showAllDetails.footer = section.nav.parentNode.offsetHeight;
    }
    if (!showAllDetails.el) {
      showAllDetails.el = section.placeDetails;
      // showAllDetails.el = $('div.details', section.map)[0];
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
        tap: false,
        fadeAnimation: false
      });
    }
    // no need to remove others
    // nicer effect, not a huge deal, practically ...
    createMarker(place).addTo(minimap);
    coords = mercator.coordsToPoint(place, 15);
    coords.y -= 18;
    minimap.setView(
      toGeoArray(
        mercator.pointToCoords(coords, 15)
      ),
      15
    );
    showAllDetails.h3.textContent =
    showAllDetails.address.textContent =
    showAllDetails.contact.textContent = '';
    showAllDetails.h3.appendChild(
      document.createElement('i')
    ).className = 'icon-' + place.icon;
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

    showButtonIfNeeded(ul, place, 'phone', 'phone');
    showSocialIfNeeded(ul, place, 'twitter', 'twitter');
    showButtonIfNeeded(ul, place, 'email', 'envelope');
    showSocialIfNeeded(ul, place, 'facebook', 'facebook-square');
    showButtonIfNeeded(ul, place, 'website', 'globe');
    showSocialIfNeeded(ul, place, 'gplus', 'google-plus');

    fixFonts(el);

    /*
    $('div.minimap *').forEach(function (el) {
      if (el.classList) {
        el.classList.add('hw');
      }
    });
    */
  }

  function onPlaceClick(e) {
    try {
    var
      coords = this.data('coords').split('/'),
      doubleClick = onPlaceClick.last == this,
      scroller = this.parentNode.parentNode,
      placeId = this.id.slice(6),
      li, x, tmp, onend
    ;
    } catch(o_O) {
      // something terribly wrong happened
      // right now some too quick action can cause this
      // so untile we figure out why
      // this stays and ...
      return;
    }
    this.clicked = true;
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
      tmp = HorizontalScroll.compat ?
        -parseFloat(scroller.style.marginLeft || 0) :
        scroller.scrollLeft;
      (onPlaceClick.sk = new SimpleKinetic({
        onmove: function (x, y, dx, dy, ex, ey) {
          if (HorizontalScroll.compat) {
            scroller.style.marginLeft = -x + 'px';
          } else {
            scroller.scrollLeft = x;
          }
        },
        onend: onend
      })).init(
        tmp,
        0,
        x - tmp,
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

  function DOMScroll(init, forceIt) {
    var op = init ? 'remove' : 'add';
    if (forceIt) {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
    document.documentElement.classList[op]('no-scroll');
    document.body.classList[op]('no-scroll');
  }

  function getScrollableMargin() {
    return (display.width - 276) >> 1;
  }

  // what happens when the display size changes ?
  function onDisplayChange() {
    var placeMargin = getScrollableMargin(),
        header = $('header', section.map)[0].offsetHeight,
        mapHeight = (
          display.height -
          header -
          $('footer', section.map)[0].offsetHeight
        ),
        style = restyle({
          // section should have a proper minimum height
          'section': {
            'min-height': display.height
          },
          'section#map > div.location li.place:nth-child(3)': {
            'margin-left': placeMargin
          },
          'section#map > div.location li.place:last-child': {
            'margin-right': placeMargin
          },
          'section#map > div.location > ul > li': {
            'min-height': 150 - SCROLLBAR_SIZE
          },
          'section#intro': {
            'top': header + 'px',
            'width': Math.round(display.width / 2),
            'max-height': mapHeight,
            'min-height': mapHeight
          }
      }, []);

    if (onDisplayChange.style) {
      onDisplayChange.style.remove();
    }
    onDisplayChange.style = style;
    invalidateMapSize();
  }

  function invalidateMapSize() {
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
    /*
    if (IE9Mobile)
      FontCawesome.fix(el)
    ;
    */
  }

  function fullScreen() {
    display.full(!display.fullScreen);
    setTimeout(invalidateMapSize, 300);
  }

  window.on('go:fullscreen', function () {
    display.full(true);
  });

  // all places are packed via JSONH to preserve
  // both bandwidth and localStorage space once stringified
  // we then need to unpack them once parsed back
  function unpack(activity) {
    activity.place = JSONH.unpack(activity.place);
    return activity;
  }

  function revealEmails() {
    $('span.email').forEach(function (span) {
      var
        a = document.createElement('a'),
        mailto = span.textContent.split('').reverse().join('')
      ;
      a.href = 'mailto:' + mailto;
      a.textContent = mailto;
      span.replace(a);
    });
  }

  // every time the dispay changes
  display.on('change', onDisplayChange);

}(window, document));}(this));