import test from 'tape';
import createEventHandlers from '../src/create-event-handlers';
import MockComponent from './helpers/mock-component';

function createMockComponent() {
  const results = {};

  return {
    mockComponent: new MockComponent({
      initialState: { hasFired: {} },
      onThreeSeconds(event) {
        results.onThreeSecondsCalled = true;
        results.onThreeSecondsArgs = event;
      },
      onTenSeconds(event) {
        results.onTenSecondsCalled = true;
        results.onTenSecondsArgs = event;
      },
      onThirtySeconds(event) {
        results.onThirtySecondsCalled = true;
        results.onThirtySecondsArgs = event;
      },
      onTwentyFivePercent(event) {
        results.onTwentyFivePercentCalled = true;
        results.onTwentyFivePercentArgs = event;
      },
      onFiftyPercent(event) {
        results.onFiftyPercentCalled = true;
        results.onFiftyPercentArgs = event;
      },
      onSeventyFivePercent(event) {
        results.onSeventyFivePercentCalled = true;
        results.onSeventyFivePercentArgs = event;
      },
      onNinetyFivePercent(event) {
        results.onNinetyFivePercentCalled = true;
        results.onNinetyFivePercentArgs = event;
      },
    }),
    results,
  };
}

test('eventHandlers.onTime() when video position is less than 3', (t) => {
  const { mockComponent, results } = createMockComponent();

  const mockEvent = {
    duration: 100,
    position: 3,
  };
  const onTime = createEventHandlers(mockComponent).onTime;

  t.doesNotThrow(onTime.bind(null, mockEvent), 'it runs without error');
  t.deepEqual(
    mockComponent.state.hasFired,
    {},
    'it does not add any events into component state hasFired object',
  );
  t.notOk(results.onThreeSecondsCalled, 'it does not call the onThreeSeconds() prop');
  t.notOk(results.onTenSecondsCalled, 'it does not call the onTenSeconds() prop');
  t.notOk(results.onThirtySecondsCalled, 'it does not call the onThirtySeconds() prop');
  t.notOk(results.onTwentyFivePercentCalled, 'it does not call the onTwentyFivePercent() prop');
  t.notOk(results.onFiftyPercentCalled, 'it does not call the onFiftyPercent() prop');
  t.notOk(results.onSeventyFivePercentCalled, 'it does not call the onSeventyFivePercent() prop');
  t.notOk(results.onNinetyFivePercentCalled, 'it does not call the onNinetyFivePercent() prop');

  t.end();
});

test('eventHandlers.onTime() when video position is between 3 and 10', (t) => {
  const { mockComponent, results } = createMockComponent();

  const mockEvent = {
    duration: 100,
    position: 7,
  };
  const onTime = createEventHandlers(mockComponent).onTime;

  t.doesNotThrow(onTime.bind(null, mockEvent), 'it runs without error');
  t.deepEqual(
    mockComponent.state.hasFired,
    {
      threeSeconds: true,
    },
    'it adds the proper events into component state hasFired object',
  );
  t.ok(results.onThreeSecondsCalled, 'it calls the onThreeSeconds() prop');
  t.notOk(results.onTenSecondsCalled, 'it does not call the onTenSeconds() prop');
  t.notOk(results.onThirtySecondsCalled, 'it does not call the onThirtySeconds() prop');
  t.notOk(results.onTwentyFivePercentCalled, 'it does not call the onTwentyFivePercent() prop');
  t.notOk(results.onFiftyPercentCalled, 'it does not call the onFiftyPercent() prop');
  t.notOk(results.onSeventyFivePercentCalled, 'it does not call the onSeventyFivePercent() prop');
  t.notOk(results.onNinetyFivePercentCalled, 'it does not call the onNinetyFivePercent() prop');

  results.onThreeSecondsCalled = false;
  const currentState = mockComponent.state;
  mockEvent.position = 8;

  t.doesNotThrow(onTime.bind(null, mockEvent), 'it runs without error one second later');
  t.equal(mockComponent.state, currentState, 'it does not change component state a second time');
  t.notOk(
    results.onThreeSecondsCalled,
    'it does not call the onThreeSeconds() prop a second time',
  );
  t.notOk(
    results.onTenSecondsCalled,
    'it does not call the onTenSeconds() prop',
  );
  t.notOk(
    results.onThirtySecondsCalled,
    'it does not call the onThirtySeconds() prop',
  );
  t.notOk(
    results.onTwentyFivePercentCalled,
    'it does not call the onTwentyFivePercent() prop',
  );
  t.notOk(
    results.onFiftyPercentCalled,
    'it does not call the onFiftyPercent() prop',
  );
  t.notOk(
    results.onSeventyFivePercentCalled,
    'it does not call the onSeventyFivePercent() prop',
  );
  t.notOk(
    results.onNinetyFivePercentCalled,
    'it does not call the onNinetyFivePercent() prop',
  );

  t.end();
});

