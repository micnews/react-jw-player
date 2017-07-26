function onTime(event) {
  const { hasFired, previousPositionInteger } = this.state;
  const { duration, position } = event;
  const currentPositionInteger = Math.floor(position);

  if (previousPositionInteger === currentPositionInteger) {
    return;
  }

  this.props.onEverySecond(currentPositionInteger);

  if (!hasFired.threeSeconds && currentPositionInteger >= 3) {
    this.props.onThreeSeconds();
    hasFired.threeSeconds = true;
  }

  if (!hasFired.tenSeconds && currentPositionInteger >= 10) {
    this.props.onTenSeconds();
    hasFired.tenSeconds = true;
  }

  if (!hasFired.thirtySeconds && currentPositionInteger >= 30) {
    this.props.onThirtySeconds();
    hasFired.thirtySeconds = true;
  }

  if (!hasFired.twentyFivePercent && ((position / duration) * 100) >= 25) {
    this.props.onTwentyFivePercent();
    hasFired.twentyFivePercent = true;
  }

  if (!hasFired.fiftyPercent && ((position / duration) * 100) >= 50) {
    this.props.onFiftyPercent();
    hasFired.fiftyPercent = true;
  }

  if (!hasFired.seventyFivePercent && ((position / duration) * 100) >= 75) {
    this.props.onSeventyFivePercent();
    hasFired.seventyFivePercent = true;
  }

  if (!hasFired.ninetyFivePercent && ((position / duration) * 100) >= 95) {
    this.props.onNinetyFivePercent();
    hasFired.ninetyFivePercent = true;
  }

  this.setState({
    hasFired,
    previousPositionInteger: currentPositionInteger,
  });
}

export default onTime;
