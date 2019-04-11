'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function getPlayerOpts(opts) {
  var aspectRatio = opts.aspectRatio,
      _opts$customProps = opts.customProps,
      customProps = _opts$customProps === undefined ? {} : _opts$customProps,
      file = opts.file,
      generatePrerollUrl = opts.generatePrerollUrl,
      image = opts.image,
      isAutoPlay = opts.isAutoPlay,
      isMuted = opts.isMuted,
      licenseKey = opts.licenseKey,
      playlist = opts.playlist;


  var hasAdvertising = !!generatePrerollUrl;

  var playerOpts = {};

  if (licenseKey) {
    playerOpts.key = licenseKey;
  }

  if (playlist) {
    playerOpts.playlist = playlist;
  } else if (file) {
    playerOpts.file = file;
  }

  if (aspectRatio && aspectRatio !== 'inherit') {
    playerOpts.aspectratio = aspectRatio;
  }

  if (hasAdvertising) {
    playerOpts.advertising = {
      client: 'googima',
      admessage: 'Ad — xxs left',
      autoplayadsmuted: true
    };
  }

  if (typeof isAutoPlay !== 'undefined') {
    playerOpts.autostart = !!isAutoPlay;
  }

  if (typeof isMuted !== 'undefined') {
    playerOpts.mute = !!isMuted;
  }

  if (image) {
    playerOpts.image = image;
  }

  return _extends(playerOpts, customProps);
}

exports.default = getPlayerOpts;