'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _onAdPlay = require('./on-ad-play');

var _onAdPlay2 = _interopRequireDefault(_onAdPlay);

var _onBeforePlay = require('./on-before-play');

var _onBeforePlay2 = _interopRequireDefault(_onBeforePlay);

var _onFullScreen = require('./on-full-screen');

var _onFullScreen2 = _interopRequireDefault(_onFullScreen);

var _onMute = require('./on-mute');

var _onMute2 = _interopRequireDefault(_onMute);

var _onPlay = require('./on-play');

var _onPlay2 = _interopRequireDefault(_onPlay);

var _onTime = require('./on-time');

var _onTime2 = _interopRequireDefault(_onTime);

var _onVideoLoad = require('./on-video-load');

var _onVideoLoad2 = _interopRequireDefault(_onVideoLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createEventHandlers(component) {
  return {
    onAdPlay: _onAdPlay2.default.bind(component),
    onBeforePlay: _onBeforePlay2.default.bind(component),
    onFullScreen: _onFullScreen2.default.bind(component),
    onMute: _onMute2.default.bind(component),
    onPlay: _onPlay2.default.bind(component),
    onTime: _onTime2.default.bind(component),
    onVideoLoad: _onVideoLoad2.default.bind(component)
  };
}

exports.default = createEventHandlers;