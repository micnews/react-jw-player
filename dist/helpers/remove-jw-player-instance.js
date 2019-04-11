"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function removeJWPlayerInstance(playerId, context) {
  var player = context.jwplayer && context.jwplayer(playerId);

  if (player) {
    player.remove();
  }
}

exports.default = removeJWPlayerInstance;