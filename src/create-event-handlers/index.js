import onAdPlay from './on-ad-play';

function createEventHandlers(component) {
  return {
    onAdPlay: onAdPlay.bind(component)
  };
}

export default createEventHandlers;
