function getPlayerOpts(opts) {
  const {
    aspectRatio,
    file,
    generatePrerollUrl,
    image,
    isAutoPlay,
    isMuted,
    playlist,
    skin,
  } = opts;

  const hasAdvertising = !!generatePrerollUrl;

  const playerOpts = {
    mute: !!isMuted,
  };

  if (playlist) {
    playerOpts.playlist = playlist;
  } else if (file) {
    playerOpts.file = file;
  }

  if (skin) {
    playerOpts.skin = skin;
  }

  if (aspectRatio && aspectRatio !== 'inherit') {
    playerOpts.aspectratio = aspectRatio;
  }

  if (hasAdvertising) {
    playerOpts.advertising = {
      client: 'googima',
      admessage: 'Ad — xxs left',
      autoplayadsmuted: true,
    };
  }

  if (typeof isAutoPlay !== 'undefined') {
    playerOpts.autostart = !!isAutoPlay;
  }

  if (image) {
    playerOpts.image = image;
  }

  return playerOpts;
}

export default getPlayerOpts;
