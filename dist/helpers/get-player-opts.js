'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getPlayerOpts(opts) {
  var aspectRatio = opts.aspectRatio,
      _opts$customProps = opts.customProps,
      customProps = _opts$customProps === undefined ? {} : _opts$customProps,
      file = opts.file,
      generatePrerollUrl = opts.generatePrerollUrl,
      image = opts.image,
      isAutoPlay = opts.isAutoPlay,
      isMuted = opts.isMuted,
      playlist = opts.playlist;


  var hasAdvertising = !!generatePrerollUrl;

  var playerOpts = {
    mute: !!isMuted
  };

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

  if (image) {
    playerOpts.image = image;
  }

  return Object.assign(playerOpts, customProps);
}

exports.default = getPlayerOpts;