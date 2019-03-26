function onVideoLoad(event) {
  this.setState({
    hasFired: {},
    hasPlayed: false,
    adHasPlayed: false,
  });
  this.props.onVideoLoad(event);
}

export default onVideoLoad;
