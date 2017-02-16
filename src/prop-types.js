import { PropTypes } from 'react';

const propTypes = {
  aspectRatio: PropTypes.oneOf(['inherit', '1:1', '16:9']),
  className: PropTypes.string,
  onAdPlay: PropTypes.func,
  onAdResume: PropTypes.func,
  onEnterFullScreen: PropTypes.func,
  onExitFullScreen: PropTypes.func,
  onMute: PropTypes.func,
  onUnmute: PropTypes.func,
  onAutoStart: PropTypes.func,
  onResume: PropTypes.func,
  onPlay: PropTypes.func,
  generatePrerollUrl: PropTypes.func,
  onError: PropTypes.func,
  playerId: PropTypes.string.isRequired,
  playlist: PropTypes.string.isRequired,
  onReady: PropTypes.func,
  onAdPause: PropTypes.func,
  onPause: PropTypes.func,
  onVideoLoad: PropTypes.func,
  playerScript: PropTypes.string.isRequired,
  onOneHundredPercent: PropTypes.func,
  onThreeSeconds: PropTypes.func,
  onTenSeconds: PropTypes.func,
  onThirtySeconds: PropTypes.func,
  onFiftyPercent: PropTypes.func,
  onNinetyFivePercent: PropTypes.func,
  isMuted: PropTypes.bool,
};

export default propTypes;