test('eventHandlers.onTime() when video position is between 10 and 30', (t) => {
  const { mockComponent, results } = createMockComponent();

  const mockEvent = {
    duration: 100,
    position: 11,
  };
  const onTime = createEventHandlers(mockComponent).onTime;

  t.doesNotThrow(onTime.bind(null, mockEvent), 'it runs without error');
  t.deepEqual(
    mockComponent.state.hasFired,
    {
      threeSeconds: true,
      tenSeconds: true,
    },
    'it adds the proper events into component state hasFired object',
  );
  t.ok(results.onThreeSecondsCalled, 'it calls the onThreeSeconds() prop');
  t.ok(results.onTenSecondsCalled, 'it calls the onTenSeconds() prop');
  t.notOk(results.onThirtySecondsCalled, 'it does not call the onThirtySeconds() prop');
  t.notOk(results.onTwentyFivePercentCalled, 'it does not call the onTwentyFivePercent() prop');
  t.notOk(results.onFiftyPercentCalled, 'it does not call the onFiftyPercent() prop');
  t.notOk(results.onSeventyFivePercentCalled, 'it does not call the onSeventyFivePercent() prop');
  t.notOk(results.onNinetyFivePercentCalled, 'it does not call the onNinetyFivePercent() prop');

  results.onThreeSecondsCalled = false;
  results.onTenSecondsCalled = false;
  const currentState = mockComponent.state;
  mockEvent.position = 12;

  t.doesNotThrow(onTime.bind(null, mockEvent), 'it runs without error one second later');
  t.equal(mockComponent.state, currentState, 'it does not change component state a second time');
  t.notOk(
    results.onThreeSecondsCalled,
    'it does not call the onThreeSeconds() prop a second time',
  );
  t.notOk(
    results.onTenSecondsCalled,
    'it does not call the onTenSeconds() prop a second time',
  );
  t.notOk(
    results.onThirtySecondsCalled,
    'it does not call the onThirtySeconds() prop',
  );
  t.notOk(
    results.onTwentyFivePercentCalled,
    'it does not call the onTwentyFivePercent() prop',
  );
  t.notOk(
    results.onFiftyPercentCalled,
    'it does not call the onFiftyPercent() prop',
  );
  t.notOk(
    results.onSeventyFivePercentCalled,
    'it does not call the onSeventyFivePercent() prop',
  );
  t.notOk(
    results.onNinetyFivePercentCalled,
    'it does not call the onNinetyFivePercent() prop',
  );

  t.end();
});

test('eventHandlers.onTime() when video position is above 30 seconds', (t) => {
  const { mockComponent, results } = createMockComponent();

  const mockEvent = {
    duration: 100,
    position: 31,
  };
  const onTime = createEventHandlers(mockComponent).onTime;

  t.doesNotThrow(onTime.bind(null, mockEvent), 'it runs without error');
  t.deepEqual(
    mockComponent.state.hasFired,
    {
      threeSeconds: true,
      tenSeconds: true,
      thirtySeconds: true,
      twentyFivePercent: true,
    },
    'it adds the proper events into component state hasFired object',
  );
  t.ok(results.onThreeSecondsCalled, 'it calls the onThreeSeconds() prop');
  t.ok(results.onTenSecondsCalled, 'it calls the onTenSeconds() prop');
  t.ok(results.onThirtySecondsCalled, 'it calls the onThirtySeconds() prop');
  t.ok(results.onTwentyFivePercentCalled, 'it does not call the onTwentyFivePercent() prop');
  t.notOk(results.onFiftyPercentCalled, 'it does not call the onFiftyPercent() prop');
  t.notOk(results.onSeventyFivePercentCalled, 'it does not call the onSeventyFivePercent() prop');
  t.notOk(results.onNinetyFivePercentCalled, 'it does not call the onNinetyFivePercent() prop');

  results.onThreeSecondsCalled = false;
  results.onTenSecondsCalled = false;
  results.onThirtySecondsCalled = false;
  results.onTwentyFivePercentCalled = false;
  const currentState = mockComponent.state;
  mockEvent.position = 32;

  t.doesNotThrow(onTime.bind(null, mockEvent), 'it runs without error one second later');
  t.equal(mockComponent.state, currentState, 'it does not change component state a second time');
  t.notOk(
    results.onThreeSecondsCalled,
    'it does not call the onThreeSeconds() prop a second time',
  );
  t.notOk(
    results.onTenSecondsCalled,
    'it does not call the onTenSeconds() prop a second time',
  );
  t.notOk(
    results.onThirtySecondsCalled,
    'it does not call the onThirtySeconds() prop a second time',
  );
  t.notOk(
    results.onTwentyFivePercentCalled,
    'it does not call the onTwentyFivePercent() prop',
  );
  t.notOk(
    results.onFiftyPercentCalled,
    'it does not call the onFiftyPercent() prop',
  );
  t.notOk(
    results.onSeventyFivePercentCalled,
    'it does not call the onSeventyFivePercent() prop',
  );
  t.notOk(
    results.onNinetyFivePercentCalled,
    'it does not call the onNinetyFivePercent() prop',
  );

  t.end();
});

