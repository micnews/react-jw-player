/* flow */
/* eslint-disable react/no-danger */
import React, { Component } from 'react';

type PropsType = {
  config: {
    playlist?: string,
  },
  className?: string,
  playerId: string,
};

class ReactJWPlayerBase extends Component {
  shouldComponentUpdate(newProps: PropsType) {
    const oldConfig = this.props.config;
    const newConfig = newProps.config;

    const playlistHasChanged = oldConfig.playlist !== newConfig.playlist;
    const fileHasChanged = oldConfig.file !== newConfig.file;

    return playlistHasChanged || fileHasChanged;
  }
  props: PropsType;
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
