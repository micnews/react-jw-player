import onAdPlay from './on-ad-play';
import onFullScreen from './on-full-screen';
import onMute from './on-mute';
import onPlay from './on-play';
import onVideoLoad from './on-video-load';

function createEventHandlers(component) {
  return {
    onAdPlay: onAdPlay.bind(component),
    onFullScreen: onFullScreen.bind(component),
    onMute: onMute.bind(component),
    onPlay: onPlay.bind(component),
    onVideoLoad: onVideoLoad.bind(component)
  };
}

export default createEventHandlers;
