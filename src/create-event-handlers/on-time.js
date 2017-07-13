function onTime(event) {
  const { hasFired, previousPosition } = this.state;
  const { duration, position } = event;

  const durationInteger = Math.floor(duration);
  const currentPositionInteger = Math.floor(position);
  const previousPositionInteger = previousPosition || 0;

  let shouldUpdateState = false;

  if (currentPositionInteger === 0) {
    shouldUpdateState = true;
  }

  if (currentPositionInteger > previousPositionInteger) {
    this.props.onEverySecond(currentPositionInteger);
    shouldUpdateState = true;
  }

  if (!hasFired.threeSeconds && currentPositionInteger >= 3) {
    this.props.onThreeSeconds();
    hasFired.threeSeconds = true;
    shouldUpdateState = true;
  }

  if (!hasFired.tenSeconds && currentPositionInteger >= 10) {
    this.props.onTenSeconds();
    hasFired.tenSeconds = true;
    shouldUpdateState = true;
  }

  if (!hasFired.thirtySeconds && currentPositionInteger >= 30) {
    this.props.onThirtySeconds();
    hasFired.thirtySeconds = true;
    shouldUpdateState = true;
  }

  if (!hasFired.fiftyPercent && ((position / duration) * 100) >= 50) {
    this.props.onFiftyPercent();
    hasFired.fiftyPercent = true;
    shouldUpdateState = true;
  }

  if (!hasFired.seventyFivePercent && (currentPositionInteger / durationInteger) * 100) >= 75) {
    this.props.onSeventyFivePercent();
    hasFired.seventyFivePercent = true;
    hasChanged = true;
  }

  if (!hasFired.ninetyFivePercent && ((currentPositionInteger / durationInteger) * 100) >= 95) {
    this.props.onNinetyFivePercent();
    hasFired.ninetyFivePercent = true;
    shouldUpdateState = true;
  }

  if (!hasFired.OneHundredPercent && currentPositionInteger === durationInteger) {
    this.props.onOneHundredPercent();
    hasFired.OneHundredPercent = true;
    shouldUpdateState = true;
  }

  if (shouldUpdateState) {
    this.setState({
      hasFired,
      previousPosition: currentPositionInteger,
    });
  }
}

export default onTime;
