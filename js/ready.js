/*! (C) Andrea Giammarchi */
// https://gist.github.com/WebReflection/7294841
(function(window, add, dom, load){
  function ready(collection) {
    return function(e) {
      while(collection.length) {
        collection.shift().call(window, e);
      }
      collection.K = true;
    };
  }
  function on(collection) {
    return function(fn){
      collection.K ?
        fn.call(window) :
        collection.push(fn)
      ;
    }
  }
  window.onDOM = on(dom);
  window.onLoad = on(load);
  document[add]('DOMContentLoaded', ready(dom));
  window[add]('load', ready(load));
}(this, 'addEventListener', [], []));