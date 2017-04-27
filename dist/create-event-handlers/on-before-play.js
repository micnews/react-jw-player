'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function onBeforePlay(event, player) {
  var currentVideo = player.getPlaylistItem();

  if (!this.state.hasPlayed && typeof this.props.generatePrerollUrl === 'function') {
    player.playAd(this.props.generatePrerollUrl(currentVideo));
  }
}

exports.default = onBeforePlay;