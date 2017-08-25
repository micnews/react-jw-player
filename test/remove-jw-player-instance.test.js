import test from 'tape';
import removeJWPlayerInstance from '../src/helpers/remove-jw-player-instance';

test('removeJWPlayerInstance() with active player', (t) => {
  let requestedId;
  let removeCalled;

  const playerId = 'playerId';

  const mockContext = {
    jwplayer(id) {
      requestedId = id;
      return {
        remove() {
          removeCalled = true;
        },
      };
    },
  };

  removeJWPlayerInstance(playerId, mockContext);

  t.is(
    requestedId,
    playerId,
    'it asks jwplayer for the player with the proper id',
  );

  t.ok(
    removeCalled,
    'it calls remove() on the components player property',
  );

  t.end();
});

test('removeJWPlayerInstance() with inactive player', (t) => {
  let requestedId;

  const playerId = 'playerId';

  const mockContext = {
    jwplayer(id) {
      requestedId = id;
      return null;
    },
  };

  t.doesNotThrow(
    () => removeJWPlayerInstance(playerId, mockContext),
    'it runs without error',
  );

  t.is(
    requestedId,
    playerId,
    'it asks jwplayer for the player with the proper id',
  );

  t.end();
});
