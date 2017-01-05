function initialize({ component, player }) {
  const playerOpts = {
    playlist: component.props.playlist,
    mute: !!component.props.muted
  };

  if (component.props.generatePrerollUrl) {
    playerOpts.advertising = {
      client: 'googima',
      admessage: 'Ad — xxs left',
      autoplayadsmuted: true
    };
  }

  function _onBeforePlay(event) {
    component.eventHandlers.onBeforePlay(event, player);
  }

  player.setup(playerOpts);

  player.on('beforePlay', _onBeforePlay);
  player.on('ready', component.props.onReady);
  player.on('setupError', component.eventHandlers.onError);
  player.on('error', component.props.onError);
  player.on('adPlay', component.eventHandlers.onAdPlay);
  player.on('adPause', component.props.onAdPause);
  player.on('fullscreen', component.eventHandlers.onFullScreen);
  player.on('pause', component.props.onPause);
  player.on('play', component.eventHandlers.onPlay);
  player.on('mute', component.eventHandlers.onMute);
  player.on('playlistItem', component.eventHandlers.onVideoLoad);
  player.on('time', component.eventHandlers.onTime);
  player.on('beforeComplete', component.props.onOneHundredPercent);
}

export default initialize;
