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
IE9Mobile&&document.write('<link rel="stylesheet" href="css/IE9Mobile.css"/><script src="js/IE9Mobile.js"></script>');(function(window){(function(Array, Function, String){
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

}(this);document.once('DOMContentLoaded', function () {
  var
    RE_EMAIL = /^[^@]+?@[^\1@]+\.([a-z]{2,})$/,
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
          fieldSet = $('fieldset#' + e.type),
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
          fieldSet = $('fieldset#' + e.type),
          activities = $('select[name=activity]', fieldSet)[0],
          add = $('button[name=add]', fieldSet)[0],
          remove = $('button[name=remove]', fieldSet)[0],
          name = $('input[name=name]', fieldSet)[0],
          description = $('textarea[name=description]', fieldSet)[0],
          lang = $('select[name=lang]', fieldSet)[0],
          counter = $('div.lang > p > span', fieldSet)[0],
          languages = $('ul', fieldSet)[0]
        ;
        // clear everything regardless
        name.value = '';
        description.value = '';
        activities.innerHTML = languages.innerHTML = '';
        counter.innerHTML = 140;
        // populate the field set with all available data
        user.activities.forEach(function (activity, i) {
          var option = activities.appendChild(document.createElement('option'));
          option.value = activity.id;
          option.appendChild(
            document.createTextNode(activity.name)
          );
          // first time here? show data
          if (!i) {
            option.selected = 'selected';
            name.value = activity.name;
            if (!activity.description.hasOwnProperty(lang.value)) {
              for (var key in activity.description) {
                user.activities.forEach.call(
                  lang.options,
                  selectOptionByValue,
                  key
                );
                break;
              }
            }
            description.value = activity.description[lang.value];
            counter.innerHTML = 140 - description.value.length;
          }
        });
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
        fieldSet.className = 'disabled';
        commonMouseEvents.forEach(FieldSet._addStopEvent, fieldSet);
      },
      enable: function (fieldSet) {
        fieldSet.className = '';
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
      user.email = email;
    }
  }

  // once the email is OK
  function verifyEmailCompleted(e) {
    var detail = e.detail;
    switch(typeof detail) {
      // user authed with all info received
      case 'object':
        user.activities = detail;
        // show all activities next field
        // TODO: next ...
        break;
      case 'number':
        // user in but not authenticated
        // or never confirmed the email
        // inform the user and
        // ask if a new email should be sent
        // silently failing in the backend
        // if already sent in last 24 hours
        if (confirm(jslang.seeYouLater)) {
          // TODO: send the reminder
        }
        // nothing to do here, send the user
        // to the equolo.org site
        location.href = 'http://equolo.org/';
        break;
      default:
        // start from scratch new activities
        user.activities = [];
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

  function selectOptionByValue(option) {
    option.selected = option.value == this ? 'selected' : '';
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