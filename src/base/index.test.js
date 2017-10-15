/* flow */
import React from 'react';
import { shallow } from 'enzyme';
import test from 'tape';

import ReactJWPlayerBase from './';

test('<ReactJWPlayerBase />', t => {
  const wrapper = shallow(<ReactJWPlayerBase />);

  t.is(wrapper.first().node.type, 'div', 'the root node is a div');

  t.end();
});
