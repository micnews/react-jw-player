import React from 'react';
import { shallow } from 'enzyme';
import test from 'tape';

import ReactJWPlayerBase from './';

test('<ReactJWPlayerBase />', (t) => {
  t.doesNotThrow(
    () => shallow(<ReactJWPlayerBase />),
    'it renders without error',
  );

  t.end();
});
