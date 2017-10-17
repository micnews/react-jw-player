/* @flow */

type OptsType = {
  config: any,
  events: any,
  player: any,
};

const initializeJWPlayer = ({ config, events, player }: OptsType) => {
  player.setup(config);

  Object.keys(events).forEach((key) => {
    player.on(key, events[key]);
  });
};

export default initializeJWPlayer;
