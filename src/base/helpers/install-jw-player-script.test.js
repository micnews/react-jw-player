/* @flow */
import test from 'tape';
import installJWPlayerScript from './install-jw-player-script';

test('installJWPlayerScript()', (t) => {
  let createElementCalled = false;
  let createElementTag;
  let appendChildElement;
  let appendChildCalled = false;

  const mockJWPlayerScript = {};

  const mockContext = {
    createElement(tag) {
      createElementCalled = true;
      createElementTag = tag;
      return mockJWPlayerScript;
    },
    head: {
      appendChild(element) {
        appendChildCalled = true;
        appendChildElement = element;
      },
    },
  };

  const mockOnLoadCallback = () => {};
  const mockScriptSrc = 'scriptSrc';
  const mockUniqueScriptId = 'uniqueScriptId';

  const opts = {
    context: mockContext,
    onLoadCallback: mockOnLoadCallback,
    scriptSrc: mockScriptSrc,
    uniqueScriptId: mockUniqueScriptId,
  };

  t.doesNotThrow(installJWPlayerScript.bind(null, opts), 'it does not error');

  t.ok(createElementCalled, 'it calls context.createElement()');
  t.equal(createElementTag, 'script', 'it creates a script tag');

  t.equal(
    mockJWPlayerScript.id,
    mockUniqueScriptId,
    'it sets the script element id',
  );
  t.equal(
    mockJWPlayerScript.src,
    mockScriptSrc,
    'it sets the script element src',
  );
  t.equal(
    mockJWPlayerScript.onload,
    mockOnLoadCallback,
    'it sets the script element onload callback',
  );

  t.ok(appendChildCalled, 'it calls context.head.appendChild()');
  t.equal(
    appendChildElement,
    mockJWPlayerScript,
    'it appends the created script element',
  );

  t.end();
});
