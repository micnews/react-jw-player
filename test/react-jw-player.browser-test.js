import jsdomGlobal from 'jsdom-global';
import React from 'react';
import { mount } from 'enzyme';
import test from 'tape';

import ReactJWPlayer from '../src/react-jw-player';

jsdomGlobal();

test('<ReactJWPlayer> when no jwplayer script is present', (t) => {
  const testPlayerId = 'robocop';

  mount(
    <ReactJWPlayer
      playerId={testPlayerId}
      playerScript='script'
      playlist='playlist'
    />
  );

  const script = document.querySelector('#jw-player-script');
  t.ok(script, 'it installs the jw player script');

  t.end();
});
