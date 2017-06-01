function onSeek(event) {
  if (this.props.onSeek) {
    this.props.onSeek(event);
  }
}

export default onSeek;
