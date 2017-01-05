import React, { Component } from 'react';

import createEventHandlers from './create-event-handlers';
import installScriptAndInitialize from './helpers/install-script-and-initialize';

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
    installScriptAndInitialize(window, this);
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
