"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable no-param-reassign */

var setJWPlayerDefaults = function setJWPlayerDefaults(_ref) {
  var context = _ref.context,
      playerId = _ref.playerId;

  var playerConfigs = context.__JW_PLAYER_CONFIGS__ = context.__JW_PLAYER_CONFIGS__ || {};
  var existingConfig = playerConfigs[playerId];

  if (existingConfig) {
    context.jwplayer.defaults = existingConfig;
  } else {
    playerConfigs[playerId] = context.jwplayer.defaults;
  }
};

exports.default = setJWPlayerDefaults;