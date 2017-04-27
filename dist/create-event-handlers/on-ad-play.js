"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function onAdPlay(event) {
  if (!this.state.adHasPlayed) {
    this.props.onAdPlay(event);
    this.setState({
      adHasPlayed: true
    });
  } else {
    this.props.onAdResume(event);
  }
}

exports.default = onAdPlay;