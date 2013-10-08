var SCROLLBAR_SIZE = SCROLLBAR_SIZE || function(d){
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
}(document);