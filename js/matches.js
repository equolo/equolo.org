var matches = function(Element, matches){
  matches = (
    Element.matches ||
    Element.matchesSelector ||
    Element.mozMatchesSelector ||
    Element.msMatchesSelector ||
    Element.oMatchesSelector ||
    Element.webkitMatchesSelector ||
    function (CSS) {
      return -1 < Array.prototype.indexOf.call(
        document.querySelectorAll(CSS)
      ).indexOf(this);
    }
  );
  return function(el, CSS) {
    return matches.call(el, CSS);
  };
}(Element.prototype);