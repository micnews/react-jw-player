import React, { Component, PropTypes } from 'react';

import createEventHandlers from './create-event-handlers';
import getCurriedOnLoad from './helpers/get-curried-on-load';
import getPlayerOpts from './helpers/get-player-opts';
import initialize from './helpers/initialize';
import installPlayerScript from './helpers/install-player-script';

import defaultProps from './default-props';

const displayName = 'ReactJWPlayer';

const propTypes = {
  aspectRatio: PropTypes.oneOf(['inherit', '1:1', '16:9']),
  className: PropTypes.string,
  onAdPlay: PropTypes.func,
  onAdResume: PropTypes.func,
  onEnterFullScreen: PropTypes.func,
  onExitFullScreen: PropTypes.func,
  onMute: PropTypes.func,
  onUnmute: PropTypes.func,
  onAutoStart: PropTypes.func,
  onResume: PropTypes.func,
  onPlay: PropTypes.func,
  generatePrerollUrl: PropTypes.func,
  onError: PropTypes.func,
  playerId: PropTypes.string.isRequired,
  playlist: PropTypes.string.isRequired,
  onReady: PropTypes.func,
  onAdPause: PropTypes.func,
  onPause: PropTypes.func,
  onVideoLoad: PropTypes.func,
  playerScript: PropTypes.string.isRequired,
  onOneHundredPercent: PropTypes.func,
  onThreeSeconds: PropTypes.func,
  onTenSeconds: PropTypes.func,
  onThirtySeconds: PropTypes.func,
  onFiftyPercent: PropTypes.func,
  onNinetyFivePercent: PropTypes.func,
  isMuted: PropTypes.bool,
};

class ReactJWPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adHasPlayed: false,
      hasPlayed: false,
      hasFired: {},
    };
    this.eventHandlers = createEventHandlers(this);
    this.uniqueScriptId = 'jw-player-script';
    this._initialize = this._initialize.bind(this);
  }
  componentDidMount() {
    const isJWPlayerScriptLoaded = !!window.jwplayer;
    if (isJWPlayerScriptLoaded) {
      this._initialize();
      return;
    }

    const existingScript = document.getElementById(this.uniqueScriptId);

    if (!existingScript) {
      installPlayerScript({
        context: document,
        onLoadCallback: this._initialize,
        scriptSrc: this.props.playerScript,
        uniqueScriptId: this.uniqueScriptId,
      });
    } else {
      existingScript.onload = getCurriedOnLoad(existingScript, this._initialize);
    }
  }
  _initialize() {
    const component = this;
    const player = window.jwplayer(this.props.playerId);
    const playerOpts = getPlayerOpts(this.props);

    initialize({ component, player, playerOpts });
  }
  render() {
    return (
      <div className={this.props.className} id={this.props.playerId} />
    );
  }
}

ReactJWPlayer.defaultProps = defaultProps;
ReactJWPlayer.displayName = displayName;
ReactJWPlayer.propTypes = propTypes;
export default ReactJWPlayer;
