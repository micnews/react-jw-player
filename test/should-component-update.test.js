import test from 'tape';
import shouldComponentUpdate from '../src/helpers/should-component-update';

test('shouldComponentUpdate() with no change', (t) => {
  const propsOne = {
    file: null,
    playlist: 'playlist',
  };

  const propsTwo = {
    file: null,
    playlist: 'playlist',
  };

  t.notOk(
    shouldComponentUpdate(propsOne, propsTwo),
    'it returns false when the props are the same',
  );

  t.end();
});

test('shouldComponentUpdate() with playlist change', (t) => {
  const propsOne = {
    file: null,
    playlist: 'playlist',
  };

  const propsTwo = {
    file: null,
    playlist: 'playlistTwo',
  };

  t.ok(
    shouldComponentUpdate(propsOne, propsTwo),
    'it returns true when the playlist prop changes',
  );

  t.end();
});

test('shouldComponentUpdate() with file change', (t) => {
  const propsOne = {
    file: 'file',
    playlist: null,
  };

  const propsTwo = {
    file: 'fileTwo',
    playlist: null,
  };

  t.ok(
    shouldComponentUpdate(propsOne, propsTwo),
    'it returns true when the file prop changes',
  );

  t.end();
});
