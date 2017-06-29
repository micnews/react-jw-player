import test from 'tape';
import getPlayerOpts from '../src/helpers/get-player-opts';

test('getPlayerOpts() with defaults', (t) => {
  const mockPlaylist = 'mock playlist';

  const actual = getPlayerOpts({
    playlist: mockPlaylist,
  });

  t.equal(actual.playlist, mockPlaylist, 'it sets the playlist property to the supplied playlist');
  t.equal(actual.mute, false, 'it sets the mute property to false');
  t.notOk(
    Object.prototype.hasOwnProperty.call(actual, 'aspectratio'),
    'it does not set aspectratio properties',
  );
  t.notOk(
    Object.prototype.hasOwnProperty.call(actual, 'advertising'),
    'it does not set advertising properties',
  );

  t.end();
});

test('getPlayerOpts() when isAutoPlay is not supplied', (t) => {
  const mockPlaylist = 'mock playlist';

  const actual = getPlayerOpts({
    playlist: mockPlaylist,
  });

  t.notOk(
    Object.prototype.hasOwnProperty.call(actual, 'autostart'),
    'it does not set autostart properties',
  );

  t.end();
});

test('getPlayerOpts() when autoplay is on', (t) => {
  const mockPlaylist = 'mock playlist';

  const actual = getPlayerOpts({
    isAutoPlay: true,
    playlist: mockPlaylist,
  });

  t.equal(actual.playlist, mockPlaylist, 'it sets the playlist property to the supplied playlist');
  t.equal(actual.autostart, true, 'it sets the autostart property to true');

  t.end();
});

test('getPlayerOpts() when muted', (t) => {
  const mockPlaylist = 'mock playlist';

  const actual = getPlayerOpts({
    aspectRatio: '1:1',
    isMuted: true,
    playlist: mockPlaylist,
  });

  t.equal(actual.aspectratio, '1:1', 'it sets the aspect ratio properly');
  t.equal(actual.playlist, mockPlaylist, 'it sets the playlist property to the supplied playlist');
  t.equal(actual.mute, true, 'it sets the mute property to true');
  t.notOk(
    Object.prototype.hasOwnProperty.call(actual, 'advertising'),
    'it does not set advertising properties',
  );

  t.end();
});

test('getPlayerOpts() with advertising', (t) => {
  const mockPlaylist = 'mock playlist';

  const actual = getPlayerOpts({
    aspectRatio: '1:1',
    generatePrerollUrl() {},
    playlist: mockPlaylist,
  });

  t.equal(actual.aspectratio, '1:1', 'it sets the aspect ratio properly');
  t.equal(actual.playlist, mockPlaylist, 'it sets the playlist property to the supplied playlist');
  t.equal(actual.mute, false, 'it sets the mute property to false');
  t.ok(actual.advertising, 'it sets advertising properties');
  t.equal(actual.advertising.client, 'googima', 'it sets the advertising client');
  t.equal(actual.advertising.admessage, 'Ad — xxs left', 'it sets the admessage');
  t.ok(actual.advertising.autoplayadsmuted, 'it sets autoplayadsmuted to true');

  t.end();
});

test('getPlayerOpts() with both a file and a playlist', (t) => {
  const mockFile = 'mock file';
  const mockPlaylist = 'mock playlist';

  const actual = getPlayerOpts({
    file: mockFile,
    playlist: mockPlaylist,
  });

  t.equal(actual.playlist, mockPlaylist, 'it sets the playlist property');
  t.notOk(Object.prototype.hasOwnProperty.call(actual, 'file'), 'it does not set file properties');

  t.end();
});

test('getPlayerOpts() with both only a file', (t) => {
  const mockFile = 'mock file';

  const actual = getPlayerOpts({
    file: mockFile,
  });

  t.equal(actual.file, mockFile, 'it sets the file property');

  t.end();
});

test('getPlayerOpts() with image', (t) => {
  const mockImage = 'mock image';

  const actual = getPlayerOpts({
    image: mockImage,
  });

  t.equal(actual.image, mockImage, 'it sets the image property');

  t.end();
});

test('getPlayerOpts() with license key', (t) => {
  const mockKey = 'mock key';

  const actual = getPlayerOpts({
    licenseKey: mockKey,
  });

  t.equal(actual.key, mockKey, 'it sets the key property');

  t.end();
});

test('getPlayerOpts() with customProps', (t) => {
  const customProps = {
    skin: {
      name: 'five',
    },
  };

  const actual = getPlayerOpts({ customProps });

  t.deepEqual(actual.skin, customProps.skin, 'it sets customProps properly');

  t.end();
});
