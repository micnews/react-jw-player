function getPlayerOpts({ playlist, isMuted = false, hasAdvertising = false }) {
  const playerOpts = {
    playlist,
    mute: !!isMuted
  };

  if (hasAdvertising) {
    playerOpts.advertising = {
      client: 'googima',
      admessage: 'Ad — xxs left',
      autoplayadsmuted: true
    };
  }

  return playerOpts;
}

export default getPlayerOpts;
