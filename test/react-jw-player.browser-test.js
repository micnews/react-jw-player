import jsdomGlobal from 'jsdom-global';
import React from 'react';
import { mount } from 'enzyme';
import test from 'tape';

import ReactJWPlayer from '../src/react-jw-player';

jsdomGlobal();

test('<ReactJWPlayer> when no jwplayer script is present', (t) => {
  const testPlayerId = 'playerOne';
  const initializeCalls = [];

  function stubbedInitialize() {
    initializeCalls.push(this.props.playerId);
  }

  ReactJWPlayer.prototype._initialize = stubbedInitialize;

  mount(
    <ReactJWPlayer
      playerId={testPlayerId}
      playerScript='script'
      playlist='playlist'
    />,
  );

  const script = document.querySelector('#jw-player-script');
  t.ok(script, 'it installs the jw player script');

  t.equal(typeof script.onload, 'function', 'it sets script.onload to a function');

  script.onload();
  t.deepEqual(
    initializeCalls, [testPlayerId],
    'script onload calls initialize on the mounted component',
  );

  t.end();
});

test('<ReactJWPlayer> when jwplayer script is present and useMultiplePlayers=false', (t) => {
  const testPlayerId = 'playerOne';
  const testPlayerIdTwo = 'playerTwo';
  const testPlayerIdThree = 'playerThree';
  const testArrayPlaylist = [{
    file: 'file',
  }];
  const initializeCalls = [];

  function stubbedInitialize() {
    initializeCalls.push(this.props.playerId);
  }

  ReactJWPlayer.prototype._initialize = stubbedInitialize;

  mount(
    <ReactJWPlayer
      playerId={testPlayerId}
      playerScript='script'
      playlist='playlist'
    />,
  );

  mount(
    <ReactJWPlayer
      playerId={testPlayerIdTwo}
      playerScript='script'
      playlist='playlist'
    />,
  );

  mount(
    <ReactJWPlayer
      playerId={testPlayerIdThree}
      playerScript='script'
      playlist={testArrayPlaylist}
    />,
  );

  const script = document.querySelector('#jw-player-script');

  t.equal(typeof script.onload, 'function', 'it sets script.onload to a function');

  script.onload();

  t.deepEqual(
    initializeCalls, [testPlayerId, testPlayerIdTwo, testPlayerIdThree],
    'script onload calls initialize on all mounted component',
  );

  t.end();
});

test('<ReactJWPlayer> when jwplayer script is present and useMultiplePlayers=true', (t) => {
  const testPlayerId = 'playerOne';
  const testPlayerIdTwo = 'playerTwo';
  const testPlayerIdThree = 'playerThree';
  const testArrayPlaylist = [{
    file: 'file',
  }];
  const initializeCalls = [];

  function stubbedInitialize() {
    initializeCalls.push(this.props.playerId);
  }

  ReactJWPlayer.prototype._initialize = stubbedInitialize;

  mount(
    <ReactJWPlayer
      playerId={testPlayerId}
      playerScript='script'
      playlist='playlist'
      useMultiplePlayers={true}
    />,
  );

  mount(
    <ReactJWPlayer
      playerId={testPlayerIdTwo}
      playerScript='script'
      playlist='playlist'
      useMultiplePlayers={true}
    />,
  );

  mount(
    <ReactJWPlayer
      playerId={testPlayerIdThree}
      playerScript='script'
      playlist={testArrayPlaylist}
      useMultiplePlayers={true}
    />,
  );

  const script = document.querySelector(`#jw-player-script-${testPlayerId}`);
  const scriptTwo = document.querySelector(`#jw-player-script-${testPlayerIdTwo}`);
  const scriptThree = document.querySelector(`#jw-player-script-${testPlayerIdThree}`);

  t.equal(typeof script.onload, 'function', 'it sets script.onload to a function');
  t.equal(typeof scriptTwo.onload, 'function', 'it sets script.onload to a function');
  t.equal(typeof scriptThree.onload, 'function', 'it sets script.onload to a function');

  script.onload();
  t.deepEqual(
    initializeCalls, [testPlayerId],
    'original script onload calls first script only',
  );

  scriptTwo.onload();
  t.deepEqual(
    initializeCalls, [testPlayerId, testPlayerIdTwo],
    'second script onload calls second script only',
  );

  scriptThree.onload();
  t.deepEqual(
    initializeCalls, [testPlayerId, testPlayerIdTwo, testPlayerIdThree],
    'third script onload calls third script only',
  );

  t.end();
});

test('<ReactJWPlayer> componentDidUpdate()', (t) => {
  let initializeDidRun;

  const componentDidUpdate = new ReactJWPlayer({}).componentDidUpdate.bind({
    props: {
      playerId: 'foobar',
    },
    _initialize: () => { initializeDidRun = true; },
  });

  if (window.jwplayer) {
    delete window.jwplayer;
  }

  t.doesNotThrow(
    () => componentDidUpdate(),
    'it runs without error when jwplayer has not initialized',
  );

  t.notOk(
    initializeDidRun,
    'it does not call this._initialize() when jwplayer has not initialized yet',
  );

  global.window.jwplayer = () => 'jwplayer';

  t.doesNotThrow(
    () => componentDidUpdate(),
    'it runs without error when jwplayer has initialized',
  );

  t.ok(
    initializeDidRun,
    'it does call this._initialize() when jwplayer has not initialized yet',
  );

  t.end();
});
