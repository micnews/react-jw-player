/* flow */
import initializeGlobals from 'jsdom-global';
import React from 'react';
import { mount, shallow } from 'enzyme';
import test from 'tape';

import ReactJWPlayerBase from './';

test('<ReactJWPlayerBase />', (t) => {
  const playerId = 'react-jw-player';
  const wrapper = shallow(<ReactJWPlayerBase playerId={playerId} />);

  t.is(wrapper.first().node.type, 'div', 'the root node is a div');

  t.deepEqual(
    wrapper.first().props().dangerouslySetInnerHTML,
    { __html: `<div id="${playerId}"></div>` },
    'it dangerously sets inner html to a div with the supplied id',
  );

  t.end();
});

test('<ReactJWPlayerBase> with a supplied class', (t) => {
  const className = 'className';
  const playerId = 'playerId';
  const wrapper = shallow(
    <ReactJWPlayerBase className={className} playerId={playerId} />,
  );

  t.ok(
    wrapper.first().hasClass(className),
    'it gives the outer div the supplied class name',
  );

  t.end();
});

test('ReactJWPlayer().shouldComponentUpdate() with no change', (t) => {
  const propsOne = {
    config: {
      file: null,
      playlist: 'playlist',
    },
    playerId: 'playerId',
  };

  const propsTwo = {
    config: {
      file: null,
      playlist: 'playlist',
    },
    playerId: 'playerId',
  };

  const { shouldComponentUpdate } = shallow(
    <ReactJWPlayerBase {...propsOne} />,
  ).instance();

  t.notOk(
    shouldComponentUpdate.bind({ props: propsOne })(propsTwo),
    'it returns false when the props are the same',
  );

  t.end();
});

test('ReactJWPlayer().shouldComponentUpdate() with playlist change', (t) => {
  const propsOne = {
    config: {
      file: null,
      playlist: 'playlist',
    },
    playerId: 'playerId',
  };

  const propsTwo = {
    config: {
      file: null,
      playlist: 'another playlist',
    },
    playerId: 'playerId',
  };

  const { shouldComponentUpdate } = shallow(
    <ReactJWPlayerBase {...propsOne} />,
  ).instance();

  t.ok(
    shouldComponentUpdate.bind({ props: propsOne })(propsTwo),
    'it returns true when the playlist has changed',
  );

  t.end();
});

test('ReactJWPlayer().shouldComponentUpdate() with file change', (t) => {
  const propsOne = {
    config: {
      file: 'file',
      playlist: null,
    },
    playerId: 'playerId',
  };

  const propsTwo = {
    config: {
      file: 'different file',
      playlist: null,
    },
    playerId: 'playerId',
  };

  const { shouldComponentUpdate } = shallow(
    <ReactJWPlayerBase {...propsOne} />,
  ).instance();

  t.ok(
    shouldComponentUpdate.bind({ props: propsOne })(propsTwo),
    'it returns true when the file has changed',
  );

  t.end();
});

test('<ReactJWPlayer> when no jwplayer script is present', (t) => {
  const cleanup = initializeGlobals();
  const testPlayerId = 'playerOne';
  const initializeCalls = [];

  function initializeJWPLayer() {
    initializeCalls.push(this.props.playerId);
  }

  ReactJWPlayerBase.prototype.initializeJWPlayer = initializeJWPLayer;

  mount(
    <ReactJWPlayerBase
      playerId={testPlayerId}
      playerScript='script'
      config={{
        playlist: 'playlist',
      }}
    />,
  );

  const script = global.document.querySelector('#jw-player-script');
  t.ok(script, 'it installs the jw player script');

  t.equal(
    typeof script.onload,
    'function',
    'it sets script.onload to a function',
  );

  script.onload();
  t.deepEqual(
    initializeCalls,
    [testPlayerId],
    'script onload calls initialize on the mounted component',
  );

  t.end();
  cleanup();
});

test('<ReactJWPlayer> when jwplayer script is present', (t) => {
  const cleanup = initializeGlobals();

  const testPlayerId = 'playerOne';
  const testPlayerIdTwo = 'playerTwo';
  const testPlayerIdThree = 'playerThree';
  const testArrayPlaylist = [
    {
      file: 'file',
    },
  ];
  const initializeCalls = [];

  function initializeJWPlayer() {
    initializeCalls.push(this.props.playerId);
  }

  ReactJWPlayerBase.prototype.initializeJWPlayer = initializeJWPlayer;

  mount(
    <ReactJWPlayerBase
      playerId={testPlayerId}
      playerScript='script'
      config={{
        playlist: 'playlist',
      }}
    />,
  );

  mount(
    <ReactJWPlayerBase
      playerId={testPlayerIdTwo}
      playerScript='script'
      playlist='playlist'
    />,
  );

  mount(
    <ReactJWPlayerBase
      playerId={testPlayerIdThree}
      playerScript='script'
      playlist={testArrayPlaylist}
    />,
  );

  const script = global.document.querySelector('#jw-player-script');
  t.equal(
    typeof script.onload,
    'function',
    'it sets script.onload to a function',
  );

  script.onload();
  t.deepEqual(
    initializeCalls,
    [testPlayerId, testPlayerIdTwo, testPlayerIdThree],
    'script onload calls initialize on all mounted component',
  );

  t.end();
  cleanup();
});

test('<ReactJWPlayer> componentDidUpdate()', (t) => {
  const cleanup = initializeGlobals();
  let initializeDidRun;

  const componentDidUpdate = new ReactJWPlayerBase().componentDidUpdate.bind({
    props: {
      playerId: 'foobar',
    },
    initializeJWPlayer: () => {
      initializeDidRun = true;
    },
  });

  if (global.window.jwplayer) {
    delete global.window.jwplayer;
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
  cleanup();
});
