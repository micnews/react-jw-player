function onAdTime(event) {
  const { previousPositionInteger } = this.state;
  const { position } = event;
  const currentPositionInteger = Math.floor(position);

  if (previousPositionInteger === currentPositionInteger) {
    return;
  }

  this.props.onEverySecond(currentPositionInteger);

  this.setState({
    previousPositionInteger: currentPositionInteger,
  });
}

export default onAdTime;
