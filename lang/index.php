<?php
if (isset($_POST['save'])) {
  $fp = fopen($_POST['lang'].'.json', 'w+');
  fwrite($fp, stripslashes($_POST['save']));
  fclose($fp);
  exit;
}
?>
<?php header('Content-Type: text/html; charset=UTF-8'); ?>
<!doctype html>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
<style>
* {
  font-family: sans-serif;
  font-size: 13px;
  line-height: 15px;
}
table {
  width: 100%;
}
tr:nth-child(2n-1),
tr:nth-child(2n-1) textarea {
  background: #F5F5F5;
}
td.md {
  padding: 2px;
  margin: 0;
  overflow: auto;
}
td.md p,
td.md li {
  margin: 2px;
  padding: 0;
}
</style>
<script>/*! (C) WebReflection Mit Style License */
var tinydown=function(){function $(){this.loaded=!0}function J(){this.error=!0}function K(){S.test(this.readyState)&&$.call(this)}function Q(e,t,n){var r=0,s,o;return function(u){n.push(u),++r===2&&(function a(){s||(s=document.getElementById(t))&&(s.loaded||s.error)?(s.parentNode.removeChild(s),s=document.getElementById("_"+t),s&&(o=document.createElement("div"),o.innerHTML=n.join(N),s.parentNode.replaceChild(o,s))):setTimeout(a,1e3)}(),document[i]=e)}}function G(e,t){return t=R.call(t),t.length?t.charAt(0)==="<"?t:"<p>"+t+"</p>":""}function Y(e){for(var t=[],n=[],r=[],i=[],a=[],h={5:function(e,n,r){return R.call(r),(n.length?t.push(l,n,r):t.push(r))&&l},9:function(e,t,n,r,i,s){return a.push(Y(r.replace(I,"")).replace(q,"<br/>")),X="<li>"+v+"</li>",f===""&&(f=F.test(n)?"<ol>":"<ul>",X=f+X),z[9].test(s.slice(i+e.length))||(X+=f.replace("<","</"),f=""),X},10:function(e,t,r){return n.push(R.call(r.replace(H[t],"")))&&c},11:function(e,t,n){return i.push(n)&&d},18:function(e,t,n){return r.push(R.call(n.charAt(0)+n.slice(1).replace(H[t],"")))&&p}},S=0;S<z.length;S++)e=e.replace(z[S],W[S]||h[S]);return e.replace(m,function(e){return e=t.shift(),(e===l?s+' class="'+t.shift()+'">'+t.shift():s+">"+e)+o}).replace(g,function(e){return s+">"+n.shift()+o}).replace(y,G).replace(b,function(){return"<"+u+Y(r.shift())+"</"+u}).replace(w,function(){return"<code>"+i.shift()+"</code>"}).replace(E,function(){return a.shift()})}for(var e=0,t=0,n=typeof document!="undefined",r=n&&document.documentElement,i="write",s="<pre><code",o="</code></pre>",u="blockquote>",a="```",f="",l="\0",c="",h="",p="<blockquote/>",d="",v="",m=/\x00/g,g=/\x01/g,y=/\x02([^\x00]*?)\x02/g,b=/<blockquote\/>/g,w=/\x04/g,E=/\x05/g,S=/^loaded|complete$/,x=/^https?:\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?(\w+).*$/,T=/https?:\/\/gist\.github\.com\/[^\x00]+?\/(\d+)(\.js)?$/,N="\n",C="\\r\\n|\\r|\\n",k="(?:^|"+C+")",L="(?:$|"+C+")",A="(?="+C+"(?!\\1)|$)",O="([^\\x00]*?)",M="\\[(.*?)\\]\\((.+?)(?: (&(?:quot|apos);)?(.+?)(\\3))?\\)",_="(.+?)"+L,D="g",P=D+"m",H={"	":/^\t/gm,"    ":/^    /gm,"&gt; ":/^&gt; /gm},B=/^#+$/,j=/^\s+|\s+$/g,F=/^\d/,I=/  +/g,q=new RegExp("(?:^"+C+")",P),R="".trim||function(){return this.replace(j,"")},U=["&(?!#?[a-z0-9]+;)",D,"<",D,">",D,'"',D,"'",D,k+a+"([a-zA-Z]*)(?:"+C+")"+O+"(?:"+C+")"+a+L,D,"^"+_+"=+"+L,P,"^"+_+"-+"+L,P,"^(?:\\* \\* |- - |\\*\\*|--)[-*][-* ]*"+L,P,k+"( {0,3})(\\* |\\+ |- |\\d+. )"+O+"(?="+C+"(?!\\1  )|$)",D,k+"(\\t| {4})"+O+A,D,"(`{1,2})([^\\r\\n]+?)\\1",P,"^(#{1,6})\\s+"+_,P,"  +"+N,D,"([_*]{1,2})(?!\\s)([^\\2]+?)(\\1)",D,"!?"+M,P,"(^|\\s)@([_a-zA-Z]+)(\\s|$)",P,"(^|\\s)(#[^#&\\s]+)(\\s|$)",P,k+"(&gt; )"+O+A,D,k+"(?!<|\\x00|\\x01|\\x02|\\x03|\\x04)([^\\x00]*?)(?="+L+"{2,})",D],z=[],W=["&amp;","&lt;","&gt;","&quot;","&apos;",null,"<h1>$1</h1>","<h2>$1</h2>","<hr/>",null,null,null,function(e,t,n,r){return"<h"+(r=t.length)+">"+n.replace(B,"")+"</h"+r+">"},"<br/>",function(e,t,n,r){return"<"+(r=t.length==2?"strong>":"em>")+n+"</"+r},function(e,s,o,u,a){if(e.charAt(0)==="!")if(x.test(o))e='<iframe width="560" height="315" src="'+o.replace(x,"http://www.youtube.com/embed/$1")+'" frameborder="0" allowfullscreen>'+s+"</iframe>";else if(T.test(o))if(n){var f="tinydown"+t++,l=r.insertBefore(document.createElement("script"),r.lastChild);l.type="text/javascript",l.id=f,l.onload=$,l.onerror=J,l.onreadystatechange=K,l.src=o.replace(RegExp.$1+RegExp.$2,RegExp.$1+".js"),e='<br id="_'+f+'"/>',document[i]=Q(document[i],f,[])}else e='<script src="'+o+'"><!-- '+s+" --><"+"/script>";else e='<img src="'+o+'" alt="'+s+'" title="'+a+'"/>';else e='<a href="'+o+'" title="'+a+'">'+s+"</a>";return e},'$1<a href="https://twitter.com/$2">@$2</a>$3',function(e,t,n,r){return t+'<a href="https://twitter.com/search?src=hash&q='+encodeURIComponent(n)+'">'+n+"</a>"+r},null,h+"$1"+h],X,V=0;V<U.length;z.push(new RegExp(U[V++],U[V++])));return Y}();

this.onload = function () {
  var timer = 0;
  [].forEach.call(document.querySelectorAll('textarea'), function (textarea) {
    textarea.addEventListener('keyup', keyup);
    transformText(textarea);
  });
  function keyup(e) {
    clearTimeout(timer);
    timer = setTimeout(transformText, 500, this);
  }
  function transformText(textarea) {
    timer = 0;
    textarea.parentNode.nextSibling.innerHTML = tinydown(textarea.value);
  }
};
</script>
<table>
<?php
require_once('en.php');
$lang = isset($_GET['lang']) ? $_GET['lang'] : 'en';
echo '<select onchange="changeLocation(this)">';
foreach(array('en', 'de', 'fr', 'es', 'it') as $value) {
  echo '<option'.($value === $lang ? ' selected="selected"' : '').'>'.$value.'</option>';
}
echo '</select>';
echo '<a href="http://webreflection.github.io/tinydown/test/test.html" target="_blank">Markdown</a>';
if(!file_exists($lang.'.json')) {
  $fp = fopen($lang.'.json', 'w+');
  fwrite($fp, $lang === 'en' ? json_encode($dictionary) : '{}');
  fclose($fp);
}
$currentRaw = file_get_contents($lang.'.json');
$current = json_decode($currentRaw);
foreach($dictionary as $key => $value) {
  if ($key !== 'jslang') {
    echo '<tr valign="top"><td width="20%">'.$key.'</td><td width="40%"><textarea name="'.$key.'" style="width:100%;" rows="6">'.(
      isset($current->$key) ? $current->$key : ''
    ).'</textarea></td><td width="40%" class="md"></td></tr>';
  }
}
?>
</table>
<script>
<?php echo 'var lang={'.$lang.':'.$currentRaw.'};'?>
var timer = 0;
function sendAndSave() {
  var
    xhr = new XMLHttpRequest,
    what = Object.keys(lang)[0]
  ;
  xhr.open('POST', location.href.split('?')[0], false);
  xhr.setRequestHeader("If-Modified-Since", "Mon, 26 Jul 1997 05:00:00 GMT");
  xhr.setRequestHeader("Cache-Control", "no-cache");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send('lang=' + what + '&save=' + encodeURIComponent(JSON.stringify(lang[what])));
}
function saveIt() {
  [].forEach.call(document.querySelectorAll('textarea'), function(t){
    this[t.name] = t.value;
  }, lang[Object.keys(lang)[0]]);
  sendAndSave();
}
function beforeSaving() {
  clearTimeout(timer);
  timer = setTimeout(saveIt, 2000);
}
function changeLocation(select) {
  var href = location.href.split('?')[0];
  sendAndSave();
  location.href = href + '?lang=' + select.value;
}
[].forEach.call(document.querySelectorAll('textarea'), function(t){
  t.addEventListener('keyup', beforeSaving);
});
</script>