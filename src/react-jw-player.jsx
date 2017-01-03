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
    this.onTime = this.onTime.bind(this);
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
      player.on('time', this.onTime);
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
  onFullScreen(event) {
    if (event.fullscreen) {
      this.props.onEnterFullScreen(event);
    } else {
      this.props.onExitFullScreen(event);
    }
  }
  onMute(event) {
    if (event.mute) {
      this.props.onMute(event);
    } else {
      this.props.onUnmute(event);
    }
  }
  onPlay(event) {
    if (event.playReason === 'autostart') {
      this.setState({
        hasPlayed: true
      });
      this.props.onAutoStart(event);
    } else if (this.state.hasPlayed && event.oldstate === 'paused') {
      this.props.onResume(event);
    } else {
      this.props.onPlay(event);
      this.setState({
        hasPlayed: true
      });
    }
  }
  onTime(event) {
    const { hasFired } = this.state;
    const { position, duration } = event;
    let hasChanged = false;

    if (!hasFired.threeSeconds && position > 3) {
      this.props.onThreeSeconds();
      hasFired.threeSeconds = true;
      hasChanged = true;
    }

    if (!hasFired.tenSeconds && position > 10) {
      this.props.onTenSeconds();
      hasFired.tenSeconds = true;
      hasChanged = true;
    }

    if (!hasFired.thirtySeconds && position > 30) {
      this.props.onThirtySeconds();
      hasFired.thirtySeconds = true;
      hasChanged = true;
    }

    if (!hasFired.fiftyPercent && ((position / duration) * 100) > 50) {
      this.props.onFiftyPercent();
      hasFired.fiftyPercent = true;
      hasChanged = true;
    }

    if (!hasFired.ninetyFivePercent && ((position / duration) * 100) > 95) {
      this.props.onNinetyFivePercent();
      hasFired.ninetyFivePercent = true;
      hasChanged = true;
    }

    if (hasChanged) {
      this.setState({
        hasFired
      });
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
