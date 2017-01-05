import React, { Component } from 'react';

import createEventHandlers from './create-event-handlers';
import getCurriedOnLoad from './helpers/get-curried-on-load';
import getPlayerOpts from './helpers/get-player-opts';
import initialize from './helpers/initialize';
import installPlayerScript from './helpers/install-player-script';

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
    this.uniqueScriptID = 'jw-player-script';
  }
  componentDidMount() {
    const component = this;

    const playerOpts = getPlayerOpts({
      playlist: this.props.playlist,
      isMuted: this.props.muted,
      hasAdvertising: !!this.props.generatePrerollUrl
    });

    const _initialize = () => {
      const player = window.jwplayer(this.props.playerId);
      initialize({ component, player, playerOpts });
    };

    const existingScript = document.querySelector(`#${this.uniqueScriptID}`);

    if (!existingScript) {
      installPlayerScript({
        context: document,
        onLoadCallback: _initialize,
        scriptSrc: this.props.playerScript,
        uniqueScriptID: this.uniqueScriptID
      });
    } else {
      existingScript.onload = getCurriedOnLoad(existingScript, _initialize);
    }
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
