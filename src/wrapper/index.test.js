/* @flow */
import React from 'react';
import { shallow } from 'enzyme';
import test from 'tape';
import ReactJWPlayer from './';

test('<ReactJWPlayer />', (t) => {
  t.doesNotThrow(
    () => shallow(<ReactJWPlayer />),
    'it renders without error',
  );

  t.end();
});
