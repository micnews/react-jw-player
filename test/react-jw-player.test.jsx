import React from 'react';
import { shallow } from 'enzyme';
import test from 'tape-catch';

import JWPlayer from './';

test('<JWPlayer>', (t) => {
  const testPlayerId = 'robocop';
  const wrapper = shallow(<JWPlayer playerId={testPlayerId} />);
  const root = wrapper.first();

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

test('<JWPlayer> with a supplied class', (t) => {
  const testClassName = 'legumes';
  const testPlayerId = 'snek';
  const wrapper = shallow(<JWPlayer className={testClassName} playerId={testPlayerId} />);

  t.ok(
    wrapper.first().hasClass(testClassName),
    'it gives the outer div the supplied class name'
  );

  t.end();
});
