import test from 'tape';

import getEventNameFromProp from '../src/helpers/get-event-name-from-prop';

test('getEventNameFromProp()', (t) => {
  t.is(
    typeof getEventNameFromProp,
    'function',
    'it is a function',
  );

  t.is(
    getEventNameFromProp('playlist'),
    null,
    'it returns an null when the prop name is not for an event handler',
  );

  t.is(
    getEventNameFromProp('onReady'),
    'ready',
    'it returns the proper event name for a single word event',
  );

  t.is(
    getEventNameFromProp('onSetupError'),
    'setupError',
    'it returns the proper event name for a two word event',
  );

  t.is(
    getEventNameFromProp('onPlaybackRateChanged'),
    'playbackRateChanged',
    'it returns the proper event name for a three word event',
  );

  t.end();
});
