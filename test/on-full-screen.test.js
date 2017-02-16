import test from 'tape';
import createEventHandlers from '../src/create-event-handlers';
import MockComponent from './helpers/mock-component';

test('eventHandlers.onFullScreen() when player is not in fullscreen mode', (t) => {
  let onEnterFullScreenCalled = false;
  let onEnterFullScreenArgs;
  let onExitFullScreenCalled = false;

  const mockComponent = new MockComponent({
    onEnterFullScreen(event) {
      onEnterFullScreenCalled = true;
      onEnterFullScreenArgs = event;
    },
    onExitFullScreen() {
      onExitFullScreenCalled = true;
    },
  });

  const mockEvent = { fullscreen: true };
  const onFullScreen = createEventHandlers(mockComponent).onFullScreen;

  t.doesNotThrow(onFullScreen.bind(null, mockEvent), 'it runs without error');
  t.ok(onEnterFullScreenCalled, 'it calls the supplied onEnterFullScreen() prop');
  t.equal(onEnterFullScreenArgs, mockEvent, 'it passes the event to onEnterFullScreen()');
  t.notOk(onExitFullScreenCalled, 'it does not call onExitFullScreen()');

  t.end();
});

test('eventHandlers.onFullScreen() when player is in fullscreen mode', (t) => {
  let onEnterFullScreenCalled = false;
  let onExitFullScreenCalled = false;
  let onExitFullScreenArgs;

  const mockComponent = new MockComponent({
    onEnterFullScreen() {
      onEnterFullScreenCalled = true;
    },
    onExitFullScreen(event) {
      onExitFullScreenCalled = true;
      onExitFullScreenArgs = event;
    },
  });

  const mockEvent = { fullscreen: false };
  const onFullScreen = createEventHandlers(mockComponent).onFullScreen;

  t.doesNotThrow(onFullScreen.bind(null, mockEvent), 'it runs without error');
  t.ok(onExitFullScreenCalled, 'it calls the supplied onExitFullScreen() prop');
  t.equal(onExitFullScreenArgs, mockEvent, 'it passes the event to onExitFullScreen()');
  t.notOk(onEnterFullScreenCalled, 'it does not call onEnterFullScreen()');

  t.end();
});
