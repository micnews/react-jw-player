/* @flow */
/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import getCurriedOnLoad from './helpers/get-curried-on-load';
import initializeJWPlayer from './helpers/initialize-jw-player';
import installJWPlayerScript from './helpers/install-jw-player-script';

type PropsType = {
  config: {
    file?: string,
    playlist?: string | Array<any>,
  },
  className?: string,
  playerId: string,
  playerScript: string,
};

class ReactJWPlayerBase extends Component<*, *> {
  static defaultProps: any;

  constructor(props: PropsType) {
    super(props);

    this.initializeJWPlayer = this.initializeJWPlayer.bind(this);
    this.uniqueScriptId = 'jw-player-script';
  }
  componentDidMount() {
    const isJWPlayerScriptLoaded = !!global.window.jwplayer;

    if (isJWPlayerScriptLoaded) {
      this.initializeJWPlayer();
      return;
    }

    const existingScript = global.document.getElementById(this.uniqueScriptId);

    if (!existingScript) {
      installJWPlayerScript({
        context: global.document,
        onLoadCallback: this.initializeJWPlayer,
        scriptSrc: this.props.playerScript,
        uniqueScriptId: this.uniqueScriptId,
      });
    } else {
      existingScript.onload = getCurriedOnLoad(
        existingScript,
        this.initializeJWPlayer,
      );
    }
  }
  shouldComponentUpdate(newProps: PropsType) {
    const oldConfig = this.props.config;
    const newConfig = newProps.config;

    const playlistHasChanged = oldConfig.playlist !== newConfig.playlist;
    const fileHasChanged = oldConfig.file !== newConfig.file;

    return playlistHasChanged || fileHasChanged;
  }
  componentDidUpdate() {
    if (global.window.jwplayer) {
      this.initializeJWPlayer();
    }
  }

  props: PropsType;
  uniqueScriptId: string;

  initializeJWPlayer: Function;
  initializeJWPlayer() {
    initializeJWPlayer(this);
  }
  render() {
    const { className, playerId } = this.props;
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{
          __html: `<div id="${playerId}"></div>`,
        }}
      />
    );
  }
}

ReactJWPlayerBase.defaultProps = {
  className: null,
};

export default ReactJWPlayerBase;
