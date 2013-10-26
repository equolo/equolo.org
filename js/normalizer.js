// quite an ambitious name
// however, this is all we might need/want to normalize
(function(Array, Function, String){
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
}(Array.prototype, Function.prototype, String.prototype));