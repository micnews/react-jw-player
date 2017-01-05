import test from 'tape';
import getPlayerOpts from '../src/helpers/get-player-opts';

test('getPlayerOpts() with defaults', (t) => {
  const mockPlaylist = 'mock playlist';

  const actual = getPlayerOpts({
    playlist: mockPlaylist
  });

  t.equal(actual.playlist, mockPlaylist, 'it sets the playlist property to the supplied playlist');
  t.equal(actual.mute, false, 'it sets the mute property to false');
  t.notOk(actual.advertising, 'it does not set advertising properties');

  t.end();
});

test('getPlayerOpts() when muted', (t) => {
  const mockPlaylist = 'mock playlist';

  const actual = getPlayerOpts({
    isMuted: true,
    playlist: mockPlaylist
  });

  t.equal(actual.playlist, mockPlaylist, 'it sets the playlist property to the supplied playlist');
  t.equal(actual.mute, true, 'it sets the mute property to true');
  t.notOk(actual.advertising, 'it does not set advertising properties');

  t.end();
});

test('getPlayerOpts() with advertising', (t) => {
  const mockPlaylist = 'mock playlist';

  const actual = getPlayerOpts({
    hasAdvertising: true,
    playlist: mockPlaylist
  });

  t.equal(actual.playlist, mockPlaylist, 'it sets the playlist property to the supplied playlist');
  t.equal(actual.mute, false, 'it sets the mute property to false');
  t.ok(actual.advertising, 'it sets advertising properties');
  t.equal(actual.advertising.client, 'googima', 'it sets the advertising client');
  t.equal(actual.advertising.admessage, 'Ad — xxs left', 'it sets the admessage');
  t.ok(actual.advertising.autoplayadsmuted, 'it sets autoplayadsmuted to true');

  t.end();
});
