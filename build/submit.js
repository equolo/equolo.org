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
IE9Mobile&&document.write('<link rel="stylesheet" href="css/IE9Mobile.css"/><script src="js/IE9Mobile.js"></script>');(function(e){
/*! display v0.1.8 - MIT license */
;var f=function(w){var l=w.Math,p=l.abs,y=l.max,v=l.min,D=w.Infinity,i=w.screen||D,h=w.matchMedia,q="addEventListener",r=w.document,C=r.documentElement,m=/\bMobile\b/.test(navigator.userAgent),j=C.requestFullscreen||C.mozRequestFullScreen||C.webkitRequestFullScreen,A=r.exitFullscreen||r.cancelFullscreen||r.mozCancelFullScreen||r.webkitExitFullscreen,s={change:[]},x={width:0,height:0,ratio:0,full:j&&A?function(E){var F=r.fullscreenElement||r.mozFullScreenElement||r.webkitFullscreenElement;if(E||E==null){x.fullScreen=true;if(!F){j.call(C)}}else{if(F){x.fullScreen=false;A.call(r)}}}:Object,on:function(E,F){s[E].push(F)}},z=s.change.forEach||function(G,E){for(var F=0;F<this.length;F++){G.call(E,this[F],F,this)}},n;function o(E){E.call(x,x.width,x.height)}function u(E){if(n){clearTimeout(n);n=0}return(!t()&&innerHeight<300)||(n=setTimeout(k,300,E))}function t(){return"orientation" in w?p(w.orientation||0)===90:!!h&&h("(orientation:landscape)").matches}function k(J){n=0;var F=w.devicePixelRatio||1,K=t(),G=i.width,I=i.height,H=v(w.innerWidth||C.clientWidth,F<1?D:((m&&K?y(G,I):G)||D)),E=v(w.innerHeight||C.clientHeight,F<1?D:((m&&K?v(G,I):I)||D));if(H!==x.width||E!==x.height){x.width=H;x.height=E;z.call(s.change,o)}}if(q in w){w[q]("orientationchange",u,true);w[q]("resize",u,true);try{i[q]("orientationchange",u,true)}catch(B){}}else{w.attachEvent("onresize",k)}k.call(w);x.ratio=w.devicePixelRatio||i.width/x.width||(i.deviceXDPI||1)/(i.logicalXDPI||1);return x}(e);(function(j,h,i){"bind" in h||(h.bind=function(n){var m=this,l=j.slice,k=l.call(arguments,1);return function(){return m.apply(n,k.concat(l.call(arguments)))}});"trim" in i||(i.trim=function(){return this.replace(/^[^\S]+|[^\S]+$/g,"")})}(Array.prototype,Function.prototype,String.prototype));var d,c=d=function(q,j){function y(G){for(var B=G.length,H=o(B?G[0]:{}),C=H.length,I=q(B*C),F=0,E=0,D,A;F<B;++F){for(A=G[F],D=0;D<C;I[E++]=A[H[D++]]){}}return l.call([C],H,I)}function w(E){for(var F=E.length,B=E[0],A=q(((F-B-1)/B)||0),D=1+B,C=0,H,G;D<F;){for(A[C++]=(G={}),H=0;H<B;G[E[++H]]=E[D++]){}}return A}function k(B){return function A(H){for(var J=this,I=H,F=0,G=J.length,D,C,E;F<G;++F){if(n(E=I[C=J[F]])){D=F+1;I[C]=D<G?z.call(E,B,J.slice(D)):B(E)}I=I[C]}return H}}function m(B){return function A(I,G){for(var D=n(I),C=l.call(i,I),H=l.call(i,G),E=0,F=H.length;E<F;++E){C=z.call(C,B,H[E].split("."))}return D?C:C[0]}}function u(B,A){return A?p(B,A):y(B)}function h(A,B){return B?t(A,B):w(A)}function s(D,A,C,B){return x(u(D,B),A,C)}function r(B,A,C){return h(v(B,A),C)}var i=[],l=i.concat,o=Object.keys||function(C){var B=[],A;for(A in C){C.hasOwnProperty(A)&&B.push(A)}return B},n=q.isArray||(function(B,C){C=B.call(i);return function A(D){return B.call(D)==C}}({}.toString)),z=i.map||function(E,D){for(var B=this,C=B.length,A=q(C);C--;A[C]=E.call(D,B[C],C,B)){}return A},p=m(k(y)),t=m(k(w)),x=j.stringify,v=j.parse;return{pack:u,parse:r,stringify:s,unpack:h}}(Array,JSON);
/*! (C) WebReflection Mit Style License */
(function(A){function G(h){return typeof h=="string"?A.document.createTextNode(h):h}function q(p){if(p.length===1){return G(p[0])}for(var o=A.document.createDocumentFragment(),h=y.call(p),l=0;l<p.length;l++){o.appendChild(G(h[l]))}return o}for(var j,x,H,m=/^\s+|\s+$/g,F=/\s+/,D=" ",z=function(h,i){return this.contains(h)?i||this.remove(h):i&&this.add(h),!!i},w=(A.Element||A.Node||A.HTMLElement).prototype,C=["prepend",function(){var h=this.firstChild,i=q(arguments);h?this.insertBefore(i,h):this.appendChild(i)},"append",function(){this.appendChild(q(arguments))},"before",function(){var h=this.parentNode;h&&h.insertBefore(q(arguments),this)},"after",function(){var l=this.parentNode,n=this.nextSibling,h=q(arguments);l&&(n?l.insertBefore(h,n):l.appendChild(h))},"replace",function(){var h=this.parentNode;h&&h.replaceChild(q(arguments),this)},"remove",function(){var h=this.parentNode;h&&h.removeChild(this)}],y=C.slice,k=C.length;k;k-=2){j=C[k-2],j in w||(w[j]=C[k-1])}"classList" in document.documentElement?(H=document.createElement("div").classList,H.add("a","b"),"a b"!=H&&(w=H.constructor.prototype,"add" in w||(w=A.DOMTokenList.prototype),x=function(h){return function(){var i=0;while(i<arguments.length){h.call(this,arguments[i++])}}},w.add=x(w.add),w.remove=x(w.remove),w.toggle=z)):(x=function(h){if(!h){throw"SyntaxError"}if(F.test(h)){throw"InvalidCharacterError"}return h},H=function(i){var h=i.className.replace(m,"");h.length&&C.push.apply(this,h.split(F)),this._=i},H.prototype={length:0,add:function(){for(var h=0,i;h<arguments.length;h++){i=arguments[h],this.contains(i)||C.push.call(this,j)}this._.className=""+this},contains:function(h){return function(i){return k=h.call(this,j=x(i)),-1<k}}([].indexOf||function(h){k=this.length;while(k--&&this[k]!==h){}return k}),item:function(h){return this[h]||null},remove:function(){for(var h=0,i;h<arguments.length;h++){i=arguments[h],this.contains(i)&&C.splice.call(this,k,1)}this._.className=""+this},toggle:z,toString:function E(){return C.join.call(this,D)}},(Object.defineProperty||function(i,h,l){i.__defineGetter__(h,l.get)})(w,"classList",{get:function(){return new H(this)},set:function(){}}));try{new A.CustomEvent("?")}catch(B){A.CustomEvent=function(l,h){function o(t,p){var r=document.createEvent(l);if(typeof t!="string"){throw new Error("An event name must be provided")}return l=="Event"&&(r.initCustomEvent=i),p==null&&(p=h),r.initCustomEvent(t,p.bubbles,p.cancelable,p.detail),r}function i(u,p,v,s){this.initEvent(u,p,v),this.detail=s}return o}(A.CustomEvent?"CustomEvent":"Event",{bubbles:!1,cancelable:!1,detail:null})}})(e);
/*! (C) Andrea Giammarchi Mit Style License */
(function(aa){function H(){return{l:{},m:[],b:[]}}function q(i){var h=H();return ac.value=h,O(i,Z,ac),ac.value=null,h}function B(i,h,k){typeof h=="function"?h.apply(i,k):h.handleEvent.apply(h,k)}function j(i,h,k){k!==void 0&&A(this,"detail",k),A(this,"type",h),A(this,"target",i),A(this,"timeStamp",R())}if(aa.eddy){return}aa.eddy=!0;var I=Array.prototype,Q=aa.prototype,M=j.prototype,W=Q.hasOwnProperty,J=I.push,P=I.slice,G=I.unshift,ae="toLocaleString",Z={toLocaleString:1}.propertyIsEnumerable(ae)?"_@eddy"+Math.random():ae,U=Z===ae,ac=(aa.create||aa)(null),X=[],O=U?function(i,h,k){i[h]=k.value}:aa.defineProperty,ab=function(i){var h=this;return function(){return h.apply(i,arguments)}},F=I.indexOf||function(i){var h=this.length;while(h--&&this[h]!==i){}return h},R=Date.now||function(){return(new Date).getTime()},Y={boundTo:function(k){var p=W.call(this,Z)?this[Z]:q(this),l=p.m,m=p.b,i=typeof k=="string"?this[k]:k,h=F.call(l,i);return h<0?m[J.call(l,i)-1]=ab.call(i,this):m[h]},emit:function(m){var w=W.call(this,Z),p=w&&this[Z].l,o=w&&W.call(p,m),k=o&&p[m],i=o&&P.call(arguments,1),h=0,v=o?k.length:h;while(h<v){B(this,k[h++],i)}return o},listeners:function(h){return W.call(this,Z)&&W.call(this[Z].l,h)&&this[Z].l[h].slice()||[]},off:function(i,p){var l=W.call(this,Z),k=l&&this[Z].l,m=l&&W.call(k,i)&&k[i],h;return m&&(h=F.call(m,p),-1<h&&(m.splice(h,1),m.length||delete k[i])),this},on:function(k,s,m){var p=W.call(this,Z),i=(p?this[Z]:q(this)).l,h=p&&W.call(i,k)?i[k]:i[k]=[];return F.call(h,s)<0&&(m?G:J).call(h,s),this},once:function(k,o,m){var h=function(i){l.off(k,h,m),B(l,o,arguments)},l=this;return l.on(k,h,m)},trigger:function(S,k){var T=W.call(this,Z),i=T&&this[Z].l,N=typeof S=="string",C=N?S:S.type,w=T&&W.call(i,C),y=w&&i[C].slice(0),h=N?new j(this,C,k):S,x=0,E=w?y.length:x,r=!(h instanceof j);r&&(h._active=!0,h.stopImmediatePropagation=M.stopImmediatePropagation),h.currentTarget=this,X[0]=h;while(h._active&&x<E){B(this,y[x++],X)}return r&&(delete h._active,delete h.stopImmediatePropagation),!h.defaultPrevented}},A=function(i,h,k){W.call(i,h)||(i[h]=k)},ad=!1,D;M.defaultPrevented=!1,M._active=M.cancelable=!0,M.preventDefault=function(){this.defaultPrevented=!0},M.stopImmediatePropagation=function(){this._active=!1};for(D in Y){W.call(Y,D)&&O(Q,D,{enumerable:!1,configurable:!0,writable:!0,value:Y[D]})}(function(i){function k(l){function m(n){n[l].apply(n,this)}return function(){return i.call(this,m,arguments),this}}for(var h in Y){Y.hasOwnProperty(h)&&!/^listeners|boundTo$/.test(h)&&O(I,h,{enumerable:!1,configurable:!0,writable:!0,value:k(h)})}})(I.forEach);var z={boundTo:Y.boundTo,data:function V(k,h){var l="dataset" in this,i;return arguments.length<2?l?k in this.dataset?this.dataset[k]:i:(h=this.getAttribute("data-"+k.replace(V.gre||(V.gre=/-[a-z]/g),V.gplace||(V.gplace=function(n,m){return m.toUpperCase()}))))==null?i:h:l?h==null?delete this.dataset[k]:(this.dataset[k]=h,h):(V.sre||(V.sre=/([a-z])([A-Z])/g,V.splace=function(o,m,p){return m+"-"+p.toLowerCase()}),k="data-"+k.replace(V.sre,V.splace),h==null?!this.removeAttribute(k):(this.setAttribute(k,h),h))},emit:function(i){var h=new CustomEvent(i);return h.arguments=I.slice.call(arguments,1),this.dispatchEvent(h)},listeners:function(h){return[]},off:function(i,h,k){return this.removeEventListener(i,h,k),this},on:function(i,h,k){return this.addEventListener(i,h,k),this},once:Y.once,trigger:function(k,o){var m=typeof k=="string",h=m?k:k.type,l=m?new CustomEvent(h,(ac.detail=o,ac)):k;return ac.detail=null,j.call(l,this,h),this.dispatchEvent(l)}};ac.cancelable=!0,ac.bubbles=!0;try{document.createEvent("Event").target=document}catch(K){ad=!0,A=function(k,h,l){if(!W.call(k,h)){try{k[h]=l}catch(i){}}}}(function(p){var k=p.Window,w=k?k.prototype:p,m=(p.Node||p.Element||p.HTMLElement).prototype,l=(p.Document||p.HTMLDocument).prototype,v=(p.XMLHttpRequest||function(){}).prototype,i,h;for(i in z){W.call(z,i)&&(h={enumerable:!1,configurable:!0,writable:!0,value:z[i]},O(m,i,h),i!=="data"&&(O(w,i,h),O(l,i,h),O(v,i,h)))}})(e)})(Object);e.$=function(h){return function(j,i){return h.slice.call(h.concat(i||document)[0].querySelectorAll(j))}}([]);
/*! SimpleKinetic v0.1.1 - MIT license */
;var b=function(i){var q=i.isNaN,j=i.Math,x=j.abs,w=j.round,t=j.sqrt,p=i.setInterval,u=i.clearInterval,l=0.2,v=9,r=1000/60,o=k.prototype;function k(y){for(var z in y){if(/^on|context|interval/.test(z)){this[z]=y[z]}}}o.init=function(O,N,E,C,H,F){var P=n(this),D=(x(E)<1?0:E)*(H?1:v),J=(x(C)<1?0:C)*(F?1:v),B=D*D,I=J*J,A=t(B+I),z=D/A,G=J/A,M,K;P.cancel(P._cx,P._cy);if(!(q(z)||q(G))){P._a=p(m,P.interval||r,P);P._t=0;P._d=A;P._sx=P._cx=O;P._sy=P._cy=N;P._xa=z;P._ya=G;M=w(O+A*z);K=w(N+A*G);P._ex=M;P._ey=K;if((O!==M||N!==K)&&P.start(O,N,0,0,M,K)!==false){return true}n(P._a)}return false};o.start=s("start");o.move=s("move");o.end=s("end");o.cancel=function(A,y,B,z,D,C){if(this._a){n(this).oncancel.call(this.context||this,A,y,B,z,D,C)}};o.onstart=o.onmove=o.onend=o.oncancel=function(A,y,B,z,D,C){};function n(y){u(y._a);y._a=0;return y}function s(y){y="on"+y;return function(B,z,C,A,E,D){return this[y].call(this.context||this,B,z,C,A,E,D)}}function m(A){var F=(A._t+=(A._d-A._t)*l),z=w(A._sx+F*A._xa),G=w(A._sy+F*A._ya),E=A._ex,C=A._ey,D=z-A._cx,B=G-A._cy;if(z===E&&G===C){n(A).end(E,C,D,B,E,C)}else{A.move(z,G,D,B,E,C);A._cx=z;A._cy=G}}var h=p(function(y){u(h);if(!y){p=function(B,A,z){return i.setInterval(function(){B(z)},A)}}},0,1);return k}(this);function a(j,q,h,n){
/*! (C) equolo.org */
;var k=192,m=q/k,o=h||"#286868",i=j.getContext("2d");function p(r,s){i.moveTo(r*m,s*m)}function l(s,r,w,v,u,t){i.bezierCurveTo(s*m,r*m,w*m,v*m,u*m,t*m)}i.clearRect(0,0,j.width,j.height);j.width=j.height=q;if(n){i.fillStyle=n;i.fillRect(0,0,q,q)}i.fillStyle=o;i.save();i.scale(1.25,1.25);i.beginPath();p(95.32+10,10.21);l(101.05+10,7.85,108.56+10,12.68,108.09+10,19.01);l(108.39+10,25.61,100.46+10,30.49,94.67+10,27.28);l(87.81+10,24.1,88.04+10,12.79,95.32+10,10.21);i.closePath();i.fill();i.beginPath();p(67.01+10,7.48);l(72.33+10,20.59,82.54+10,31.7,95.46+10,37.57);l(104.17+10,41.72,113.89+10,43.25,123.47+10,43.1);l(108.12+10,48.29,96.34+10,60.6,88.32+10,74.31);l(79.91+10,88.85,78.34+10,106.86,83.29+10,122.84);l(72.84+10,106.64,59.08+10,91.84,41.39+10,83.57);l(30.55+10,78.74,18.41+10,76.4,6.58+10,77.64);l(24.52+10,73.08,42.99+10,65.59,54.74+10,50.61);l(64.15+10,38.49,68.55+10,22.74,67.01+10,7.48);i.closePath();i.fill();i.beginPath();p(43.22+10,119.97);l(43.75+10,102.87,43.89+10,94.92,48.72+10,89.2);l(50.5+10,93.22,49.73+10,97.67,50.54+10,101.88);l(51.34+10,107.31,53.13+10,112.93,57.29+10,116.73);l(61.3+10,121.01,68.71+10,121.41,70.94+10,127.44);l(72.27+10,133.19,66.42+10,138.03,61.08+10,138.09);l(54.7+10,138.64,49.47+10,133.66,46.69+10,128.39);l(43.41+10,122.84,43.52+10,116.2,43.22+10,109.97);i.closePath();i.fill();i.restore();return j}var g=function(i){var j=i.getContext("2d"),m={question:61736,"shopping-cart":61562,gift:61547,cutlery:61685,home:61461,glass:61440,briefcase:61617,group:61632,truck:61649,umbrella:61673},h={};function l(p,s,q){j.beginPath();j.arc(p,s,q,0,Math.PI*2,true);j.closePath();j.fill()}function k(q,p){j.clearRect(0,0,i.width,i.height);i.width=i.height=p;j.textBaseline="bottom";j.fillStyle="rgb(25,138,138)";l(p/2,p/2.5,p/2.5);n(p,p/4.9);j.fillStyle="rgb(240,240,240)";l(p/2,p/2.5,p/2.8);j.font=j.mozTextStyle=Math.round(p/2)+"px FontAwesome";j.translate((i.width-(j.measureText||j.mozMeasureText).call(j,q).width)/2,0);j.fillStyle="rgb(40,104,104)";if(q.length){j.fillText(q,0,p/1.5)}else{j.drawImage(a(document.createElement("canvas"),p/1.5),-p/2.8,p/10)}return i.toDataURL()}function n(p,q){j.beginPath();j.moveTo(p/2,p);j.lineTo(q,p/1.5);j.lineTo(p-q,p/1.5);j.lineTo(p/2,p);j.closePath();j.fill()}return function o(r,p,q){return h[r+p+q]||(h[r+p+q]=k(m.hasOwnProperty(r)?String.fromCharCode(m[r]):"",Math.round(p*(q||(typeof f==="undefined"?1:f.ratio)))))}}(document.createElement("canvas"));document.once("DOMContentLoaded",function(){var o=/^[^@]+?@[^\1@]+\.([a-zA-Z]{2,})$/,y=/^-?\d+(?:\.\d+)?$/,k=0,M=0,s="_JSONP",r=$("fieldset#step-4 fieldset.address > legend > i")[0],j={no:"fa-angle-down",ok:"fa-check",error:"fa-exclamation-triangle",searching:"fa fa-refresh fa-spin"},D={},B={handleEvent:function(X){var W=X.type,V;if("_type" in this){V=this._type+"-terminate";if(V in this){this[V](X)}}this._type=W;V=W+"-init";if(V in this){this[V](X)}F.enable($("fieldset#"+W)[0]);this[W](X)},"step-1":function(X){var W=$("fieldset#"+X.type)[0],V=$("select",W);V.once("change",function(){location.href=location.href.split(/[\?#]/)[0]+"?lang="+this.value});this.trigger("step-2");$("a").forEach(function(Y){if(-1<Y.href.indexOf("/categories")){Y.target="_blank"}})},"step-2":function(X){var W=$("fieldset#"+X.type)[0],V=$("input",W)[0];this.on("email:verified",P);V.on("keyup",this.boundTo(R));V.emit("keyup")},"step-3":function(ag){var al=ag.detail,aj=$("fieldset"),ah=$("fieldset#"+ag.type)[0],W=$("select[name=activity]",ah)[0],ad=$("button[name=add]",ah)[0],ak=$("button[name=remove]",ah)[0],ae=$("button.next",ah)[0],an=$("input[name=name]",ah)[0],af=$("textarea[name=description]",ah)[0],am=$("select[name=lang]",ah)[0],Z=$("div.lang > p > span",ah)[0],aa=$("ul",ah)[0],ac=$("div.criteria input",ah),X=ac.shift(),Y=ac.shift(),V=function(ap){var ao=aa.appendChild(document.createElement("li")),aq=ao.appendChild(document.createElement("strong"));aq.append("√");ao.append(aq);ao.append(" "+H(am,ap))},ab=function(){ak.disabled=W.options.length<2;ae.disabled=ad.disabled=!(af.value&&an.value&&(n(X)||3<ac.filter(n).length));if(ae.disabled){if(this.hasOwnProperty("map")){aj.slice(aj.indexOf(ah)+1).forEach(F.disable)}}else{ae.emit("click")}}.bind(this),ai;Z.innerHTML=140;an.value=af.value=W.innerHTML=aa.innerHTML="";W.on("change",this.onActivityChange||(this.onActivityChange=function(){al.currentActivity=this.value;ag.currentTarget.trigger(ag)}));an.on("keyup",this.onNameChange||(this.onNameChange=function(ap){var aq=an.value.trim(),ao=W.options[W.selectedIndex];h(al).name=aq;if(aq){ao.value=al.currentActivity;ao.innerHTML="";ao.append(aq)}ab()}));af.on("keyup",this.onDescriptionChange||(this.onDescriptionChange=function(at){var aq=af.value.trim(),ap=parseInt(af.getAttribute("maxlength"),10),ar=(ap-aq.length),ao;if(ar<0){ar=0;af.value=aq.slice(0,ap)}Z.innerHTML=ar;ao=h(al).description;if(!(am.value in ao)){V(am.value)}ao[am.value]=aq;if(!aq.length){delete ao[am.value];aa.innerHTML="";Object.keys(ao).forEach(V)}ab()}));am.on("change",this.onLanguageDescriptionChange||(this.onLanguageDescriptionChange=function(ap){var ao=h(al).description;af.value=ao[am.value]||"";af.emit("keyup")}));al.activities.forEach(function(ar,ap){if(/^remove:/.test(ar.id)){return}var aq=W.appendChild(document.createElement("option")),ao;aq.value=ar.id;aq.append(ar.name);if(!al.hasOwnProperty("currentActivity")||ar.id==al.currentActivity){al.currentActivity=ar.id;aq.selected="selected";an.value=ar.name;ao=Object.keys(ar.description);ao.forEach.call(am.options,m,ao[0]);ao.forEach(V);af.value=ar.description[am.value]||"";af.emit("keyup")}},this);ad.on("click",this.onAnotherActivity||(this.onAnotherActivity=function(ar){var ao=W.options,aq=!ao.length;al.currentActivity=null;W.appendChild(document.createElement("option")).append(" - ");W.disabled=aq;an.value=af.value="";af.emit("keyup");try{an.focus()}catch(ap){}ac.concat(Y,X).forEach(function(at){at.checked=false});W.selectedIndex=ao.length-1}));ak.on("click",this.onRemoveActivity||(this.onRemoveActivity=function(ao){al.currentActivity=null;Q(al.activities,W)}));ac.on("change",this.onCriteriaChange||(this.onCriteriaChange=function(){ac.forEach(O,h(al).criteria=[]);ab()}));ai=al.currentActivity?h(al):{criteria:[],certification:[]};ac.forEach(function(ao){ao.checked=-1<this.criteria.indexOf(ao.value);ao.parentNode.on("click",K)},ai);Y.checked=0<ai.criteria.length;X.checked=0<ai.certification.length;Y.on("change",this.enableAddRemoveButtons||(this.enableAddRemoveButtons=function(){if(Y.checked){h(al).certification=[]}ab()}));X.on("change",this.onCertifiedEnabled||(this.onCertifiedEnabled=function(){if(X.checked){h(al).certification=[1]}ab()}));ae.on("click",this.onNextActivity||(this.onNextActivity=function(ao){h(al).currentPlace=null;this.trigger("step-4",al)}.bind(this)));ab();if(ad.disabled&&ak.disabled){ad.emit("click")}},"step-4":function(ai){var an=ai.detail,W=h(an),X=W.currentPlace||!W.place.length?T(W):W.place[0],aj=$("fieldset#"+ai.type)[0],ah=$("i",aj)[0],Y=$("select[name=place]",aj)[0],aa=$("button[name=add]",aj)[0],am=$("button[name=remove]",aj)[0],ad=$("button.next",aj)[0],ae=$("select[name=category]",aj)[0],V=$("div.map > button",aj)[0],ac=$("div.fields > input",aj),al=[ac[0],ac[2],ac[3],ac[4],ac[5],ac[6]],Z=[ac[0],ac[2]],ab=function(){ad.disabled=aa.disabled=(X.latitude==null&&ah.value!="question");am.disabled=Y.options.length<2};r.className=j.no;W.currentPlace=X.id;this.hasExplicitPlace=false;$("fieldset",aj).forEach(F.enable);if(!this.hasOwnProperty("map")){L.tileLayer("http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg",{attribution:"Map Tiles &copy; Open MapQuest",maxZoom:18}).addTo(this.map=L.map("map"));this.setMapView=function ag(ap,ao){this.map.setView([ap.latitude||ap.lat,ap.longitude||ap.lng],ao||Math.max(14,this.map.getZoom()))};this.setPlaceView=function ak(ao){this.dropMarker();this.marker=L.marker([ao.latitude||ao.lat,ao.longitude||ao.lng],{icon:L.icon({iconUrl:g(ae.value,36),iconSize:[36,36]})}).addTo(this.map);this.setMapView(ao);ab()};this.dropMarker=function(){if(this.marker){this.map.removeLayer(this.marker);this.marker=null}};this.setMapView(navigator.country.geo,5);Y.on("change",function(){h(an).currentPlace=this.value;ai.currentTarget.trigger(ai)});aa.on("click",function(){var ar=h(an),ap=Y.options,ao=(ar.currentPlace=null)||T(ar),aq=Y.appendChild(document.createElement("option"));aq.append(" - ");aq.value=ao.id;Y.selectedIndex=ap.length-1;Y.emit("change")});am.on("click",function(){var ao=h(an);ao.currentPlace=null;Q(ao.place,Y)});ae.on("change",this.onCategoryChange||(this.onCategoryChange=function(ao){ah.className="fa-"+ae.value;T(h(an)).icon=ae.value;if(this.marker){this.setPlaceView(this.marker.getLatLng())}}.bind(this)));ad.on("click",this.boundTo(function(){var ao=E(an);if(ao===true){this.trigger("step-5",an)}else{x(ao)}}));al.on("keyup",function(ao){if(!this.hasExplicitPlace){clearTimeout(this.findPlaceTimer||0);this.findPlaceTimer=setTimeout(this.boundTo(t),1000,al)}}.bind(this));this.on("search:place",function(ao){if(!this.hasExplicitPlace){this.setPlaceView(I(T(h(an)),ac,ao.detail))}});$("#map").on("contextmenu",function af(ao){ao.preventDefault();ao.stopPropagation();if(this.hasExplicitPlace){S.address="";r.className=j.no;this.hasExplicitPlace=false;this.dropMarker()}else{if(this.askedUserIfPutAPlaceOnMap||confirm(jslang.pinit)){this.hasExplicitPlace=this.askedUserIfPutAPlaceOnMap=true;ao=this.map.containerPointToLatLng(this.map.mouseEventToContainerPoint(ao));if(!(isNaN(ao.lat)||isNaN(ao.lng))){this.setPlaceView(I(T(h(an)),ac,{latitude:ao.lat,longitude:ao.lng}));r.className=j.ok}}}}.bind(this));V.on("click",function(){V.disabled=true;try{navigator.geolocation.getCurrentPosition(function aq(ar){this.setView([ar.coords.latitude,ar.coords.longitude],Math.max(14,this.getZoom()));V.disabled=false}.bind(this),function ao(){V.disabled=false},{maximumAge:600000})}catch(ap){}}.bind(this.map));Z.on("keyup",function(){var ao=Y.options[Y.selectedIndex];ao.innerHTML="";ao.append(Z.map(l).join(" - "))})}this.dropMarker();while(Y.options.length){Y.options[0].remove()}W.place.forEach(function(ao,ap){if(/^remove:/.test(ao.id)){return}var aq=Y.appendChild(document.createElement("option"));aq.value=ao.id;aq.append(ao.address+" - "+ao.postcode);if(ao.id==W.currentPlace){aq.selected="selected";Y.selectedIndex=ap}});ac.forEach(function(ao){var ap=X&&X[ao.name]||"";if(ap.length&&ao.name==="twitter"){ap="@"+ap}ao.value=ap});ac.on("keyup",q);q.target=X;w(ae,X.icon||ae.options[0].value,ah);ab();if(X.latitude!=null){this.setPlaceView(X)}Y.disabled=Y.options.length<2},"step-5":function(Z){var V=Z.detail,Y=$("fieldset#"+Z.type)[0],W=$("div",Y)[0],aa=$("input[type=checkbox]",Y)[0],X=$("input[type=submit]",Y)[0];X.disabled=true;aa.on("change",this.onAgreement||(this.onAgreement=function(){X.disabled=!this.checked}));X.on("click",this.onSaveAllTheData||(this.onSaveAllTheData=function(){var ab=E(V),ad,ac;if(ab===true){X.disabled=true;ad=JSON.parse(JSON.stringify(V));delete ad.currentActivity;ad.activities.forEach(C);ac=new XMLHttpRequest;ac.open("POST","cgi/create.php",true);ac.setRequestHeader("If-Modified-Since","Mon, 26 Jul 1997 05:00:00 GMT");ac.setRequestHeader("Cache-Control","no-cache");ac.setRequestHeader("X-Requested-With","XMLHttpRequest");ac.setRequestHeader("Content-Type","application/x-www-form-urlencoded");ac.on("readystatechange",function(){if(ac.readyState==4){$("fieldset").forEach(F.enable);switch(ac.responseText){case"OK":alert([jslang.everythingOK].concat(V.firstTimeInHere?jslang.oneStepLeft:[]).join("\n"));return V.firstTimeInHere?(location.href="http://equolo.org/"):location.reload();case"bad-data":alert("bad data");break;default:alert(ac.responseText||"connection error");break}X.disabled=false}});ac.send("info="+encodeURIComponent(JSON.stringify(ad)))}else{x(ab)}}))}},J=["mousedown","mousemove","mouseup","click"],F={disable:function(V){V.classList.add("disabled");J.forEach(F._addStopEvent,V)},enable:function(V){V.classList.remove("disabled");J.forEach(F._removeStopEvent,V)},_addStopEvent:function(V){this.on(V,u,true)},_removeStopEvent:function(V){this.off(V,u,true)}};function u(V){V.preventDefault();(V.stopImmediatePropagation||V.stopPropagation).call(V)}function G(V){V.place=d.unpack(V.place)}function p(V,W){var Y=W.value.trim().toLowerCase(),X=W.data("email"),Z;if(o.test(Y)&&Y!==X){W.data("email",Y);V.xhr=Z=new XMLHttpRequest;Z.target=V;Z.open("get","cgi/verify.php?email="+encodeURIComponent(Y),true);Z.on("readystatechange",v).send(null);D.email=Y}}function P(W){var V=W.detail;D.currentActivity=null;if(V==null){D.activities=[];D.firstTimeInHere=true}else{if(typeof V=="object"){D.activities=V;if(D.activities.length){D.activities.forEach(G);D.currentActivity=D.activities[0].id}}else{alert(jslang.pleaseConfirmFirst);return(location.href="http://equolo.org/")}}this.trigger("step-3",D)}function R(X){var V=X.currentTarget;D.email=null;try{this.xhr.abort()}catch(W){}clearTimeout(parseInt(V.data("timer")||0,10));if(o.test(V.value.trim())){V.data("timer",setTimeout(p,1000,this,V))}else{while(V=V.parentNode){if(V.nodeName==="FIELDSET"){$("fieldset").slice($("fieldset").indexOf(V)+1).forEach(F.disable);break}}}}function v(){if(this.readyState===4){this.target.trigger("email:verified",JSON.parse(this.responseText))}}function i(Y,Z){for(var W=0,X=Y.length,V;W<X;W++){V=Y[W];if(V.id==Z){return V}}}function H(Y,X){for(var V=Y.options,W=0;W<V.length;W++){if(V[W].value==X){return V[W].innerHTML}}}function h(V){if(!V.currentActivity){V.activities.push({id:(V.currentActivity="new:".concat(++k)),name:"",description:{},criteria:[],certification:[],place:[]})}return i(V.activities,V.currentActivity)}function n(V){return V.checked}function K(V){if(V.target==this){this.firstChild.checked=!this.firstChild.checked;this.firstChild.emit("change")}}function Q(X,V){var W=i(X,V.value);if(/^new:/.test(W.id)){X.splice(X.indexOf(W),1)}else{if(!/^remove:/.test(W.id)){W.id="remove:"+W.id}}V.options[V.selectedIndex--].remove();V.emit("change")}function m(V){V.selected=V.value==this?"selected":""}function O(V){if(V.checked){this.push(V.value)}}function w(V,Z,Y){for(var W=V.options,X=W.length;X--;){if(W[X].value==Z){V.selectedIndex=X;W[X].selected=true;Y.className="fa-"+Z}else{W[X].selected=false}}}function z(V){if(V&&V.length){r.className=j.ok;this.trigger("search:place",{latitude:V[0].lat,longitude:V[0].lon})}else{if(/^[0-9][\w-]*|[0-9][\w-]*$/.test(S.fields[0])){S.fields[0]=S.fields[0].replace(RegExp.lastMatch,"").replace(/[,;]/,"").trim();S.call(this,S.fields)}else{r.className=j.error}}}function S(V,Y){var W=V.join(", "),X,Z;if(S.address!=W){S.address=W;S.fields=V;Z=M++;while(Z--){e[s+Z]=Object}e[s+M]=this.boundTo(z);X=document.body.appendChild(document.createElement("script"));X.on("load",X.remove).on("error",X.remove);X.type="text/javascript";X.src="http://nominatim.openstreetmap.org/search?format=json&json_callback="+s+M+"&q="+encodeURIComponent(W)}else{r.className=this.marker?j.ok:j.error}}function t(V){var W=V.map(l).filter(U);if(2<W.length){r.className=j.searching;S.call(this,W)}}function T(V){if(!V.currentPlace){V.place.push({id:(V.currentPlace="new:".concat(++k)),icon:"",latitude:null,longitude:null,address:"",extra:"",postcode:"",city:"",county:"",state:"",country:"",email:"",phone:"",website:"",twitter:"",gplus:"",facebook:""})}return i(V.place,V.currentPlace)}function U(V){return 0<V.length}function l(V){return V.value.trim()}function x(V){alert(["uhm, something does not seem right","----------------------------------",V.join("\n"),"----------------------------------","it looks like something is wrong with the data","please verify the following:","  1. every activity has at least one place","  2. there are no places without a location","  3. every place has at least 4 address fields","  4. every place has a specific icon"].join("\n"))}function q(W){var V=W.currentTarget;q.target[V.name]=V.value}function I(W,V,Y){var X=V.length;W.latitude=V[X-2].value=Y.latitude;W.longitude=V[X-1].value=Y.longitude;return W}function E(W){var V=[];if(!o.test(W.email)){return V.push("wrong email address")&&V}return W.activities.every(A,V)||V.reverse()}function A(X,W,V){return(X.name.trim().length&&(V=Object.keys(X.description))&&V.length&&X.description[V[0]].trim().length&&(X.certification.length||3<X.criteria.length)&&((!X.place.length&&/^remove:/.test(X.id))||(X.place.length&&X.place.every(N,this)))&&!!X.id)||!this.push("[activity] "+(X.name||"?"))}function N(V){return(y.test(V.latitude)&&y.test(V.longitude)&&V.address.trim().length&&2<(V.postcode.trim().length+V.city.trim().length+V.county.trim().length+V.state.trim().length+V.country.trim().length)&&V.icon&&V.icon!="question"&&!!V.id)||!this.push("  "+(V.address||"?")+" - "+(V.postcode||"?"))}function C(V){V.place=d.pack(V.place);delete V.currentPlace}Object.keys(B).forEach(function(V){if(V!=="handleEvent"){this.on(V,this)}},B);$("fieldset").forEach(F.disable);B.trigger("step-1")})}(this));