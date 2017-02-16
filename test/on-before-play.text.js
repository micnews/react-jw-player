import test from 'tape';
import createEventHandlers from '../src/create-event-handlers';
import MockComponent from './helpers/mock-component';

test('eventHandlers.onBeforePlay() with preroll prop and player has not played', (t) => {
  let generatePrerollUrlCalled = false;
  let generatePrerollUrlArgs;
  let playAdCalled = false;
  let playAdArgs;

  const mockCurrentVideo = 'i am the current video';
  const mockPrerollResponse = 'i am the preroll';

  const mockComponent = new MockComponent({
    initialState: { hasPlayed: false },
    generatePrerollUrl(args) {
      generatePrerollUrlCalled = true;
      generatePrerollUrlArgs = args;
      return mockPrerollResponse;
    },
  });

  const mockJWPlayerInstance = {
    getPlaylistItem() {
      return mockCurrentVideo;
    },
    playAd(args) {
      playAdCalled = true;
      playAdArgs = args;
    },
  };

  const mockEvent = 'event';
  const onBeforePlay = createEventHandlers(mockComponent).onBeforePlay;

  t.doesNotThrow(onBeforePlay.bind(null, mockEvent, mockJWPlayerInstance), 'it runs without error');
  t.ok(generatePrerollUrlCalled, 'it calls the supplied generatePrerollUrl() prop');
  t.equal(
    generatePrerollUrlArgs, mockCurrentVideo,
    'it passes the current video to generatePrerollUrl()',
  );
  t.ok(playAdCalled, 'it calls playAd() on the supplied player instance');
  t.equal(
    playAdArgs, mockPrerollResponse,
    'it passes the response from generatePrerollUrl() to playAd()',
  );

  t.end();
});

test('eventHandlers.onBeforePlay() with preroll prop and player has played', (t) => {
  let generatePrerollUrlCalled = false;
  let playAdCalled = false;

  const mockCurrentVideo = 'i am the current video';

  const mockComponent = new MockComponent({
    initialState: { hasPlayed: true },
    generatePrerollUrl() {
      generatePrerollUrlCalled = true;
    },
  });

  const mockJWPlayerInstance = {
    getPlaylistItem() {
      return mockCurrentVideo;
    },
    playAd() {
      playAdCalled = true;
    },
  };

  const mockEvent = 'event';
  const onBeforePlay = createEventHandlers(mockComponent).onBeforePlay;

  t.doesNotThrow(onBeforePlay.bind(null, mockEvent, mockJWPlayerInstance), 'it runs without error');
  t.notOk(generatePrerollUrlCalled, 'it does not call the supplied generatePrerollUrl() prop');
  t.notOk(playAdCalled, 'it does not call playAd() on the supplied player instance');

  t.end();
});

test('eventHandlers.onBeforePlay() without preroll prop and player has not played', (t) => {
  let playAdCalled = false;

  const mockCurrentVideo = 'i am the current video';

  const mockComponent = new MockComponent({
    initialState: { hasPlayed: false },
  });

  const mockJWPlayerInstance = {
    getPlaylistItem() {
      return mockCurrentVideo;
    },
    playAd() {
      playAdCalled = true;
    },
  };

  const mockEvent = 'event';
  const onBeforePlay = createEventHandlers(mockComponent).onBeforePlay;

  t.doesNotThrow(onBeforePlay.bind(null, mockEvent, mockJWPlayerInstance), 'it runs without error');
  t.notOk(playAdCalled, 'it does not call playAd() on the supplied player instance');

  t.end();
});

test('eventHandlers.onBeforePlay() without preroll prop and player has played', (t) => {
  let playAdCalled = false;

  const mockCurrentVideo = 'i am the current video';

  const mockComponent = new MockComponent({
    initialState: { hasPlayed: true },
  });

  const mockJWPlayerInstance = {
    getPlaylistItem() {
      return mockCurrentVideo;
    },
    playAd() {
      playAdCalled = true;
    },
  };

  const mockEvent = 'event';
  const onBeforePlay = createEventHandlers(mockComponent).onBeforePlay;

  t.doesNotThrow(onBeforePlay.bind(null, mockEvent, mockJWPlayerInstance), 'it runs without error');
  t.notOk(playAdCalled, 'it does not call playAd() on the supplied player instance');

  t.end();
});
