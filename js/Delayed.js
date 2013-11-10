/*! (C) Andrea Giammarchi */
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
}(500);