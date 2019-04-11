'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var getEventNameFromProp = function getEventNameFromProp(prop) {
  var beginsWithOn = prop.slice(0, 2) === 'on';

  if (beginsWithOn) {
    var eventName = prop.slice(2);

    var _eventName = _toArray(eventName),
        firstLetter = _eventName[0],
        rest = _eventName.slice(1);

    return '' + firstLetter.toLowerCase() + rest.join('');
  }

  return null;
};

exports.default = getEventNameFromProp;