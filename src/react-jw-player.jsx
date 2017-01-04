import React, { Component } from 'react';

import createEventHandlers from './create-event-handlers';
import defaultProps from './default-props';
import propTypes from './prop-types';

class JWPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adHasPlayed: false,
      hasPlayed: false,
      hasFired: {}
    };
    this.eventHandlers = createEventHandlers(this);
    this.setupPreroll = this.setupPreroll.bind(this);
  }
  componentDidMount() {
    const initialize = () => {
      const player = window.jwplayer(this.props.playerId);

      const playerOpts = {
        playlist: this.props.playlist,
        mute: !!this.props.muted
      };

      if (this.props.generatePrerollUrl) {
        playerOpts.advertising = {
          client: 'googima',
          admessage: 'Ad — xxs left',
          autoplayadsmuted: true
        };
      }

      player.setup(playerOpts);

      player.on('ready', this.props.onReady);
      player.on('setupError', this.onError);
      player.on('error', this.props.onError);
      player.on('adPlay', this.eventHandlers.onAdPlay);
      player.on('adPause', this.props.onAdPause);
      player.on('fullscreen', this.eventHandlers.onFullScreen);
      player.on('pause', this.props.onPause);
      player.on('play', this.eventHandlers.onPlay);
      player.on('mute', this.eventHandlers.onMute);
      player.on('playlistItem', this.eventHandlers.onVideoLoad);
      player.on('time', this.eventHandlers.onTime);
      player.on('beforeComplete', this.props.onOneHundredPercent);

      if (this.props.generatePrerollUrl) {
        this.setupPreroll(player);
      }
    };

    const scriptId = 'jw-player-script';
    const existingScript = document.querySelector(`#${scriptId}`);

    if (!existingScript) {
      const jwPlayerScript = document.createElement('script');
      jwPlayerScript.id = scriptId;
      jwPlayerScript.src = this.props.playerScript;
      jwPlayerScript.onload = initialize;

      document.head.appendChild(jwPlayerScript);
    } else {
      const previousOnload = existingScript.onload || (() => {});
      const curriedOnLoad = () => {
        previousOnload();
        initialize();
      };
      existingScript.onload = curriedOnLoad;
    }
  }
  setupPreroll(playerInstance) {
    playerInstance.on('beforePlay', () => {
      const currentVideo = playerInstance.getPlaylistItem();

      if (!this.state.hasPlayed) {
        playerInstance.playAd(this.props.generatePrerollUrl(currentVideo));
      }
    });
  }
  render() {
    return (
      <div className={this.props.className} id={this.props.playerId} />
    );
  }
}

JWPlayer.defaultProps = defaultProps;
JWPlayer.propTypes = propTypes;
export default JWPlayer;
