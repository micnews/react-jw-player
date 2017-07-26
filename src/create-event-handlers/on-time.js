function onTime(event) {
  const { hasFired, previousPositionInteger } = this.state;
  const { duration, position } = event;
  const currentPositionInteger = Math.floor(position);

  let shouldUpdateState = false;

  if (previousPositionInteger === currentPositionInteger) {
    return;
  } else if (!hasFired.zeroSecond && currentPositionInteger === 0) {
    this.props.onEverySecond(0);
    hasFired.zeroSecond = true;
    shouldUpdateState = true;
  } else {
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

  if (!hasFired.twentyFivePercent && ((position / duration) * 100) >= 25) {
    this.props.onTwentyFivePercent();
    hasFired.twentyFivePercent = true;
    shouldUpdateState = true;
  }

  if (!hasFired.fiftyPercent && ((position / duration) * 100) >= 50) {
    this.props.onFiftyPercent();
    hasFired.fiftyPercent = true;
    shouldUpdateState = true;
  }

  if (!hasFired.seventyFivePercent && ((position / duration) * 100) >= 75) {
    this.props.onSeventyFivePercent();
    hasFired.seventyFivePercent = true;
    shouldUpdateState = true;
  }

  if (!hasFired.ninetyFivePercent && ((position / duration) * 100) >= 95) {
    this.props.onNinetyFivePercent();
    hasFired.ninetyFivePercent = true;
    shouldUpdateState = true;
  }

  if (shouldUpdateState) {
    this.setState({
      hasFired,
      previousPositionInteger: currentPositionInteger,
    });
  }
}

export default onTime;
