function onBeforePlay(event, player) {
  const currentVideo = player.getPlaylistItem();

  if (!this.state.hasPlayed && typeof this.props.generatePrerollUrl === 'function') {
    player.playAd(this.props.generatePrerollUrl(currentVideo));
  }
}

export default onBeforePlay;
