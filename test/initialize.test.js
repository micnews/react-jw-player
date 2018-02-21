import test from 'tape';
import initialize from '../src/helpers/initialize';

test('initialize()', (t) => {
  let onBeforePlayCalled = false;
  let onBeforePlayEvent;
  let onBeforePlayPlayer;
  let setupCalled = false;
  let setupArgs;

  const playerFunctions = {};

  const mockComponent = {
    eventHandlers: {
      onBeforePlay(event, player) {
        onBeforePlayCalled = true;
        onBeforePlayEvent = event;
        onBeforePlayPlayer = player;
      },
      onAdPlay: 'onAdPlay',
      onFullScreen: 'onFullScreen',
      onPlay: 'onPlay',
      onMute: 'onMute',
      onVideoLoad: 'onVideoLoad',
      onTime: 'onTime',
    },
    props: {
      onAdPause: 'onAdPause',
      onAdSkipped: 'onAdSkipped',
      onAdComplete: 'onAdComplete',
      onOneHundredPercent: 'onOneHundredPercent',
      onPause: 'onPause',
      onReady: 'onReady',
      onError: 'onError',
      onBuffer: 'onBuffer',
      onBufferChange: 'onBufferChange',
      onSetupError: 'onSetupError',
    },
  };

  const mockPlayer = {
    on(key, value) {
      playerFunctions[key] = value;
    },
    setup(args) {
      setupCalled = true;
      setupArgs = args;
    },
  };

  const mockPlayerOpts = 'mockPlayerOpts';

  const mockInitializeOpts = {
    component: mockComponent,
    player: mockPlayer,
    playerOpts: mockPlayerOpts,
  };

  t.doesNotThrow(initialize.bind(null, mockInitializeOpts), 'it runs without error');
  t.ok(setupCalled, 'it calls player.setup()');
  t.equal(setupArgs, mockPlayerOpts, 'it passes the playerOpts to player.setup()');

  t.equal(
    typeof playerFunctions.beforePlay, 'function',
    'it sets the beforePlay event to a function',
  );

  const mockEvent = 'mockEvent';
  playerFunctions.beforePlay(mockEvent);

  t.ok(onBeforePlayCalled, 'the beforePlay function calls the eventHandler onBeforePlay function');
  t.equal(onBeforePlayEvent, mockEvent, 'it passes the eventObject to onBeforePlay()');
  t.equal(onBeforePlayPlayer, mockPlayer, 'it passes the player to onBeforePlay()');

  t.equal(
    playerFunctions.ready, mockComponent.props.onReady,
    'it sets the ready event with the onReady() prop',
  );

  t.equal(
    playerFunctions.adPause, mockComponent.props.onAdPause,
    'it sets the adPause event with the onAdPause() prop',
  );

  t.equal(
    playerFunctions.adSkipped, mockComponent.props.onAdSkipped,
    'it sets the adSkipped event with the onAdSkipped() prop',
  );

  t.equal(
    playerFunctions.adComplete, mockComponent.props.onAdComplete,
    'it sets the adComplete event with the onAdComplete() prop',
  );

  t.equal(
    playerFunctions.pause, mockComponent.props.onPause,
    'it sets the pause event with the onPause() prop',
  );

  t.equal(
    playerFunctions.beforeComplete, mockComponent.props.onOneHundredPercent,
    'it sets the beforeComplete event with the onOneHundredPercent() prop',
  );

  t.equal(
    playerFunctions.setupError, mockComponent.props.onSetupError,
    'it sets the setupError event with the onError() prop',
  );

  t.equal(
    playerFunctions.error, mockComponent.props.onError,
    'it sets the error event with the onError() prop',
  );

  t.equal(
    playerFunctions.adPlay, mockComponent.eventHandlers.onAdPlay,
    'it sets the adPlay event with the onAdPlay() eventHandler',
  );

  t.equal(
    playerFunctions.fullscreen, mockComponent.eventHandlers.onFullScreen,
    'it sets the fullscreen event with the onFullScreen() eventHandler',
  );

  t.equal(
    playerFunctions.play, mockComponent.eventHandlers.onPlay,
    'it sets the play event with the onPlay() eventHandler',
  );

  t.equal(
    playerFunctions.mute, mockComponent.eventHandlers.onMute,
    'it sets the mute event with the onMute() eventHandler',
  );

  t.equal(
    playerFunctions.playlistItem, mockComponent.eventHandlers.onVideoLoad,
    'it sets the playlistItem event with the onVideoLoad() eventHandler',
  );

  t.equal(
    playerFunctions.time, mockComponent.eventHandlers.onTime,
    'it sets the time event with the onTime() eventHandler',
  );

  t.equal(
    playerFunctions.buffer, mockComponent.props.onBuffer,
    'it sets the time event with the onBuffer() eventHandler',
  );

  t.equal(
    playerFunctions.bufferChange, mockComponent.props.onBufferChange,
    'it sets the time event with the onBufferChange() eventHandler',
  );

  t.end();
});
