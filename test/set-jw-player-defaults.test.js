import test from 'tape';
import setJWPlayerDefaults from '../src/helpers/set-jw-player-defaults';

test('setJWPlayerDefaults() without existing config', (t) => {
  const jwplayer = {
    defaults: 'defaults',
  };

  const context = {
    jwplayer,
  };

  const playerId = 'playerId';

  t.doesNotThrow(
    () => setJWPlayerDefaults({ context, playerId }),
    'it runs without error',
  );

  t.deepEqual(
    context.__JW_PLAYER_CONFIGS__,
    { [playerId]: jwplayer.defaults },
    'it caches the current default settings for jw player',
  );

  t.end();
});

test('setJWPlayerDefaults() with existing config', (t) => {
  const jwplayer = {};

  const playerId = 'playerId';

  const __JW_PLAYER_CONFIGS__ = {
    [playerId]: 'cached config',
  };

  const context = {
    __JW_PLAYER_CONFIGS__,
    jwplayer,
  };


  t.doesNotThrow(
    () => setJWPlayerDefaults({ context, playerId }),
    'it runs without error',
  );

  t.deepEqual(
    context.jwplayer.defaults,
    __JW_PLAYER_CONFIGS__[playerId],
    'it sets jw player defaults to the cached config value',
  );

  t.end();
});
