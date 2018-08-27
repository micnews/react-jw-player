import test from 'tape';
import createEventHandlers from '../src/create-event-handlers';
import MockComponent from './helpers/mock-component';

test('eventHandlers.onPlay() when event.playReason is autostart', (t) => {
  let onAutoStartCalled = false;
  let onAutoStartArgs;
  let onPlayCalled = false;
  let onResumeCalled = false;

  const mockComponent = new MockComponent({
    initialState: { adHasPlayed: false },
    onAutoStart(event) {
      onAutoStartCalled = true;
      onAutoStartArgs = event;
    },
    onPlay() {
      onPlayCalled = true;
    },
    onResume() {
      onResumeCalled = true;
    },
  });

  const mockEvent = { playReason: 'autostart' };
  const onPlay = createEventHandlers(mockComponent).onPlay;

  t.doesNotThrow(onPlay.bind(null, mockEvent), 'it runs without error');
  t.ok(mockComponent.state.hasPlayed, 'it sets hasPlayed to true in the component state');
  t.ok(onAutoStartCalled, 'it calls the supplied onAutoStart() prop');
  t.notOk(onResumeCalled, 'it does not call onResume()');
  t.notOk(onPlayCalled, 'it does not call onPlay()');
  t.equal(onAutoStartArgs, mockEvent, 'it passes the event to onAutoStart()');

  t.end();
});

test('eventHandlers.onPlay() when video has played before and is currently paused', (t) => {
  let onAutoStartCalled = false;
  let onPlayCalled = false;
  let onResumeCalled = false;
  let onResumeArgs;

  const mockComponent = new MockComponent({
    initialState: { hasPlayed: true },
    onAutoStart() {
      onAutoStartCalled = true;
    },
    onPlay() {
      onPlayCalled = true;
    },
    onResume(event) {
      onResumeCalled = true;
      onResumeArgs = event;
    },
  });

  const mockEvent = { oldstate: 'buffering' };
  const onPlay = createEventHandlers(mockComponent).onPlay;

  t.doesNotThrow(onPlay.bind(null, mockEvent), 'it runs without error');
  t.ok(onResumeCalled, 'it calls the supplied onResume() prop');
  t.notOk(onPlayCalled, 'it does not call onPlay()');
  t.notOk(onAutoStartCalled, 'it does not call onAutoStart()');
  t.equal(onResumeArgs, mockEvent, 'it passes the event to onResume()');
  t.equal(mockComponent.state, mockComponent.props.initialState, 'it does not set state');

  t.end();
});

test('eventHandlers.onPlay() when video has not yet played and user has pressed play', (t) => {
  let onAutoStartCalled = false;
  let onPlayCalled = false;
  let onPlayArgs;
  let onResumeCalled = false;

  const mockComponent = new MockComponent({
    initialState: { hasPlayed: false },
    onAutoStart() {
      onAutoStartCalled = true;
    },
    onPlay(event) {
      onPlayCalled = true;
      onPlayArgs = event;
    },
    onResume() {
      onResumeCalled = true;
    },
  });

  const mockEvent = 'event';
  const onPlay = createEventHandlers(mockComponent).onPlay;

  t.doesNotThrow(onPlay.bind(null, mockEvent), 'it runs without error');
  t.ok(onPlayCalled, 'it calls the supplied onPlay() prop');
  t.notOk(onResumeCalled, 'it does not call onResume()');
  t.notOk(onAutoStartCalled, 'it does not call onAutoStart()');
  t.equal(onPlayArgs, mockEvent, 'it passes the event to onPlay()');
  t.deepEqual(mockComponent.state, { hasPlayed: true }, 'it sets hasPlayed to true in the state');

  t.end();
});
