import React, { Component } from 'react';

import createEventHandlers from './create-event-handlers';
import initialize from './helpers/initialize';

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
  }
  componentDidMount() {
    const component = this;

    const _initialize = () => {
      const player = window.jwplayer(this.props.playerId);
      initialize({ component, player });
    };

    const scriptId = 'jw-player-script';
    const existingScript = document.querySelector(`#${scriptId}`);

    if (!existingScript) {
      const jwPlayerScript = document.createElement('script');
      jwPlayerScript.id = scriptId;
      jwPlayerScript.src = this.props.playerScript;
      jwPlayerScript.onload = _initialize;

      document.head.appendChild(jwPlayerScript);
    } else {
      const previousOnload = existingScript.onload || (() => {});
      const curriedOnLoad = () => {
        previousOnload();
        _initialize();
      };
      existingScript.onload = curriedOnLoad;
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
