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
    />
  );
  const root = wrapper.first();

  const initialState = wrapper.state();
  t.deepEqual(initialState.hasFired, {}, 'it inits state.hasFired to an empty object');
  t.notOk(initialState.adHasPlayed, 'it inits state.asHasPlayed to false');
  t.notOk(initialState.hasPlayed, 'it inits state.hasPlayed to false');

  t.is(
    root.node.type,
    'div',
    'it renders a div as the root node'
  );

  t.ok(
    root.is(`#${testPlayerId}`),
    'it gives the root div an id equal to the supplied playerId'
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
    />
  );

  t.ok(
    wrapper.first().hasClass(testClassName),
    'it gives the outer div the supplied class name'
  );

  t.end();
});
