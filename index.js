
var focusable = require('focusable-elements');
var ev = require('event');
var normalize = require('normalize');

/**
 * Expose `trapFocus`
 */

module.exports = focusTrap;

/**
 * Trap focus within `container`
 *
 * @api public
 * @param {HTMLElement} container
 * @return {Function} keyboard listener
 */

function focusTrap(container) {
  var elements = focusable(container);
  var first = elements[0];
  var last = elements[elements.length - 1];

  return ev.bind(container, 'keydown', function (keyboardEvent) {
    keyboardEvent = normalize(keyboardEvent);

    if (9 != keyboardEvent.which) return;

    if (keyboardEvent.shiftKey) {
      if (first == keyboardEvent.target) {
        keyboardEvent.preventDefault();
        last.focus();
      }
    } else {
      if (last == keyboardEvent.target) {
        keyboardEvent.preventDefault();
        first.focus();
      }
    }
  });
}