test('eventHandlers.onTime() when video position is above 50 and below 75', (t) => {
  const { mockComponent, results } = createMockComponent();

  const mockEvent = {
    duration: 100,
    position: 51,
  };
  const onTime = createEventHandlers(mockComponent).onTime;

  t.doesNotThrow(onTime.bind(null, mockEvent), 'it runs without error');
  t.deepEqual(
    mockComponent.state.hasFired,
    {
      threeSeconds: true,
      tenSeconds: true,
      thirtySeconds: true,
      twentyFivePercent: true,
      fiftyPercent: true,
    },
    'it adds the proper events into component state hasFired object',
  );
  t.ok(results.onThreeSecondsCalled, 'it calls the onThreeSeconds() prop');
  t.ok(results.onTenSecondsCalled, 'it calls the onTenSeconds() prop');
  t.ok(results.onThirtySecondsCalled, 'it calls the onThirtySeconds() prop');
  t.ok(results.onTwentyFivePercentCalled, 'it does not call the onTwentyFivePercent() prop');
  t.ok(results.onFiftyPercentCalled, 'it does not call the onFiftyPercent() prop');
  t.notOk(results.onSeventyFivePercentCalled, 'it does not call the onSeventyFivePercent() prop');
  t.notOk(results.onNinetyFivePercentCalled, 'it does not call the onNinetyFivePercent() prop');

  results.onThreeSecondsCalled = false;
  results.onTenSecondsCalled = false;
  results.onThirtySecondsCalled = false;
  results.onTwentyFivePercentCalled = false;
  results.onTwentyFivePercentCalled = false;
  results.onFiftyPercentCalled = false;
  results.onTwentyFivePercentCalled = false;
  const currentState = mockComponent.state;
  mockEvent.position = 52;

  t.doesNotThrow(onTime.bind(null, mockEvent), 'it runs without error one second later');
  t.equal(mockComponent.state, currentState, 'it does not change component state a second time');
  t.notOk(
    results.onThreeSecondsCalled,
    'it does not call the onThreeSeconds() prop a second time',
  );
  t.notOk(
    results.onTenSecondsCalled,
    'it does not call the onTenSeconds() prop a second time',
  );
  t.notOk(
    results.onThirtySecondsCalled,
    'it does not call the onThirtySeconds() prop a second time',
  );
  t.notOk(
    results.onTwentyFivePercentCalled,
    'it does not call the onTwentyFivePercent() prop',
  );
  t.notOk(
    results.onFiftyPercentCalled,
    'it does not call the onFiftyPercent() prop',
  );
  t.notOk(
    results.onSeventyFivePercentCalled,
    'it does not call the onSeventyFivePercent() prop',
  );
  t.notOk(
    results.onNinetyFivePercentCalled,
    'it does not call the onNinetyFivePercent() prop',
  );

  t.end();
});

