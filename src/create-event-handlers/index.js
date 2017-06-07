import onAdPlay from './on-ad-play';
import onBeforePlay from './on-before-play';
import onDisplayClick from './on-display-click';
import onFullScreen from './on-full-screen';
import onMute from './on-mute';
import onPlay from './on-play';
import onSeek from './on-seek';
import onTime from './on-time';
import onVideoLoad from './on-video-load';

function createEventHandlers(component) {
  return {
    onAdPlay: onAdPlay.bind(component),
    onBeforePlay: onBeforePlay.bind(component),
    onDisplayClick: onDisplayClick.bind(component),
    onFullScreen: onFullScreen.bind(component),
    onMute: onMute.bind(component),
    onPlay: onPlay.bind(component),
    onSeek: onSeek.bind(component),
    onTime: onTime.bind(component),
    onVideoLoad: onVideoLoad.bind(component),
  };
}

export default createEventHandlers;
