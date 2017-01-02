import test from 'tape';
import createEventHandlers from '../src/create-event-handlers';

test('eventHandlers.onAdPlay() when state of adHasPlayed is false', (t) => {
  let onAdPlayCalled = false;
  let onAdResumeCalled = false;
  let setStateArgs;

  const mockComponent = {
    props: {
      onAdPlay() {
        onAdPlayCalled = true;
      },
      onAdResume() {
        onAdResumeCalled = true;
      }
    },
    setState(args) {
      setStateArgs = args;
    },
    state: {
      adHasPlayed: false
    }
  };
  const mockEvent = 'event';
  const onAdPlay = createEventHandlers(mockComponent).onAdPlay;

  t.doesNotThrow(onAdPlay.bind(null, mockEvent), 'it runs without error');
  t.ok(onAdPlayCalled, 'it calls the supplied onAdPlay() prop');
  t.notOk(onAdResumeCalled, 'it does not call the supplied onAdResume() prop');
  t.deepEqual(setStateArgs, { adHasPlayed: true }, 'it calls setState to set adHasPlayed to true');

  t.end();
});

test('eventHandlers.onAdPlay() when state of adHasPlayed is true', (t) => {
  let onAdPlayCalled = false;
  let onAdResumeCalled = false;
  let setStateCalled = false;

  const mockComponent = {
    props: {
      onAdPlay() {
        onAdPlayCalled = true;
      },
      onAdResume() {
        onAdResumeCalled = true;
      }
    },
    setState() {
      setStateCalled = true;
    },
    state: {
      adHasPlayed: true
    }
  };
  const mockEvent = 'event';
  const onAdPlay = createEventHandlers(mockComponent).onAdPlay;

  t.doesNotThrow(onAdPlay.bind(null, mockEvent), 'it runs without error');
  t.notOk(onAdPlayCalled, 'it does not call the supplied onAdPlay() prop');
  t.ok(onAdResumeCalled, 'it calls the supplied onAdResume() prop');
  t.notOk(setStateCalled, 'it does not call setState()');

  t.end();
});