test('eventHandlers.onTime() when video position is above 75', (t) => {
  const { mockComponent, results } = createMockComponent();

  const mockEvent = {
    duration: 100,
    position: 76,
  };
  const onTime = createEventHandlers(mockComponent).onTime;

  t.doesNotThrow(onTime.bind(null, mockEvent), 'it runs without error');
  t.deepEqual(
    mockComponent.state.hasFired,
    {
      threeSeconds: true,
      tenSeconds: true,
      thirtySeconds: true,
      twentyFivePercent: true,
      fiftyPercent: true,
      seventyFivePercent: true,
    },
    'it adds the proper events into component state hasFired object',
  );
  t.ok(results.onThreeSecondsCalled, 'it calls the onThreeSeconds() prop');
  t.ok(results.onTenSecondsCalled, 'it calls the onTenSeconds() prop');
  t.ok(results.onThirtySecondsCalled, 'it calls the onThirtySeconds() prop');
  t.ok(results.onTwentyFivePercentCalled, 'it does not call the onTwentyFivePercent() prop');
  t.ok(results.onFiftyPercentCalled, 'it does not call the onFiftyPercent() prop');
  t.ok(results.onSeventyFivePercentCalled, 'it does not call the onSeventyFivePercent() prop');
  t.notOk(results.onNinetyFivePercentCalled, 'it does not call the onNinetyFivePercent() prop');

  results.onThreeSecondsCalled = false;
  results.onTenSecondsCalled = false;
  results.onThirtySecondsCalled = false;
  results.onTwentyFivePercentCalled = false;
  results.onFiftyPercentCalled = false;
  results.onSeventyFivePercentCalled = false;
  const currentState = mockComponent.state;
  mockEvent.position = 77;

  t.doesNotThrow(onTime.bind(null, mockEvent), 'it runs without error one second later');
  t.equal(mockComponent.state, currentState, 'it does not change component state a second time');
  t.notOk(
    results.onThreeSecondsCalled,
    'it does not call the onThreeSeconds() prop a second time',
  );
  t.notOk(
    results.onTenSecondsCalled,
    'it does not call the onTenSeconds() prop a second time',
  );
  t.notOk(
    results.onThirtySecondsCalled,
    'it does not call the onThirtySeconds() prop a second time',
  );
  t.notOk(
    results.onTwentyFivePercentCalled,
    'it does not call the onTwentyFivePercent() prop',
  );
  t.notOk(
    results.onFiftyPercentCalled,
    'it does not call the onFiftyPercent() prop',
  );
  t.notOk(
    results.onSeventyFivePercentCalled,
    'it does not call the onSeventyFivePercent() prop',
  );
  t.notOk(
    results.onNinetyFivePercentCalled,
    'it does not call the onNinetyFivePercent() prop',
  );

  t.end();
});

test('eventHandlers.onTime() when video position is beyond ninety five percent', (t) => {
  const { mockComponent, results } = createMockComponent();

  const mockEvent = {
    duration: 100,
    position: 96,
  };
  const onTime = createEventHandlers(mockComponent).onTime;

  t.doesNotThrow(onTime.bind(null, mockEvent), 'it runs without error');
  t.deepEqual(
    mockComponent.state.hasFired,
    {
      threeSeconds: true,
      tenSeconds: true,
      thirtySeconds: true,
      twentyFivePercent: true,
      fiftyPercent: true,
      seventyFivePercent: true,
      ninetyFivePercent: true,
    },
    'it adds the proper events into component state hasFired object',
  );
  t.ok(results.onThreeSecondsCalled, 'it calls the onThreeSeconds() prop');
  t.ok(results.onTenSecondsCalled, 'it calls the onTenSeconds() prop');
  t.ok(results.onThirtySecondsCalled, 'it calls the onThirtySeconds() prop');
  t.ok(results.onTwentyFivePercentCalled, 'it does not call the onTwentyFivePercent() prop');
  t.ok(results.onFiftyPercentCalled, 'it does not call the onFiftyPercent() prop');
  t.ok(results.onSeventyFivePercentCalled, 'it does not call the onSeventyFivePercent() prop');
  t.ok(results.onNinetyFivePercentCalled, 'it calls the onNinetyFivePercent() prop');

  results.onThreeSecondsCalled = false;
  results.onTenSecondsCalled = false;
  results.onThirtySecondsCalled = false;
  results.onTwentyFivePercentCalled = false;
  results.onFiftyPercentCalled = false;
  results.onSeventyFivePercentCalled = false;
  results.onNinetyFivePercentCalled = false;
  const currentState = mockComponent.state;
  mockEvent.position = 97;

  t.doesNotThrow(onTime.bind(null, mockEvent), 'it runs without error one second later');
  t.equal(mockComponent.state, currentState, 'it does not change component state a second time');
  t.notOk(
    results.onThreeSecondsCalled,
    'it does not call the onThreeSeconds() prop a second time',
  );
  t.notOk(
    results.onTenSecondsCalled,
    'it does not call the onTenSeconds() prop a second time',
  );
  t.notOk(
    results.onThirtySecondsCalled,
    'it does not call the onThirtySeconds() prop a second time',
  );
  t.notOk(
    results.onTwentyFivePercentCalled,
    'it does not call the onTwentyFivePercent() prop',
  );
  t.notOk(
    results.onFiftyPercentCalled,
    'it does not call the onFiftyPercent() prop',
  );
  t.notOk(
    results.onSeventyFivePercentCalled,
    'it does not call the onSeventyFivePercent() prop',
  );
  t.notOk(
    results.onNinetyFivePercentCalled,
    'it does not call the onNinetyFivePercent() prop a second time',
  );

  t.end();
});
