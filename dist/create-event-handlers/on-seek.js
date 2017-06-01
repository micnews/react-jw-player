"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function onSeek(event) {
  if (this.props.onSeek) {
    this.props.onSeek(event);
  }
}

exports.default = onSeek;