'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function installPlayerScript(_ref) {
  var context = _ref.context,
      onLoadCallback = _ref.onLoadCallback,
      scriptSrc = _ref.scriptSrc,
      uniqueScriptId = _ref.uniqueScriptId;

  var jwPlayerScript = context.createElement('script');
  jwPlayerScript.id = uniqueScriptId;
  jwPlayerScript.src = scriptSrc;
  jwPlayerScript.onload = onLoadCallback;

  context.head.appendChild(jwPlayerScript);
}

exports.default = installPlayerScript;