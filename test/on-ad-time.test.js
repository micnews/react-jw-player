import test from 'tape';
import createEventHandlers from '../src/create-event-handlers';
import MockComponent from './helpers/mock-component';

function createMockComponent() {
  const results = {
    onEverySecondCallCount: 0,
  };

  return {
    mockComponent: new MockComponent({
      initialState: { },
      onEverySecond(event) {
        results.onEverySecondCallCount += 1;
        results.onEverySecondArgs = event;
      },
    }),
    results,
  };
}

test('eventHandlers.onEverySecond() when video position is from 0 to 2', (t) => {
  const { mockComponent, results } = createMockComponent();

  const mockEvent = {
    duration: 100,
    position: 0,
  };
  const onAdTime = createEventHandlers(mockComponent).onAdTime;

  t.doesNotThrow(onAdTime.bind(null, mockEvent), 'it runs without error');
  t.deepEqual(results.onEverySecondCallCount, 0, 'it does not invoke onEverySecond() prop on initial call');

  mockEvent.position = 1;

  t.doesNotThrow(onAdTime.bind(null, mockEvent), 'it runs without error one second later');
  t.deepEqual(results.onEverySecondCallCount, 1, 'it invoke onEverySecond() prop at one second');
  t.deepEqual(mockComponent.state.previousPositionInteger, 1, 'stores 1 as previous position');

  mockEvent.position = 2;

  t.doesNotThrow(onAdTime.bind(null, mockEvent), 'it runs without error one second later');
  t.deepEqual(results.onEverySecondCallCount, 2, 'it invoke onEverySecond() prop at two seconds');
  t.deepEqual(mockComponent.state.previousPositionInteger, 2, 'stores 2 as previous position');

  t.end();
});
