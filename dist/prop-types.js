'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var propTypes = {
  aspectRatio: _react.PropTypes.oneOf(['inherit', '1:1', '16:9']),
  className: _react.PropTypes.string,
  customProps: _react.PropTypes.object,
  file: _react.PropTypes.string,
  image: _react.PropTypes.string,
  onAdPlay: _react.PropTypes.func,
  onAdResume: _react.PropTypes.func,
  onEnterFullScreen: _react.PropTypes.func,
  onExitFullScreen: _react.PropTypes.func,
  onMute: _react.PropTypes.func,
  onUnmute: _react.PropTypes.func,
  onAutoStart: _react.PropTypes.func,
  onResume: _react.PropTypes.func,
  onPlay: _react.PropTypes.func,
  generatePrerollUrl: _react.PropTypes.func,
  onError: _react.PropTypes.func,
  playerId: _react.PropTypes.string.isRequired,
  playlist: _react.PropTypes.string,
  onReady: _react.PropTypes.func,
  onAdPause: _react.PropTypes.func,
  onPause: _react.PropTypes.func,
  onVideoLoad: _react.PropTypes.func,
  playerScript: _react.PropTypes.string.isRequired,
  onOneHundredPercent: _react.PropTypes.func,
  onThreeSeconds: _react.PropTypes.func,
  onTenSeconds: _react.PropTypes.func,
  onThirtySeconds: _react.PropTypes.func,
  onFiftyPercent: _react.PropTypes.func,
  onNinetyFivePercent: _react.PropTypes.func,
  isMuted: _react.PropTypes.bool,
  isAutoPlay: _react.PropTypes.bool
};

exports.default = propTypes;