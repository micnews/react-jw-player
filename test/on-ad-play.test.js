import test from 'tape';
import createEventHandlers from '../src/create-event-handlers';
import MockComponent from './helpers/mock-component';

test('eventHandlers.onAdPlay() when state of adHasPlayed is false', (t) => {
  let onAdPlayCalled = false;
  let onAdResumeCalled = false;

  const mockComponent = new MockComponent({
    initialState: { adHasPlayed: false },
    onAdPlay() {
      onAdPlayCalled = true;
    },
    onAdResume() {
      onAdResumeCalled = true;
    }
  });

  const mockEvent = 'event';
  const onAdPlay = createEventHandlers(mockComponent).onAdPlay;

  t.doesNotThrow(onAdPlay.bind(null, mockEvent), 'it runs without error');
  t.ok(onAdPlayCalled, 'it calls the supplied onAdPlay() prop');
  t.notOk(onAdResumeCalled, 'it does not call the supplied onAdResume() prop');
  t.ok(mockComponent.state.adHasPlayed, 'it sets adHasPlayed to true in the component state');

  t.end();
});

test('eventHandlers.onAdPlay() when state of adHasPlayed is true', (t) => {
  let onAdPlayCalled = false;
  let onAdResumeCalled = false;

  const mockComponent = new MockComponent({
    initialState: { adHasPlayed: true },
    onAdPlay() {
      onAdPlayCalled = true;
    },
    onAdResume() {
      onAdResumeCalled = true;
    }
  });

  const mockEvent = 'event';
  const onAdPlay = createEventHandlers(mockComponent).onAdPlay;

  t.doesNotThrow(onAdPlay.bind(null, mockEvent), 'it runs without error');
  t.notOk(onAdPlayCalled, 'it does not call the supplied onAdPlay() prop');
  t.ok(onAdResumeCalled, 'it calls the supplied onAdResume() prop');
  t.equal(mockComponent.state, mockComponent.props.initialState, 'it does not set state');

  t.end();
});
