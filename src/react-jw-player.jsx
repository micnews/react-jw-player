import React, { Component } from 'react';
import isEqual from 'react-fast-compare';

import createEventHandlers from './create-event-handlers';
import getCurriedOnLoad from './helpers/get-curried-on-load';
import getPlayerOpts from './helpers/get-player-opts';
import initialize from './helpers/initialize';
import installPlayerScript from './helpers/install-player-script';
import removeJWPlayerInstance from './helpers/remove-jw-player-instance';
import setJWPlayerDefaults from './helpers/set-jw-player-defaults';

import defaultProps from './default-props';
import propTypes from './player-prop-types';

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

    if (props.useMultiplePlayerScripts) {
      this.uniqueScriptId += `-${props.playerId}`;
    }

    this._initialize = this._initialize.bind(this);
  }
  componentDidMount() {
    const isJWPlayerScriptLoaded = !!window.jwplayer;
    const existingScript = document.getElementById(this.uniqueScriptId);
    const isUsingMultiplePlayerScripts = this.props.useMultiplePlayerScripts;

    if (!isUsingMultiplePlayerScripts && isJWPlayerScriptLoaded) {
      this._initialize();
      return;
    }

    if (isUsingMultiplePlayerScripts && existingScript) {
      this._initialize();
      return;
    }

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
  shouldComponentUpdate(nextProps) {
    const hasFileChanged = this.props.file !== nextProps.file;
    const hasPlaylistChanged = !isEqual(this.props.playlist, nextProps.playlist);

    return hasFileChanged || hasPlaylistChanged;
  }
  componentDidUpdate() {
    if (window.jwplayer && window.jwplayer(this.props.playerId)) {
      this._initialize();
    }
  }
  componentWillUnmount() {
    removeJWPlayerInstance(this.props.playerId, window);
  }
  _initialize() {
    const { playerId, useMultiplePlayerScripts } = this.props;

    if (useMultiplePlayerScripts) {
      setJWPlayerDefaults({ context: window, playerId });
    }

    const component = this;
    const player = window.jwplayer(this.props.playerId);
    const playerOpts = getPlayerOpts(this.props);

    initialize({ component, player, playerOpts });
  }
  render() {
    return (
      <div
        className={this.props.className}
        dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
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
