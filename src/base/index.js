/* @flow */
/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import getCurriedOnLoad from './helpers/get-curried-on-load';
import initializeJWPlayer from './helpers/initialize-jw-player';
import installJWPlayerScript from './helpers/install-jw-player-script';

const UNIQUE_SCRIPT_ID = 'jw-player-script';

type Props = {
  config: {
    file?: string,
    playlist?: string | Array<any>,
  },
  className?: string,
  events?: any,
  playerId: string,
  playerScript: string,
};

class ReactJWPlayerBase extends Component<Props, *> {
  static defaultProps: any;

  constructor(props: Props) {
    super(props);
    this.initializeJWPlayer = this.initializeJWPlayer.bind(this);
  }

  componentDidMount() {
    const isJWPlayerScriptLoaded = !!global.window.jwplayer;

    if (isJWPlayerScriptLoaded) {
      this.initializeJWPlayer();
      return;
    }

    const existingScript = global.document.getElementById(UNIQUE_SCRIPT_ID);

    if (!existingScript) {
      installJWPlayerScript({
        context: global.document,
        onLoadCallback: this.initializeJWPlayer,
        scriptSrc: this.props.playerScript,
        uniqueScriptId: UNIQUE_SCRIPT_ID,
      });
    } else {
      existingScript.onload = getCurriedOnLoad(
        existingScript,
        this.initializeJWPlayer,
      );
    }
  }

  shouldComponentUpdate(newProps: Props) {
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

  initializeJWPlayer: Function;
  initializeJWPlayer() {
    const { config, events, playerId } = this.props;
    const player = global.window.jwplayer(playerId);

    initializeJWPlayer({ config, events, player });
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
  events: {},
};

export default ReactJWPlayerBase;
