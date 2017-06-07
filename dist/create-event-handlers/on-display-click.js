"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function onDisplayClick(event) {
  this.props.onClick(event);
}

exports.default = onDisplayClick;