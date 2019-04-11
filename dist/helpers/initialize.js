'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getEventNameFromProp = require('./get-event-name-from-prop');

var _getEventNameFromProp2 = _interopRequireDefault(_getEventNameFromProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initialize(_ref) {
  var component = _ref.component,
      player = _ref.player,
      playerOpts = _ref.playerOpts;

  function _onBeforePlay(event) {
    component.eventHandlers.onBeforePlay(event, player);
  }

  player.setup(playerOpts);

  var eventsToInitialize = {};

  Object.keys(component.props).forEach(function (prop) {
    var eventName = (0, _getEventNameFromProp2.default)(prop);

    if (eventName) {
      eventsToInitialize[eventName] = component.props[prop];
    }
  });

  eventsToInitialize.adPlay = component.eventHandlers.onAdPlay;
  eventsToInitialize.beforeComplete = component.props.onOneHundredPercent;
  eventsToInitialize.beforePlay = _onBeforePlay;
  eventsToInitialize.fullscreen = component.eventHandlers.onFullScreen;
  eventsToInitialize.mute = component.eventHandlers.onMute;
  eventsToInitialize.play = component.eventHandlers.onPlay;
  eventsToInitialize.playlistItem = component.eventHandlers.onVideoLoad;
  eventsToInitialize.time = component.eventHandlers.onTime;

  Object.keys(eventsToInitialize).forEach(function (event) {
    player.on(event, eventsToInitialize[event]);
  });
}

exports.default = initialize;