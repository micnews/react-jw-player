import onAdPlay from './on-ad-play';
import onFullScreen from './on-full-screen';
import onPlay from './on-play';

function createEventHandlers(component) {
  return {
    onAdPlay: onAdPlay.bind(component),
    onFullScreen: onFullScreen.bind(component),
    onPlay: onPlay.bind(component)
  };
}

export default createEventHandlers;
