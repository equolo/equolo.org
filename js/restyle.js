/*jslint browser: true, plusplus: true, indent: 2 */
// @link https://gist.github.com/WebReflection/6924133
function restyle(
  rules,  // an object containing selectors and
          // a collection of key/value pairs per each
          // selector, i.e.
          //  restyle({
          //    'body > section.main': {
          //      color: '#EEE',
          //      'margin-left': (innerWidth - 200) + 'px'
          //    }
          //  });
  doc     // the document, if necessary
) {
  'use strict';
  /*! (C) Andrea Giammarchi - Mit Style License */
  //  somehow inspired by the fully featured absurd.js
  //  https://github.com/krasimir/absurd#absurdjs
  if (!doc) {
    doc = document;
  }
  doc.getElementsByTagName('head')[0].appendChild(
    doc.createElement('style')
  ).appendChild(doc.createTextNode(''));
  var
    styleSheets = doc.styleSheets,
    styleSheet = styleSheets[styleSheets.length - 1],
    add = styleSheet.addRule || function (selector, rule, index) {
      this.insertRule(selector + '{' + rule + '}', index);
    },
    i = 0,
    selector, // the CSS selector, i.e. body > section.main
    current,  // the current style with one or more key value pairs
    key,      // each property, i.e. transition or color or margin-left
    value,    // the value associated, i.e. #EEDDF0, 20px
    css;      // the list of all rules per each selector
  for (selector in rules) {
    if (rules.hasOwnProperty(selector)) {
      css = [];
      current = rules[selector];
      for (key in current) {
        if (current.hasOwnProperty(key)) {
          value = current[key];
          css.push(
            '-webkit-' + key + ':' + value,
            '-khtml-' + key + ':' + value,
            '-blink-' + key + ':' + value,
            '-moz-' + key + ':' + value,
            '-ms-' + key + ':' + value,
            '-o-' + key + ':' + value,
            key + ':' + value
          );
        }
      }
      add.call(styleSheet, selector, css.join(';') + ';', i++);
    }
  }
}