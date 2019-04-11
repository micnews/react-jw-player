"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function onVideoLoad(event) {
  this.setState({
    hasFired: {},
    hasPlayed: false,
    adHasPlayed: false
  });
  this.props.onVideoLoad(event);
}

exports.default = onVideoLoad;