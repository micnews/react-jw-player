"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function onMute(event) {
  if (event.mute) {
    this.props.onMute(event);
  } else {
    this.props.onUnmute(event);
  }
}

exports.default = onMute;