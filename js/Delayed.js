/*! (C) Andrea Giammarchi */
// https://gist.github.com/WebReflection/7286687
var Delayed = function(delay){
  function Delayed(callback, delay) {
    if (!delay) delay = Delayed.delay;
    function delayed() {
      clear();
      delayed._ = setTimeout(
        invoke, delay, callback, this, arguments, delayed
      );
    }
    function clear() {
      clearTimeout(delayed._);
    }
    delayed.clear = clear;
    delayed._ = 0;
    return delayed;
  }
  function clear() {
    clearTimeout(this._);
    this._ = 0;
    return this;
  }
  function invoke(callback, context, args, delayed) {
    delayed._ = 0;
    callback.apply(context, args);
  }
  Delayed.delay = delay;
  return Delayed;
}(500);