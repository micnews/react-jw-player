function onAdTime(event) {
  const { previousPositionInteger = 0 } = this.state;
  const { position } = event;
  const currentPositionInteger = Math.floor(position);

  if (previousPositionInteger === currentPositionInteger) {
    return;
  }

  let shouldUpdateState = false;

  if (currentPositionInteger === 0) {
    shouldUpdateState = true;
  }

  if (currentPositionInteger > previousPositionInteger) {
    this.props.onEverySecond(currentPositionInteger);
    shouldUpdateState = true;
  }

  if (shouldUpdateState) {
    this.setState({
      previousPositionInteger: currentPositionInteger,
    });
  }
}

export default onAdTime;
