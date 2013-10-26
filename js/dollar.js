// very simple jQueryish approach: inefficient but handy enough
window.$=function(a){return function(c,p){return a.slice.call(a.concat(p||document)[0].querySelectorAll(c))}}([]);