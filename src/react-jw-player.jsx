import React, { Component } from 'react';

import createEventHandlers from './create-event-handlers';
import getCurriedOnLoad from './helpers/get-curried-on-load';
import getPlayerOpts from './helpers/get-player-opts';
import initialize from './helpers/initialize';
import installPlayerScript from './helpers/install-player-script';

import defaultProps from './default-props';
import propTypes from './prop-types';

const displayName = 'ReactJWPlayer';

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
  componentDidUpdate(prevProps) {
    if (
      prevProps.playlist !== this.props.playlist ||
      prevProps.file !== this.props.file ||
      prevProps.isAutoPlay !== this.props.isAutoPlay
    ) {
      this._initialize();
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
      <div
        className={this.props.className}
        dangerouslySetInnerHTML={{
          __html: `<div id="${this.props.playerId}"></div>`,
        }}
      />
    );
  }
}

ReactJWPlayer.defaultProps = defaultProps;
ReactJWPlayer.displayName = displayName;
ReactJWPlayer.propTypes = propTypes;
export default ReactJWPlayer;
