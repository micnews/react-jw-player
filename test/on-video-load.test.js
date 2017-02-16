import test from 'tape';
import createEventHandlers from '../src/create-event-handlers';
import MockComponent from './helpers/mock-component';

test('eventHandlers.onVideoLoad()', (t) => {
  let onVideoLoadCalled = false;
  let onVideoLoadArgs;

  const mockComponent = new MockComponent({
    initialState: { hasFired: 'hasFired' },
    onVideoLoad(event) {
      onVideoLoadCalled = true;
      onVideoLoadArgs = event;
    },
  });

  const mockEvent = 'event';
  const onVideoLoad = createEventHandlers(mockComponent).onVideoLoad;

  t.doesNotThrow(onVideoLoad.bind(null, mockEvent), 'it runs without error');
  t.deepEqual(
    mockComponent.state.hasFired,
    {},
    'it sets hasFired in component state to empty object',
  );
  t.ok(onVideoLoadCalled, 'it calls the supplied onVideoLoad() prop');
  t.equal(onVideoLoadArgs, mockEvent, 'it passes the event to onVideoLoad()');

  t.end();
});
