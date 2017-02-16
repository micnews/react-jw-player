import test from 'tape';
import createEventHandlers from '../src/create-event-handlers';
import MockComponent from './helpers/mock-component';

test('eventHandlers.onMute() when player is not muted', (t) => {
  let onMuteCalled = false;
  let onMuteArgs;
  let onUnmuteCalled = false;

  const mockComponent = new MockComponent({
    onMute(event) {
      onMuteCalled = true;
      onMuteArgs = event;
    },
    onUnmute() {
      onUnmuteCalled = true;
    },
  });

  const mockEvent = { mute: true };
  const onMute = createEventHandlers(mockComponent).onMute;

  t.doesNotThrow(onMute.bind(null, mockEvent), 'it runs without error');
  t.ok(onMuteCalled, 'it calls the supplied onMute() prop');
  t.equal(onMuteArgs, mockEvent, 'it passes the event to onMute()');
  t.notOk(onUnmuteCalled, 'it does not call onUnmute()');

  t.end();
});

test('eventHandlers.onMute() when player is muted', (t) => {
  let onMuteCalled = false;
  let onUnmuteCalled = false;
  let onUnmuteArgs;

  const mockComponent = new MockComponent({
    onMute() {
      onMuteCalled = true;
    },
    onUnmute(event) {
      onUnmuteCalled = true;
      onUnmuteArgs = event;
    },
  });

  const mockEvent = { mute: false };
  const onMute = createEventHandlers(mockComponent).onMute;

  t.doesNotThrow(onMute.bind(null, mockEvent), 'it runs without error');
  t.ok(onUnmuteCalled, 'it calls the supplied onUnmute() prop');
  t.equal(onUnmuteArgs, mockEvent, 'it passes the event to onUnmute()');
  t.notOk(onMuteCalled, 'it does not call onMute()');

  t.end();
});
