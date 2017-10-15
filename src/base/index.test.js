/* flow */
import React from 'react';
import { shallow } from 'enzyme';
import test from 'tape';

import ReactJWPlayerBase from './';

test('<ReactJWPlayerBase />', t => {
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

test('<ReactJWPlayerBase> with a supplied class', t => {
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

test('ReactJWPlayer().shouldComponentUpdate() with no change', t => {
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

test('ReactJWPlayer().shouldComponentUpdate() with playlist change', t => {
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

test('ReactJWPlayer().shouldComponentUpdate() with file change', t => {
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
