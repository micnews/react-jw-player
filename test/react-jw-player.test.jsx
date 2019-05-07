/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { shallow } from 'enzyme';
import test from 'tape';

import ReactJWPlayer from '../src/react-jw-player';

test('<ReactJWPlayer>', (t) => {
  const testPlayerId = 'robocop';
  const wrapper = shallow(
    <ReactJWPlayer
      playerId={testPlayerId}
      playerScript='script'
      playlist='playlist'
    />,
  );
  const root = wrapper.first();

  const initialState = wrapper.state();
  t.deepEqual(initialState.hasFired, {}, 'it inits state.hasFired to an empty object');
  t.notOk(initialState.adHasPlayed, 'it inits state.asHasPlayed to false');
  t.notOk(initialState.hasPlayed, 'it inits state.hasPlayed to false');

  t.is(
    root.node.type,
    'div',
    'it renders a div as the root node',
  );

  t.end();
});

test('<ReactJWPlayer> with a supplied class', (t) => {
  const testClassName = 'legumes';
  const testPlayerId = 'snek';
  const wrapper = shallow(
    <ReactJWPlayer
      className={testClassName}
      playerId={testPlayerId}
      playerScript='script'
      playlist='playlist'
    />,
  );

  t.ok(
    wrapper.first().hasClass(testClassName),
    'it gives the outer div the supplied class name',
  );

  t.end();
});

test('ReactJWPlayer().shouldComponentUpdate() with no change', (t) => {
  const propsOne = {
    file: null,
    playlist: 'playlist',
  };

  const propsTwo = {
    file: null,
    playlist: 'playlist',
  };

  const shouldComponentUpdate = new ReactJWPlayer({}).shouldComponentUpdate.bind({
    props: propsOne,
  });

  t.notOk(
    shouldComponentUpdate(propsTwo),
    'it returns false when the props are the same',
  );

  t.end();
});

test('ReactJWPlayer().shouldComponentUpdate() with playlist change', (t) => {
  const propsOne = {
    file: null,
    playlist: 'playlist',
  };

  const propsTwo = {
    file: null,
    playlist: 'playlistTwo',
  };

  const shouldComponentUpdate = new ReactJWPlayer({}).shouldComponentUpdate.bind({
    props: propsOne,
  });

  t.ok(
    shouldComponentUpdate(propsTwo),
    'it returns true when the playlist prop changes',
  );

  t.end();
});

test('ReactJWPlayer().shouldComponentUpdate() with file change', (t) => {
  const propsOne = {
    file: 'file',
    playlist: null,
  };

  const propsTwo = {
    file: 'fileTwo',
    playlist: null,
  };

  const shouldComponentUpdate = new ReactJWPlayer({}).shouldComponentUpdate.bind({
    props: propsOne,
  });

  t.ok(
    shouldComponentUpdate(propsTwo),
    'it returns true when the file prop changes',
  );

  t.end();
});

test('ReactJWPlayer().shouldComponentUpdate() with sources change', (t) => {
  const propsOne = {
    sources: [
      { file: 'mock file hd 1', label: 'HD' },
      { file: 'mock file sd 1', label: 'SD' },
    ],
  };

  const propsTwo = {
    sources: [
      { file: 'mock file hd 2', label: 'HD' },
      { file: 'mock file sd 2', label: 'SD' },
    ],
  };

  const shouldComponentUpdate = new ReactJWPlayer({}).shouldComponentUpdate.bind({
    props: propsOne,
  });

  t.ok(
    shouldComponentUpdate(propsTwo),
    'it returns true when the file prop changes',
  );

  t.end();
});
