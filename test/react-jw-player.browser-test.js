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

test('<ReactJWPlayer> when jwplayer script is present', (t) => {
  const testPlayerId = 'playerOne';
  const testPlayerIdTwo = 'playerTwo';
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


  const script = document.querySelector('#jw-player-script');
  t.equal(typeof script.onload, 'function', 'it sets script.onload to a function');

  script.onload();
  t.deepEqual(
    initializeCalls, [testPlayerId, testPlayerIdTwo],
    'script onload calls initialize on both mounted component',
  );

  t.end();
});
