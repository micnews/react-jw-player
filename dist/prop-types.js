'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  aspectRatio: _propTypes2.default.oneOf(['inherit', '1:1', '16:9']),
  className: _propTypes2.default.string,
  customProps: _propTypes2.default.object,
  file: _propTypes2.default.string,
  image: _propTypes2.default.string,
  onAdPlay: _propTypes2.default.func,
  onAdResume: _propTypes2.default.func,
  onEnterFullScreen: _propTypes2.default.func,
  onExitFullScreen: _propTypes2.default.func,
  onMute: _propTypes2.default.func,
  onUnmute: _propTypes2.default.func,
  onAutoStart: _propTypes2.default.func,
  onResume: _propTypes2.default.func,
  onPlay: _propTypes2.default.func,
  generatePrerollUrl: _propTypes2.default.func,
  onError: _propTypes2.default.func,
  playerId: _propTypes2.default.string.isRequired,
  playlist: _propTypes2.default.string,
  onReady: _propTypes2.default.func,
  onAdPause: _propTypes2.default.func,
  onPause: _propTypes2.default.func,
  onVideoLoad: _propTypes2.default.func,
  playerScript: _propTypes2.default.string.isRequired,
  onOneHundredPercent: _propTypes2.default.func,
  onThreeSeconds: _propTypes2.default.func,
  onTenSeconds: _propTypes2.default.func,
  onThirtySeconds: _propTypes2.default.func,
  onFiftyPercent: _propTypes2.default.func,
  onNinetyFivePercent: _propTypes2.default.func,
  isMuted: _propTypes2.default.bool,
  isAutoPlay: _propTypes2.default.bool
};

exports.default = propTypes;