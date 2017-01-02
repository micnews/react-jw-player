import React, { Component, PropTypes } from 'react';

import propTypes from './prop-types';

const noOp = () => {};
const defaultProps = {
  onAdPlay: noOp,
  onAdResume: noOp,
  onEnterFullScreen: noOp,
  onExitFullScreen: noOp,
  onMute: noOp,
  onUnmute: noOp,
  onAutoStart: noOp,
  onResume: noOp,
  onPlay: noOp,
  onClose: noOp,
  onReady: noOp,
  onError: noOp,
  onAdPause: noOp,
  onPause: noOp,
  onVideoLoad: noOp,
  onOneHundredPercent: noOp,
  onThreeSeconds: noOp,
  onTenSeconds: noOp,
  onThirtySeconds: noOp,
  onFiftyPercent: noOp,
  onNinetyFivePercent: noOp
};


class JWPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adHasPlayed: false,
      closed: false,
      hasPlayed: false,
      hasFired: {}
    };
    this.onClose = this.onClose.bind(this);
  }
  componentDidMount() {
    const onAdPlay = (event) => {
      if (!this.state.adHasPlayed) {
        this.props.onAdPlay(event);
        this.setState({
          adHasPlayed: true
        });
      } else {
        this.props.onAdResume(event);
      }
    };

    const onFullScreen = (event) => {
      if (event.fullscreen) {
        this.props.onEnterFullScreen(event);
      } else {
        this.props.onExitFullScreen(event);
      }
    };

    const onMute = (event) => {
      if (event.mute) {
        this.props.onMute(event);
      } else {
        this.props.onUnmute(event);
      }
    };

    const onPlay = (event) => {
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
    };

    const setUpPreRoll = (playerInstance) => {
      playerInstance.on('beforePlay', () => {
        const currentVideo = playerInstance.getPlaylistItem();

        if (!this.state.hasPlayed) {
          playerInstance.playAd(this.props.generatePrerollUrl(currentVideo));
        }
      });
    };

    const onError = (event) => {
      this.props.onError(event);
      this.props.onClose(event, () => {
        window.jwplayer(this.props.playerId).remove();
        this.setState({ closed: true });
      });
    };

    const onTime = (event) => {
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
    };

    const onBeforeComplete = (event) => {
      this.props.onOneHundredPercent(event);
    };

    const onVideoLoad = (event) => {
      this.setState({
        hasFired: {}
      });
      this.props.onVideoLoad(event);
    };

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
      player.on('setupError', onError);
      player.on('error', onError);
      player.on('adPlay', onAdPlay);
      player.on('adPause', this.props.onAdPause);
      player.on('fullscreen', onFullScreen);
      player.on('pause', this.props.onPause);
      player.on('play', onPlay);
      player.on('mute', onMute);
      player.on('playlistItem', onVideoLoad);
      player.on('time', onTime);
      player.on('beforeComplete', onBeforeComplete);

      if (this.props.generatePrerollUrl) {
        setUpPreRoll(player);
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
  onClose(event) {
    this.props.onClose(event, () => {
      window.jwplayer(this.props.playerId).remove();
      this.setState({ closed: true });
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
