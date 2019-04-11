"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getCurriedOnLoad(existingScript, callback) {
  var previousOnload = existingScript.onload || function () {};
  var curriedOnLoad = function curriedOnLoad() {
    previousOnload();
    callback();
  };

  return curriedOnLoad;
}

exports.default = getCurriedOnLoad;