/* @flow */
import test from 'tape';
import initializeJWPlayer from './initialize-jw-player';

test('initializeJWPlayer()', (t) => {
  let setupCalled = false;
  let setupArgs;

  const playerFunctions = {};

  const player = {
    on(key, value) {
      playerFunctions[key] = value;
    },
    setup(args) {
      setupCalled = true;
      setupArgs = args;
    },
  };

  const config = {
    foo: 'foo',
  };

  const events = {
    bar: () => {},
  };

  t.doesNotThrow(
    () => initializeJWPlayer({ config, events, player }),
    'it runs without error',
  );
  t.ok(setupCalled, 'it calls player.setup()');
  t.equal(setupArgs, config, 'it passes the supplied config to player.setup()');

  t.is(
    typeof playerFunctions.bar,
    'function',
    'it sets event hooks as functions',
  );

  t.equal(
    playerFunctions.bar,
    events.bar,
    'it passes down event handlers to jw player',
  );

  t.end();
});
