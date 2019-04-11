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
  generatePrerollUrl: _propTypes2.default.func,
  image: _propTypes2.default.string,
  isAutoPlay: _propTypes2.default.bool,
  isMuted: _propTypes2.default.bool,
  licenseKey: _propTypes2.default.string,
  onAdPause: _propTypes2.default.func,
  onAdPlay: _propTypes2.default.func,
  onAdResume: _propTypes2.default.func,
  onAdSkipped: _propTypes2.default.func,
  onAdComplete: _propTypes2.default.func,
  onAutoStart: _propTypes2.default.func,
  onEnterFullScreen: _propTypes2.default.func,
  onError: _propTypes2.default.func,
  onExitFullScreen: _propTypes2.default.func,
  onFiftyPercent: _propTypes2.default.func,
  onMute: _propTypes2.default.func,
  onNinetyFivePercent: _propTypes2.default.func,
  onOneHundredPercent: _propTypes2.default.func,
  onPause: _propTypes2.default.func,
  onPlay: _propTypes2.default.func,
  onReady: _propTypes2.default.func,
  onResume: _propTypes2.default.func,
  onSeventyFivePercent: _propTypes2.default.func,
  onTenSeconds: _propTypes2.default.func,
  onThirtySeconds: _propTypes2.default.func,
  onThreeSeconds: _propTypes2.default.func,
  onTwentyFivePercent: _propTypes2.default.func,
  onUnmute: _propTypes2.default.func,
  onVideoLoad: _propTypes2.default.func,
  onBuffer: _propTypes2.default.func,
  onBufferChange: _propTypes2.default.func,
  playerId: _propTypes2.default.string.isRequired,
  playerScript: _propTypes2.default.string.isRequired,
  playlist: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]),
  useMultiplePlayerScripts: _propTypes2.default.bool
};

exports.default = propTypes;