/* flow */
import React from 'react';
import { shallow } from 'enzyme';
import test from 'tape';

import ReactJWPlayerBase from './';

test('<ReactJWPlayerBase />', t => {
  const testPlayerId = 'react-jw-player';
  const wrapper = shallow(<ReactJWPlayerBase />);

  t.is(wrapper.first().node.type, 'div', 'the root node is a div');

  t.deepEqual(
    wrapper.first().props().dangerouslySetInnerHTML,
    { __html: `<div id="${testPlayerId}"></div>` },
    'it dangerously sets inner html to a div with the supplied id',
  );

  t.end();
});
