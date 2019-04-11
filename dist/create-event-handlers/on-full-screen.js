"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function onFullScreen(event) {
  if (event.fullscreen) {
    this.props.onEnterFullScreen(event);
  } else {
    this.props.onExitFullScreen(event);
  }
}

exports.default = onFullScreen;