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
IE9Mobile&&document.write('<link rel="stylesheet" href="css/IE9Mobile.css"/><script src="js/IE9Mobile.js"></script>');(function(g){
/*! display v0.1.6 - MIT license */
;var k=function(B){var r=B.Math,v=r.abs,D=r.max,A=r.min,H=B.Infinity,p=B.screen||H,o=B.matchMedia,w="addEventListener",G=B.document.documentElement,s=/\bMobile\b/.test(navigator.userAgent),x={change:[]},C={width:0,height:0,ratio:0,on:function(I,J){x[I].push(J)}},E=x.change.forEach||function(K,I){for(var J=0;J<this.length;J++){K.call(I,this[J],J,this)}},t;function u(I){I.call(C,C.width,C.height)}function z(I){if(t){clearTimeout(t);t=0}return(!y()&&innerHeight<300)||(t=setTimeout(q,300,I))}function y(){return"orientation" in B?v(B.orientation||0)===90:!!o&&o("(orientation:landscape)").matches}function q(O){t=0;var J=B.devicePixelRatio||1,P=y(),K=p.width,N=p.height,M=A(B.innerWidth||G.clientWidth,J<1?H:((s&&P?D(K,N):K)||H)),I=A(B.innerHeight||G.clientHeight,J<1?H:((s&&P?A(K,N):N)||H));if(M!==C.width||I!==C.height){C.width=M;C.height=I;E.call(x.change,u)}}if(w in B){B[w]("orientationchange",z,true);B[w]("resize",z,true);try{p[w]("orientationchange",z,true)}catch(F){}}else{B.attachEvent("onresize",q)}q.call(B);C.ratio=B.devicePixelRatio||p.width/C.width||(p.deviceXDPI||1)/(p.logicalXDPI||1);return C}(g);function n(x,u){
/*! (C) Andrea Giammarchi - Mit Style License */
;if(!u){u=document}u.getElementsByTagName("head")[0].appendChild(u.createElement("style")).appendChild(u.createTextNode(""));var w=u.styleSheets,t=w[w.length-1],y=t.addRule||function(z,B,A){this.insertRule(z+"{"+B+"}",A)},p=0,o,r,v,s,q;for(o in x){if(x.hasOwnProperty(o)){q=[];r=x[o];for(v in r){if(r.hasOwnProperty(v)){s=r[v];q.push("-webkit-"+v+":"+s,"-khtml-"+v+":"+s,"-blink-"+v+":"+s,"-moz-"+v+":"+s,"-ms-"+v+":"+s,"-o-"+v+":"+s,v+":"+s)}}y.call(t,o,q.join(";")+";",p++)}}}(function(q,o,p){"indexOf" in q||(q.indexOf=function(r){for(var s=this.length;s--&&this[s]!==r;){}return s});"bind" in o||(o.bind=function(v){var u=this,t=q.slice,r=t.call(arguments,1);return function(){return u.apply(v,r.concat(t.call(arguments)))}});"trim" in p||(p.trim=function(){return this.replace(/^[^\S]+|[^\S]+$/g,"")})}(Array.prototype,Function.prototype,String.prototype));var m,b=m=function(x,q){function F(O){for(var I=O.length,P=v(I?O[0]:{}),J=P.length,Q=x(I*J),N=0,M=0,K,H;N<I;++N){for(H=O[N],K=0;K<J;Q[M++]=H[P[K++]]){}}return s.call([J],P,Q)}function D(M){for(var N=M.length,I=M[0],H=x(((N-I-1)/I)||0),K=1+I,J=0,P,O;K<N;){for(H[J++]=(O={}),P=0;P<I;O[M[++P]]=M[K++]){}}return H}function r(I){return function H(P){for(var R=this,Q=P,N=0,O=R.length,K,J,M;N<O;++N){if(u(M=Q[J=R[N]])){K=N+1;Q[J]=K<O?G.call(M,I,R.slice(K)):I(M)}Q=Q[J]}return P}}function t(I){return function H(Q,O){for(var K=u(Q),J=s.call(p,Q),P=s.call(p,O),M=0,N=P.length;M<N;++M){J=G.call(J,I,P[M].split("."))}return K?J:J[0]}}function B(I,H){return H?w(I,H):F(I)}function o(H,I){return I?A(H,I):D(H)}function z(K,H,J,I){return E(B(K,I),H,J)}function y(I,H,J){return o(C(I,H),J)}var p=[],s=p.concat,v=Object.keys||function(J){var I=[],H;for(H in J){J.hasOwnProperty(H)&&I.push(H)}return I},u=x.isArray||(function(I,J){J=I.call(p);return function H(K){return I.call(K)==J}}({}.toString)),G=p.map||function(M,K){for(var I=this,J=I.length,H=x(J);J--;H[J]=M.call(K,I[J],J,I)){}return H},w=t(r(F)),A=t(r(D)),E=q.stringify,C=q.parse;return{pack:B,parse:y,stringify:z,unpack:o}}(Array,JSON);
/*! (C) WebReflection Mit Style License */
(function(D){function J(o){return typeof o=="string"?D.document.createTextNode(o):o}function y(u){if(u.length===1){return J(u[0])}for(var t=D.document.createDocumentFragment(),o=B.call(u),p=0;p<u.length;p++){t.appendChild(J(o[p]))}return t}for(var q,A,K,x=/^\s+|\s+$/g,I=/\s+/,G=" ",C=function(o,p){return this.contains(o)?p||this.remove(o):p&&this.add(o),!!p},z=(D.Element||D.Node||D.HTMLElement).prototype,F=["prepend",function(){var o=this.firstChild,p=y(arguments);o?this.insertBefore(p,o):this.appendChild(p)},"append",function(){this.appendChild(y(arguments))},"before",function(){var o=this.parentNode;o&&o.insertBefore(y(arguments),this)},"after",function(){var p=this.parentNode,s=this.nextSibling,o=y(arguments);p&&(s?p.insertBefore(o,s):p.appendChild(o))},"replace",function(){var o=this.parentNode;o&&o.replaceChild(y(arguments),this)},"remove",function(){var o=this.parentNode;o&&o.removeChild(this)}],B=F.slice,w=F.length;w;w-=2){q=F[w-2],q in z||(z[q]=F[w-1])}"classList" in document.documentElement?(K=document.createElement("div").classList,K.add("a","b"),"a b"!=K&&(z=K.constructor.prototype,"add" in z||(z=D.DOMTokenList.prototype),A=function(o){return function(){var p=0;while(p<arguments.length){o.call(this,arguments[p++])}}},z.add=A(z.add),z.remove=A(z.remove),z.toggle=C)):(A=function(o){if(!o){throw"SyntaxError"}if(I.test(o)){throw"InvalidCharacterError"}return o},K=function(p){var o=p.className.replace(x,"");o.length&&F.push.apply(this,o.split(I)),this._=p},K.prototype={length:0,add:function(){for(var o=0,p;o<arguments.length;o++){p=arguments[o],this.contains(p)||F.push.call(this,q)}this._.className=""+this},contains:function(o){return function(p){return w=o.call(this,q=A(p)),-1<w}}([].indexOf||function(o){w=this.length;while(w--&&this[w]!==o){}return w}),item:function(o){return this[o]||null},remove:function(){for(var o=0,p;o<arguments.length;o++){p=arguments[o],this.contains(p)&&F.splice.call(this,w,1)}this._.className=""+this},toggle:C,toString:function H(){return F.join.call(this,G)}},(Object.defineProperty||function(p,o,r){p.__defineGetter__(o,r.get)})(z,"classList",{get:function(){return new K(this)},set:function(){}}));try{new D.CustomEvent("?")}catch(E){D.CustomEvent=function(s,o){function u(v,r){var t=document.createEvent(s);if(typeof v!="string"){throw new Error("An event name must be provided")}return s=="Event"&&(t.initCustomEvent=p),r==null&&(r=o),t.initCustomEvent(v,r.bubbles,r.cancelable,r.detail),t}function p(N,v,O,M){this.initEvent(N,v,O),this.detail=M}return u}(D.CustomEvent?"CustomEvent":"Event",{bubbles:!1,cancelable:!1,detail:null})}})(g);
/*! (C) Andrea Giammarchi Mit Style License */
(function(ab){function I(){return{l:{},m:[],b:[]}}function z(p){var o=I();return ad.value=o,P(p,aa,ad),ad.value=null,o}function D(p,o,r){typeof o=="function"?o.apply(p,r):o.handleEvent.apply(o,r)}function q(p,o,r){r&&B(this,"detail",r),B(this,"type",o),B(this,"target",p),B(this,"timeStamp",U())}if(ab.eddy){return}ab.eddy=!0;var J=Array.prototype,R=ab.prototype,O=q.prototype,X=R.hasOwnProperty,K=J.push,Q=J.slice,H=J.unshift,af="toLocaleString",aa={toLocaleString:1}.propertyIsEnumerable(af)?"_@eddy"+Math.random():af,V=aa===af,ad=(ab.create||ab)(null),Y=[],P=V?function(p,o,r){p[o]=r.value}:ab.defineProperty,ac=function(p){var o=this;return function(){return o.apply(p,arguments)}},G=J.indexOf||function(p){var o=this.length;while(o--&&this[o]!==p){}return o},U=Date.now||function(){return(new Date).getTime()},Z={boundTo:function(v){var y=X.call(this,aa)?this[aa]:z(this),w=y.m,x=y.b,s=typeof v=="string"?this[v]:v,p=G.call(w,s);return p<0?x[K.call(w,s)-1]=ac.call(s,this):x[p]},emit:function(w){var E=X.call(this,aa),y=E&&this[aa].l,x=E&&X.call(y,w),v=x&&y[w],p=x&&Q.call(arguments,1),o=0,C=x?v.length:o;while(o<C){D(this,v[o++],p)}return x},listeners:function(o){return X.call(this,aa)&&X.call(this[aa].l,o)&&this[aa].l[o].slice()||[]},off:function(v,C){var x=X.call(this,aa),w=x&&this[aa].l,y=x&&X.call(w,v)&&w[v],p;return y&&(p=G.call(y,C),-1<p&&(y.splice(p,1),y.length||delete w[v])),this},on:function(u,x,v){var w=X.call(this,aa),s=(w?this[aa]:z(this)).l,p=w&&X.call(s,u)?s[u]:s[u]=[];return G.call(p,x)<0&&(v?H:K).call(p,x),this},once:function(p,w,v){var o=function(r){u.off(p,o,v),D(u,w,arguments)},u=this;return u.on(p,o,v)},trigger:function(ah,x){var ai=X.call(this,aa),w=ai&&this[aa].l,ag=typeof ah=="string",S=ag?ah:ah.type,C=ai&&X.call(w,S),N=C&&w[S].slice(0),r=ag?new q(this,S,x):ah,E=0,T=C?N.length:E,y=!(r instanceof q);y&&(r._active=!0,r.stopImmediatePropagation=O.stopImmediatePropagation),r.currentTarget=this,Y[0]=r;while(r._active&&E<T){D(this,N[E++],Y)}return y&&(delete r._active,delete r.stopImmediatePropagation),!r.defaultPrevented}},B=function(p,o,r){X.call(p,o)||(p[o]=r)},ae=!1,F;O.defaultPrevented=!1,O._active=O.cancelable=!0,O.preventDefault=function(){this.defaultPrevented=!0},O.stopImmediatePropagation=function(){this._active=!1};for(F in Z){X.call(Z,F)&&P(R,F,{enumerable:!1,configurable:!0,writable:!0,value:Z[F]})}(function(p){function s(r){function u(t){t[r].apply(t,this)}return function(){return p.call(this,u,arguments),this}}for(var o in Z){Z.hasOwnProperty(o)&&!/^listeners|boundTo$/.test(o)&&P(J,o,{enumerable:!1,configurable:!0,writable:!0,value:s(o)})}})(J.forEach);var A={boundTo:Z.boundTo,data:function W(p,o){var r="dataset" in this;return arguments.length<2?r?this.dataset[p]:(o=this.getAttribute("data-"+p.replace(W.gre||(W.gre=/-[a-z]/g),W.gplace||(W.gplace=function(u,s){return s.toUpperCase()}))))==null?void 0:o:r?o==null?delete this.dataset[p]:(this.dataset[p]=o,o):(W.sre||(W.sre=/([a-z])([A-Z])/g,W.splace=function(u,s,v){return s+"-"+v.toLowerCase()}),p="data-"+p.replace(W.sre,W.splace),o==null?!this.removeAttribute(p):(this.setAttribute(p,o),o))},emit:function(p){var o=new CustomEvent(p);return o.arguments=J.slice.call(arguments,1),this.dispatchEvent(o)},listeners:function(o){return[]},off:function(p,o,r){return this.removeEventListener(p,o,r),this},on:function(p,o,r){return this.addEventListener(p,o,r),this},once:Z.once,trigger:function(p,w){var v=typeof p=="string",o=v?p:p.type,u=v?new CustomEvent(o,(ad.detail=w,ad)):p;return ad.detail=null,q.call(u,this,o),this.dispatchEvent(u)}};ad.cancelable=!0,ad.bubbles=!0;try{document.createEvent("Event").target=document}catch(M){ae=!0,B=function(s,o,u){if(!X.call(s,o)){try{s[o]=u}catch(p){}}}}(function(C){var w=C.Window,N=w?w.prototype:C,y=(C.Node||C.Element||C.HTMLElement).prototype,x=(C.Document||C.HTMLDocument).prototype,E=(C.XMLHttpRequest||function(){}).prototype,v,p;for(v in A){X.call(A,v)&&(p={enumerable:!1,configurable:!0,writable:!0,value:A[v]},P(N,v,p),P(y,v,p),P(x,v,p),v!=="data"&&P(E,v,p))}})(g)})(Object);g.$=function(o){return function(r,q){return o.slice.call(o.concat(q||document)[0].querySelectorAll(r))}}([]);function h(E){
/*! (C) Andrea Giammarchi */
;var v=g.Math,s=v.atan,u=v.exp,t=v.log,D=v.max,A=v.min,I=v.round,G=v.tan,y=v.PI,p=0.5,J=90,q=J*2,F=J*4,r=y/2,o=y/4,C=y/q,w=q/y,B=y*2,x=y*4;if(!E){E=256}return{coordsToPoint:function z(N,M){var K=E<<M;return{x:I((N.longitude/F+p)*K),y:I(A(1,D(0,p-(t(G(o+r*N.latitude/q))/y)/2))*K)}},pointToCoords:function H(M,O){var N=E<<O,K=M.x/N,P=M.y/N;return{latitude:P<=0?J:P>=1?-J:w*(2*s(u(y*(1-2*P)))-r),longitude:(K===1?1:(K%1+1)%1)*F-q}}}}var l=l||function(t){var s=t.documentElement,q=t.createElement("p"),o;q.style.cssText=[";position:absolute",";margin:0",";padding:0",";display:block",";overflow:scroll",";width:50px",";line-height:50px",";font-size:50px"].join(" !important");q.innerHTML="0";s.insertBefore(q,s.lastChild);o=q.offsetWidth-q.clientWidth;s.removeChild(q);return o}(document);
/*! SimpleKinetic v0.1.1 - MIT license */
;var c=function(p){var x=p.isNaN,q=p.Math,E=q.abs,D=q.round,A=q.sqrt,w=p.setInterval,B=p.clearInterval,s=0.2,C=9,y=1000/60,v=r.prototype;function r(F){for(var G in F){if(/^on|context|interval/.test(G)){this[G]=F[G]}}}v.init=function(U,T,K,I,O,M){var V=u(this),J=(E(K)<1?0:K)*(O?1:C),Q=(E(I)<1?0:I)*(M?1:C),H=J*J,P=Q*Q,G=A(H+P),F=J/G,N=Q/G,S,R;V.cancel(V._cx,V._cy);if(!(x(F)||x(N))){V._a=w(t,V.interval||y,V);V._t=0;V._d=G;V._sx=V._cx=U;V._sy=V._cy=T;V._xa=F;V._ya=N;S=D(U+G*F);R=D(T+G*N);V._ex=S;V._ey=R;if((U!==S||T!==R)&&V.start(U,T,0,0,S,R)!==false){return true}u(V._a)}return false};v.start=z("start");v.move=z("move");v.end=z("end");v.cancel=function(H,F,I,G,K,J){if(this._a){u(this).oncancel.call(this.context||this,H,F,I,G,K,J)}};v.onstart=v.onmove=v.onend=v.oncancel=function(H,F,I,G,K,J){};function u(F){B(F._a);F._a=0;return F}function z(F){F="on"+F;return function(I,G,J,H,M,K){return this[F].call(this.context||this,I,G,J,H,M,K)}}function t(G){var M=(G._t+=(G._d-G._t)*s),F=D(G._sx+M*G._xa),N=D(G._sy+M*G._ya),K=G._ex,I=G._ey,J=F-G._cx,H=N-G._cy;if(F===K&&N===I){u(G).end(K,I,J,H,K,I)}else{G.move(F,N,J,H,K,I);G._cx=F;G._cy=N}}var o=w(function(F){B(o);if(!F){w=function(I,H,G){return p.setInterval(function(){I(G)},H)}}},0,1);return r}(this);function a(q,x,o,u){
/*! (C) equolo.org */
;var r=192,t=x/r,v=o||"#286868",p=q.getContext("2d");function w(z,A){p.moveTo(z*t,A*t)}function s(z,y,D,C,B,A){p.bezierCurveTo(z*t,y*t,D*t,C*t,B*t,A*t)}p.clearRect(0,0,q.width,q.height);q.width=q.height=x;if(u){p.fillStyle=u;p.fillRect(0,0,x,x)}p.fillStyle=v;p.save();p.scale(1.25,1.25);p.beginPath();w(95.32+10,10.21);s(101.05+10,7.85,108.56+10,12.68,108.09+10,19.01);s(108.39+10,25.61,100.46+10,30.49,94.67+10,27.28);s(87.81+10,24.1,88.04+10,12.79,95.32+10,10.21);p.closePath();p.fill();p.beginPath();w(67.01+10,7.48);s(72.33+10,20.59,82.54+10,31.7,95.46+10,37.57);s(104.17+10,41.72,113.89+10,43.25,123.47+10,43.1);s(108.12+10,48.29,96.34+10,60.6,88.32+10,74.31);s(79.91+10,88.85,78.34+10,106.86,83.29+10,122.84);s(72.84+10,106.64,59.08+10,91.84,41.39+10,83.57);s(30.55+10,78.74,18.41+10,76.4,6.58+10,77.64);s(24.52+10,73.08,42.99+10,65.59,54.74+10,50.61);s(64.15+10,38.49,68.55+10,22.74,67.01+10,7.48);p.closePath();p.fill();p.beginPath();w(43.22+10,119.97);s(43.75+10,102.87,43.89+10,94.92,48.72+10,89.2);s(50.5+10,93.22,49.73+10,97.67,50.54+10,101.88);s(51.34+10,107.31,53.13+10,112.93,57.29+10,116.73);s(61.3+10,121.01,68.71+10,121.41,70.94+10,127.44);s(72.27+10,133.19,66.42+10,138.03,61.08+10,138.09);s(54.7+10,138.64,49.47+10,133.66,46.69+10,128.39);s(43.41+10,122.84,43.52+10,116.2,43.22+10,109.97);p.closePath();p.fill();p.restore();return q}var j=function(p){var q=p.getContext("2d"),t={question:61736,"shopping-cart":61562,gift:61547,cutlery:61685,home:61461,glass:61440,briefcase:61617,group:61632,truck:61649},o={};function s(w,A,z){q.beginPath();q.arc(w,A,z,0,Math.PI*2,true);q.closePath();q.fill()}function r(x,w){q.clearRect(0,0,p.width,p.height);p.width=p.height=w;q.textBaseline="bottom";q.fillStyle="rgb(25,138,138)";s(w/2,w/2.5,w/2.5);u(w,w/4.9);q.fillStyle="rgb(240,240,240)";s(w/2,w/2.5,w/2.8);q.font=q.mozTextStyle=Math.round(w/2)+"px FontAwesome";q.translate((p.width-(q.measureText||q.mozMeasureText).call(q,x).width)/2,0);q.fillStyle="rgb(40,104,104)";if(x.length){q.fillText(x,0,w/1.5)}else{q.drawImage(a(document.createElement("canvas"),w/1.5),-w/2.8,w/10)}return p.toDataURL()}function u(w,x){q.beginPath();q.moveTo(w/2,w);q.lineTo(x,w/1.5);q.lineTo(w-x,w/1.5);q.lineTo(w/2,w);q.closePath();q.fill()}return function v(y,w,x){return o[y+w+x]||(o[y+w+x]=r(t.hasOwnProperty(y)?String.fromCharCode(t[y]):"",Math.round(w*(x||(typeof k==="undefined"?1:k.ratio)))))}}(document.createElement("canvas"));var f=localStorage;try{f.setItem("0",0)}catch(e){f={length:0,getItem:function(r){var q=document.cookie,p=q.indexOf(r=escape(""+r)),o;if(-1<p){p+=1+r.length;o=q.indexOf(";",p);return unescape(q.substring(p,o<0?q.length:o))}},setItem:function(o,p){document.cookie=[escape(""+o)+"="+escape(""+p),"expires="+(new Date(Date.now()+1000*60*60*24)).toUTCString(),"path=/"].join("; ")}}}g.on("leaflet:map",function(v){function u(){p.panBy([y*6,w*6]);z=null;q=0;r.scrollLeft=parseFloat(r.style.width);r.scrollTop=parseFloat(r.style.height)}function s(){r.style.top=t.offsetHeight+"px";o.style.width=(parseFloat(r.style.width=k.width+"px")*3)+"px";o.style.height=(parseFloat(r.style.height=B.offsetHeight+"px")*3)+"px"}var p=v.detail,B=document.getElementById("tiles"),t=B.parentNode.children[0],r=B.parentNode.appendChild(document.createElement("div")),o=r.appendChild(document.createElement("span")),A={animate:false,noMoveStart:true},q=0,y=0,w=0,z,x;r.id="ie9-map-wrapper";o.id="ie9-map-center";k.on("change",s);o.onmouseenter=o.onmouseleave=o.onselectionstart=o.onmousedown=o.onmouseup=o.onmousemove=o.onclick=o.ondblclick=function(C){C.preventDefault();C.stopPropagation();if(C.pageX<60&&C.pageY<100){}};u();r.onscroll=function(C){if(z!=null){p.panBy([(y=r.scrollLeft-z),(w=r.scrollTop-x)],A);clearTimeout(q);q=setTimeout(u,30)}z=r.scrollLeft;x=r.scrollTop};setTimeout(s)});
/*! (C) Andrea Giammarchi - Mit Style License */
;var d=function(A){function F(H,u){var G=new XMLHttpRequest,r,o;G.open("get",H,!0),G.onreadystatechange=function(){G.readyState==4&&(o=G.responseXML,o.firstChild||(o=document.createElement("div"),o.innerHTML=G.responseText),v=q(o,"font-face","units-per-em"),p=q(o,"font-face","ascent"),x=q(o,"font-face","descent"),Array.prototype.forEach.call(o.getElementsByTagName("glyph"),z,r={}),(u||D)(r))},G.send(null)}function q(r,o,s){return parseFloat(r.getElementsByTagName(o)[0].getAttribute(s))}function D(o){Array.prototype.forEach.call(document.querySelectorAll(".fa"),function(G,K){var I=G.offsetHeight,u=getComputedStyle(G,":before"),H=u.getPropertyValue("content"),J=o[H.length!==1?H.charAt(1):H].size(I,u.getPropertyValue("color"));G.parentNode.replaceChild(J,G)})}function C(t,U,H){var T=0,R=0,N=t.length,J=U/v*(typeof k=="object"?k.ratio:1.5),P,K,G,O,S,I,M,Q;A.width=A.height=Math.round(J*v),E.translate(0,A.height),E.scale(1,-1),E.fillStyle=H||"rgb(0,0,0)",E.globalCompositeOperation="xor";while(T<N){Q=t[T++],M=1;switch(Q.type){case"T":M=0;case"t":E.quadraticCurveTo(J*(S=2*G-(S||G)),J*(I=2*O-(I||O)),J*(G=G*M+Q.arguments[0]),J*(O=O*M+Q.arguments[1]));break;case"Q":M=0;case"q":E.quadraticCurveTo(J*(S=G*M+Q.arguments[0]),J*(I=O*M+Q.arguments[1]),J*(G=G*M+Q.arguments[2]),J*(O=O*M+Q.arguments[3]));break;case"L":M=0;case"l":E.lineTo(J*(G=G*M+Q.arguments[0]),J*(O=O*M+Q.arguments[1]));break;case"H":M=0;case"h":E.lineTo(J*(G=G*M+Q.arguments[0]),J*O);break;case"V":M=0;case"v":E.lineTo(J*G,J*(O=O*M+Q.arguments[0]));break;case"z":case"Z":E.lineTo(J*P,J*K),E.closePath(),E.fill();break;case"M":M=0,E.moveTo(J*(G=P=Q.arguments[0]),J*(O=K=Q.arguments[1]-x)),E.beginPath(),R=2;while(R<Q.arguments.length){E.lineTo(J*(G=Q.arguments[R]),J*(O=Q.arguments[R+1])),R+=2}break;default:throw"unknown "+Q.type}}}function z(r,o){var s=r.getAttribute("d");s&&(this[r.getAttribute("unicode")]={size:y,path:s})}function w(u){var o=0,G=[],s;u=u.replace(w.re||(w.re=/\s*([achlmqstvzACHLMQSTVZ])\s*/g),"$1");while(o<u.length){G.push(s={}),o=B(s,u,o)}return G}function B(G,s,H){var u=H,o=!1;switch(G.type=s[H]){case"z":case"Z":return H+1}G.arguments=[];while(u++<s.length){switch(s[u]){case"A":case"a":case"C":case"c":case"H":case"h":case"L":case"l":case"M":case"m":case"Q":case"q":case"S":case"s":case"T":case"t":case"V":case"v":case"Z":case"z":o=!0;case" ":G.arguments.push(parseFloat(s.substring(H+1,u))),H=u;if(o){return H}}}}function y(u,o){var t=new Image;return C(this._actions||(this._actions=w(this.path)),u,o),t.src=A.toDataURL(),t.style.cssText="width:"+u+"px;height:"+u+"px;",E.clearRect(0,0,v,v),t}var E=A.getContext("2d"),v,p,x;return F}(document.createElement("canvas"));try{if(IE9Mobile||j("map-marker",36).length<36){throw 0}}catch(i){g.compat=true;j=function(o){return base64Icon[o]};(function(q,o){o=q.documentElement;o.insertBefore(q.createElement("script"),o.lastChild).src="/cgi/base64_icon.php"}(document))}(function(y,H){var J=12,F=15,N,I,x,K,p,w,u,z;H.on("DOMContentLoaded",v);y.on("load",v);if(/loaded|complete/.test(H.readyState)){v()}function v(){var R,P,Q;H.off("DOMContentLoaded",v);y.off("load",v);if(!y.L){return setTimeout(v,15)}H.documentElement.classList.add("no-scroll");H.body.classList.add("no-scroll");if(IE9Mobile){d("../fonts/fontawesome-webfont.svg")}w={map:$("section#map")[0],about:$("#about")[0],contact:$("#contact")[0],pinIt:$("#pinIt")[0]};w.nav=$("nav",w.map)[0];if(!y.compat){O();R=$("section#map img")[0];P=H.createElement("canvas");P.style.cssText="width:"+R.width+"px;height:"+R.height+"px;";R.replace(a(P,R.width*k.ratio,"#E6A72A"))}G();function O(){for(var W,V,Y=H.createElement("canvas"),X=H.createDocumentFragment(),aa=[30,57,60,72,114,128,144,173,196,214,256],Z=0;Z<aa.length;Z++){W=H.createElement("link");V=H.createElement("link");W.rel="shortcut icon";V.rel="apple-touch-icon";W.type=V.type="image/png";W.href=V.href=a(Y,aa[Z],"#E6A72A","#286868").toDataURL();W.setAttribute("sizes",W.sizes=aa[Z]+"x"+aa[Z]);V.setAttribute("sizes",W.sizes);X.appendChild(W);X.appendChild(V)}(H.head||H.querySelector("head")).appendChild(X)}function U(V,W){if(W.parentNode){W.parentNode.classList.remove("selected")}W.parentNode=V;V.classList.add("selected")}I=$("select[name=category]")[0];$("nav a").on("click",function T(Y){var V=this.parentNode,W;Y.preventDefault();if(T.sk){T.sk.cancel()}if(V.classList.contains("selected")){T.parentNode=null;V.classList.remove("selected");T.sk=new c({context:w.map,onstart:function(){T.ms.display="block";T.np.appendChild(w.nav).style.cssText=""},onmove:function(Z,ae,ab,aa,ad,ac){T.ms.minHeight=ae+"px"},onend:function(Z,ae,ab,aa,ad,ac){T.ms.minHeight=null;p.style.zIndex=I.style.zIndex=9999}});W=w.nav.offsetHeight;T.sk.init(0,W,0,k.height-W,false,true)}else{if(T.parentNode){U(V,T)}else{T.sk=new c({context:w.map,onstart:function(){p.style.zIndex=I.style.zIndex=0},onmove:function(Z,ae,ab,aa,ad,ac){T.ms.minHeight=ae+"px"},onend:function(){w.nav.style.cssText="position:fixed;top:0;width:"+k.width+"px;";H.body.appendChild(w.nav);T.ms.display="none";setTimeout(U,50,T.sk.trigger,T)}});if(!T.np){T.np=w.nav.parentNode;T.ms=w.map.style}T.sk.trigger=V;W=w.map.offsetHeight;T.sk.init(0,W,0,($("footer",w.map)[0].offsetHeight-W),false,true)}}try{this.blur()}catch(X){}});L.tileLayer("http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg",{attribution:"Map Tiles &copy; Open MapQuest",maxZoom:18,minZoom:3}).addTo(N=L.map($("section#map > div.map")[0]));x=L.layerGroup().addTo(N);M(navigator.country?navigator.country.geo:[51.4791,0],6);p=$("button#find-me")[0];if("geolocation" in navigator){p.on("click",function(W){p.firstChild.classList.remove("fa-compass");p.firstChild.classList.add("fa-spin","fa-refresh");p.disabled=true;p.moved=false;try{if(Q){navigator.geolocation.clearWatch(Q)}Q=navigator.geolocation.watchPosition(function(X){if(!p.moved){p.moved=true;M(X.coords,14)}s(X.coords);t()},t,{maximumAge:300000})}catch(V){p.remove()}p.blur()})}else{p.remove()}B();if(f.length){C(f.getItem("equolo.activities"));P=f.getItem("equolo.map");if(P){M.apply(null,JSON.parse(P))}}N.on("zoomend",function S(V){var W=N.getZoom(),X=S.current||0;S.current=W;if(X===0||((J<=W&&X<J)||(W<J&&J<=X))){E()}});N.on("movestart",function(){p.moved=true});N.on("moveend",function(){var W=N.getZoom(),V=N.getCenter();if(F<=W){}f.setItem("equolo.map",JSON.stringify([V,W]))});y.on("pagehide",D).on("unload",D);if(IE9Mobile){y.trigger("leaflet:map",N)}}function D(){if(f.length){try{f.setItem("equolo.activities",u||"")}catch(O){f.setItem("equolo.activities","")}}}function t(){p.firstChild.classList.remove("fa-spin","fa-download");p.firstChild.classList.add("fa-compass");p.disabled=false}function r(T){for(var P,S=J<=N.getZoom(),Q=S||{stroke:true,color:"#286868",weight:2,opacity:1,fill:true,fillColor:"#E6A72A",fillOpacity:1,radius:8,clickable:false,pointerEvents:false},O=T.place,R=0;R<O.length;R++){if(S){P=q(O[R]);P.activity=T;P.placeIndex=R}else{P=L.circleMarker(A(O[R]),Q)}this.addLayer(P)}}function q(O){return L.marker(A(O),{icon:L.icon({iconUrl:j(O.icon,36),iconSize:[36,36]})})}function s(O){var P=A(O);if(!K){K=L.circleMarker(P,{clickable:false,pointerEvents:false});K.addTo(N)}K.setLatLng(P)}function E(){N.removeLayer(x);z.forEach(r,x=L.layerGroup());x.addTo(N)}function C(O){if(O){z=JSON.parse(O).map(o);u=O;E()}}function B(){var O=y.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");O.open("GET","/cgi/location.php",true);O.onreadystatechange=function(){if(O.readyState==4){if(199<O.status&&O.status<400){C(O.responseText)}else{setTimeout(B,5000)}}};O.send(null)}function M(P,O){N.setView(A(P),O||Math.max(14,N.getZoom()))}function G(){n({section:{"min-height":k.height+"px"}})}function A(O){return[O.latitude||O.lat||O[0]||0,O.longitude||O.lng||O[1]||0]}function o(O){O.place=m.unpack(O.place);return O}k.on("change",G)}(g,document))}(this));