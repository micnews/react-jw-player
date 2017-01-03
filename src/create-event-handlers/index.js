import onAdPlay from './on-ad-play';
import onPlay from './on-play';

function createEventHandlers(component) {
  return {
    onAdPlay: onAdPlay.bind(component),
    onPlay: onPlay.bind(component)
  };
}

export default createEventHandlers;
