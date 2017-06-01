"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function onVideoLoad(event) {
  this.setState({
    hasFired: {}
  });
  this.props.onVideoLoad(event);
}

exports.default = onVideoLoad;