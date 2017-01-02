import React, { Component } from 'react';

import defaultProps from './default-props';
import propTypes from './prop-types';

class JWPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adHasPlayed: false,
      closed: false,
      hasPlayed: false,
      hasFired: {}
    };
    this.onAdPlay = this.onAdPlay.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onFullScreen = this.onFullScreen.bind(this);
    this.onMute = this.onMute.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onTime = this.onTime.bind(this);
    this.onBeforeComplete = this.onBeforeComplete.bind(this);
    this.onVideoLoad = this.onVideoLoad.bind(this);
    this.onClose = this.onClose.bind(this);
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
      player.on('error', this.onError);
      player.on('adPlay', this.onAdPlay);
      player.on('adPause', this.props.onAdPause);
      player.on('fullscreen', this.onFullScreen);
      player.on('pause', this.props.onPause);
      player.on('play', this.onPlay);
      player.on('mute', this.onMute);
      player.on('playlistItem', this.onVideoLoad);
      player.on('time', this.onTime);
      player.on('beforeComplete', this.onBeforeComplete);

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
  onAdPlay(event) {
    if (!this.state.adHasPlayed) {
      this.props.onAdPlay(event);
      this.setState({
        adHasPlayed: true
      });
    } else {
      this.props.onAdResume(event);
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
  onError(event) {
    this.props.onError(event);
    this.props.onClose(event, () => {
      window.jwplayer(this.props.playerId).remove();
      this.setState({ closed: true });
    });
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
  onBeforeComplete(event) {
    this.props.onOneHundredPercent(event);
  }
  onVideoLoad(event) {
    this.setState({
      hasFired: {}
    });
    this.props.onVideoLoad(event);
  }
  onClose(event) {
    this.props.onClose(event, () => {
      window.jwplayer(this.props.playerId).remove();
      this.setState({ closed: true });
    });
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
    const { className, playerId } = this.props;

    if (this.state.closed) {
      return <div />;
    }

    return (
      <div className={className} id={playerId} />
    );
  }
}

JWPlayer.defaultProps = defaultProps;
JWPlayer.propTypes = propTypes;
export default JWPlayer;
