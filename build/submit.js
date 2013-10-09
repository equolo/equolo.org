/*! )°(, equolo - https://github.com/equolo/equolo.org */
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
IE9Mobile&&document.write('<link rel="stylesheet" href="css/IE9Mobile.css"/><script src="js/IE9Mobile.js"></script>');(function(b){(function(e,c,d){"indexOf" in e||(e.indexOf=function(f){for(var g=this.length;g--&&this[g]!==f;){}return g});"bind" in c||(c.bind=function(j){var i=this,h=e.slice,g=h.call(arguments,1);return function(){return i.apply(j,g.concat(h.call(arguments)))}});"trim" in d||(d.trim=function(){return this.replace(/^[^\S]+|[^\S]+$/g,"")})}(Array.prototype,Function.prototype,String.prototype));
/*! (C) WebReflection Mit Style License */
(function(z){function F(c){return typeof c=="string"?z.document.createTextNode(c):c}function m(f){if(f.length===1){return F(f[0])}for(var e=z.document.createDocumentFragment(),c=x.call(f),d=0;d<f.length;d++){e.appendChild(F(c[d]))}return e}for(var g,w,G,k=/^\s+|\s+$/g,E=/\s+/,C=" ",y=function(c,d){return this.contains(c)?d||this.remove(c):d&&this.add(c),!!d},q=(z.Element||z.Node||z.HTMLElement).prototype,B=["prepend",function(){var c=this.firstChild,d=m(arguments);c?this.insertBefore(d,c):this.appendChild(d)},"append",function(){this.appendChild(m(arguments))},"before",function(){var c=this.parentNode;c&&c.insertBefore(m(arguments),this)},"after",function(){var d=this.parentNode,e=this.nextSibling,c=m(arguments);d&&(e?d.insertBefore(c,e):d.appendChild(c))},"replace",function(){var c=this.parentNode;c&&c.replaceChild(m(arguments),this)},"remove",function(){var c=this.parentNode;c&&c.removeChild(this)}],x=B.slice,j=B.length;j;j-=2){g=B[j-2],g in q||(q[g]=B[j-1])}"classList" in document.documentElement?(G=document.createElement("div").classList,G.add("a","b"),"a b"!=G&&(q=G.constructor.prototype,"add" in q||(q=z.DOMTokenList.prototype),w=function(c){return function(){var d=0;while(d<arguments.length){c.call(this,arguments[d++])}}},q.add=w(q.add),q.remove=w(q.remove),q.toggle=y)):(w=function(c){if(!c){throw"SyntaxError"}if(E.test(c)){throw"InvalidCharacterError"}return c},G=function(d){var c=d.className.replace(k,"");c.length&&B.push.apply(this,c.split(E)),this._=d},G.prototype={length:0,add:function(){for(var c=0,d;c<arguments.length;c++){d=arguments[c],this.contains(d)||B.push.call(this,g)}this._.className=""+this},contains:function(c){return function(d){return j=c.call(this,g=w(d)),-1<j}}([].indexOf||function(c){j=this.length;while(j--&&this[j]!==c){}return j}),item:function(c){return this[c]||null},remove:function(){for(var c=0,d;c<arguments.length;c++){d=arguments[c],this.contains(d)&&B.splice.call(this,j,1)}this._.className=""+this},toggle:y,toString:function D(){return B.join.call(this,C)}},(Object.defineProperty||function(d,c,f){d.__defineGetter__(c,f.get)})(q,"classList",{get:function(){return new G(this)},set:function(){}}));try{new z.CustomEvent("?")}catch(A){z.CustomEvent=function(f,c){function h(o,e){var l=document.createEvent(f);if(typeof o!="string"){throw new Error("An event name must be provided")}return f=="Event"&&(l.initCustomEvent=d),e==null&&(e=c),l.initCustomEvent(o,e.bubbles,e.cancelable,e.detail),l}function d(o,i,p,l){this.initEvent(o,i,p),this.detail=l}return h}(z.CustomEvent?"CustomEvent":"Event",{bubbles:!1,cancelable:!1,detail:null})}})(b);
/*! (C) Andrea Giammarchi Mit Style License */
(function(X){function G(){return{l:{},m:[],b:[]}}function k(d){var c=G();return Z.value=c,L(d,W,Z),Z.value=null,c}function A(d,c,f){typeof c=="function"?c.apply(d,f):c.handleEvent.apply(c,f)}function j(d,c,f){f&&z(this,"detail",f),z(this,"type",c),z(this,"target",d),z(this,"timeStamp",P())}if(X.eddy){return}X.eddy=!0;var H=Array.prototype,O=X.prototype,K=j.prototype,R=O.hasOwnProperty,I=H.push,M=H.slice,F=H.unshift,ab="toLocaleString",W={toLocaleString:1}.propertyIsEnumerable(ab)?"_@eddy"+Math.random():ab,Q=W===ab,Z=(X.create||X)(null),U=[],L=Q?function(d,c,f){d[c]=f.value}:X.defineProperty,Y=function(d){var c=this;return function(){return c.apply(d,arguments)}},D=H.indexOf||function(d){var c=this.length;while(c--&&this[c]!==d){}return c},P=Date.now||function(){return(new Date).getTime()},V={boundTo:function(e){var h=R.call(this,W)?this[W]:k(this),f=h.m,g=h.b,d=typeof e=="string"?this[e]:e,c=D.call(f,d);return c<0?g[I.call(f,d)-1]=Y.call(d,this):g[c]},emit:function(g){var o=R.call(this,W),i=o&&this[W].l,h=o&&R.call(i,g),f=h&&i[g],e=h&&M.call(arguments,1),d=0,m=h?f.length:d;while(d<m){A(this,f[d++],e)}return h},listeners:function(c){return R.call(this,W)&&R.call(this[W].l,c)&&this[W].l[c].slice()||[]},off:function(d,h){var f=R.call(this,W),e=f&&this[W].l,g=f&&R.call(e,d)&&e[d],c;return g&&(c=D.call(g,h),-1<c&&(g.splice(c,1),g.length||delete e[d])),this},on:function(e,h,f){var g=R.call(this,W),d=(g?this[W]:k(this)).l,c=g&&R.call(d,e)?d[e]:d[e]=[];return D.call(c,h)<0&&(f?F:I).call(c,h),this},once:function(d,g,f){var c=function(h){e.off(d,c,f),A(e,g,arguments)},e=this;return e.on(d,c,f)},trigger:function(E,g){var N=R.call(this,W),f=N&&this[W].l,C=typeof E=="string",x=C?E:E.type,i=N&&R.call(f,x),w=i&&f[x].slice(0),e=C?new j(this,x,g):E,r=0,y=i?w.length:r,h=!(e instanceof j);h&&(e._active=!0,e.stopImmediatePropagation=K.stopImmediatePropagation),e.currentTarget=this,U[0]=e;while(e._active&&r<y){A(this,w[r++],U)}return h&&(delete e._active,delete e.stopImmediatePropagation),!e.defaultPrevented}},z=function(d,c,f){R.call(d,c)||(d[c]=f)},aa=!1,B;K.defaultPrevented=!1,K._active=K.cancelable=!0,K.preventDefault=function(){this.defaultPrevented=!0},K.stopImmediatePropagation=function(){this._active=!1};for(B in V){R.call(V,B)&&L(O,B,{enumerable:!1,configurable:!0,writable:!0,value:V[B]})}(function(d){function f(e){function g(h){h[e].apply(h,this)}return function(){return d.call(this,g,arguments),this}}for(var c in V){V.hasOwnProperty(c)&&!/^listeners|boundTo$/.test(c)&&L(H,c,{enumerable:!1,configurable:!0,writable:!0,value:f(c)})}})(H.forEach);var q={boundTo:V.boundTo,emit:function(d){var c=new CustomEvent(d);return c.arguments=H.slice.call(arguments,1),this.dispatchEvent(c)},listeners:function(c){return[]},off:function(d,c,f){return this.removeEventListener(d,c,f),this},on:function(d,c,f){return this.addEventListener(d,c,f),this},once:V.once,trigger:function(d,g){var f=typeof d=="string",c=f?d:d.type,e=f?new CustomEvent(c,(Z.detail=g,Z)):d;return Z.detail=null,j.call(e,this,c),this.dispatchEvent(e)}};Z.cancelable=!0,Z.bubbles=!0;try{document.createEvent("Event").target=document}catch(J){aa=!0,z=function(f,c,g){if(!R.call(f,c)){try{f[c]=g}catch(d){}}}}(function(h){var d=h.Window,l=d?d.prototype:h,g=(h.Node||h.Element||h.HTMLElement).prototype,f=(h.Document||h.HTMLDocument).prototype,i,c;for(i in q){R.call(q,i)&&(c={enumerable:!1,configurable:!0,writable:!0,value:q[i]},L(l,i,c),L(g,i,c),L(f,i,c))}})(b)})(Object);b.$=function(c){return function(e,d){return c.slice.call(c.concat(d||document)[0].querySelectorAll(e))}}([]);
/*! SimpleKinetic v0.1.1 - MIT license */
;var a=function(d){var l=d.isNaN,e=d.Math,s=e.abs,r=e.round,o=e.sqrt,k=d.setInterval,p=d.clearInterval,g=0.2,q=9,m=1000/60,j=f.prototype;function f(t){for(var u in t){if(/^on|context|interval/.test(u)){this[u]=t[u]}}}j.init=function(J,I,A,w,D,B){var K=i(this),z=(s(A)<1?0:A)*(D?1:q),F=(s(w)<1?0:w)*(B?1:q),v=z*z,E=F*F,u=o(v+E),t=z/u,C=F/u,H,G;K.cancel(K._cx,K._cy);if(!(l(t)||l(C))){K._a=k(h,K.interval||m,K);K._t=0;K._d=u;K._sx=K._cx=J;K._sy=K._cy=I;K._xa=t;K._ya=C;H=r(J+u*t);G=r(I+u*C);K._ex=H;K._ey=G;if((J!==H||I!==G)&&K.start(J,I,0,0,H,G)!==false){return true}i(K._a)}return false};j.start=n("start");j.move=n("move");j.end=n("end");j.cancel=function(v,t,w,u,y,x){if(this._a){i(this).oncancel.call(this.context||this,v,t,w,u,y,x)}};j.onstart=j.onmove=j.onend=j.oncancel=function(v,t,w,u,y,x){};function i(t){p(t._a);t._a=0;return t}function n(t){t="on"+t;return function(w,u,x,v,z,y){return this[t].call(this.context||this,w,u,x,v,z,y)}}function h(v){var C=(v._t+=(v._d-v._t)*g),u=r(v._sx+C*v._xa),D=r(v._sy+C*v._ya),B=v._ex,z=v._ey,A=u-v._cx,w=D-v._cy;if(u===B&&D===z){i(v).end(B,z,A,w,B,z)}else{v.move(u,D,A,w,B,z);v._cx=u;v._cy=D}}var c=k(function(t){p(c);if(!t){k=function(w,v,u){return d.setInterval(function(){w(u)},v)}}},0,1);return f}(this);document.once("DOMContentLoaded",function(){var d={handleEvent:function(i){var h=i.type,g;if("_type" in this){g=this._type+"-terminate";if(g in this){this[g](i)}}this._type=h;g=h+"-init";if(g in this){this[g](i)}this[h](i)},"step-1":function(i){var h=$("fieldset#"+i.type),g=$("select",h);g.once("change",function(){location.href=location.href.split(/[\?#]/)[0]+"?lang="+this.value});this.trigger("step-2")},"step-2":function(h){var g=$("fieldset#"+h.type)[0];e.disable(g);setTimeout(function(){e.enable(g);setTimeout(function(){e.disable(g)},5000)},5000)}},f=["mousedown","mousemove","mouseup","click"],e={disable:function(g){g.className="disabled";f.forEach(this._addStopEvent,g)},enable:function(g){g.className="";f.forEach(this._removeStopEvent,g)},_addStopEvent:function(g){this.on(g,c,true)},_removeStopEvent:function(g){this.off(g,c,true)}};function c(g){g.preventDefault();(g.stopImmediatePropagation||g.stopPropagation).call(g)}Object.keys(d).forEach(function(g){if(g!=="handleEvent"){this.on(g,this)}},d);d.trigger("step-1")})}(this));