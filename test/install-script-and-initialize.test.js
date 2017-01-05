import test from 'tape';
import installScriptAndInitialize from '../src/helpers/install-script-and-initialize';

test('installScriptAndInitialize() when script does not exist yet', (t) => {
  let appendedElement;
  let createdElementType;

  const mockElement = {};

  const mockContext = {
    jwplayer() {
      return {};
    },
    document: {
      createElement(elementType) {
        createdElementType = elementType;
        return mockElement;
      },
      querySelector() {
        return null;
      },
      head: {
        appendChild(element) {
          appendedElement = element;
        }
      }
    }
  };

  const mockComponent = {
    props: {
      playlist: 'playlist',
      muted: false,
      generatePrerollUrl() {
      },
      playerId: 'playerId',
      playerScript: 'playerScript'
    },
    uniqueScriptID: 'uniqueScriptID'
  };

  t.doesNotThrow(
    installScriptAndInitialize.bind(null, mockContext, mockComponent),
    'it does not error'
  );

  t.equal(createdElementType, 'script', 'it creates a script tag');
  t.equal(
    appendedElement, mockElement,
    'if appends it to the head of the supplied context document'
  );

  t.end();
});

test('installScriptAndInitialize() when script does exist', (t) => {
  let calledAppendChild = false;

  const mockExistingScript = {};

  const mockContext = {
    jwplayer() {
      return {};
    },
    document: {
      createElement() {
      },
      querySelector() {
        return mockExistingScript;
      },
      head: {
        appendChild() {
          calledAppendChild = true;
        }
      }
    }
  };

  const mockComponent = {
    props: {
      playlist: 'playlist',
      muted: false,
      generatePrerollUrl() {
      },
      playerId: 'playerId',
      playerScript: 'playerScript'
    },
    uniqueScriptID: 'uniqueScriptID'
  };

  t.doesNotThrow(
    installScriptAndInitialize.bind(null, mockContext, mockComponent),
    'it does not error'
  );

  t.notOk(calledAppendChild, 'it does not append anything to the head of the context document');

  t.equal(
    typeof mockExistingScript.onload, 'function',
    'it adds a function to the onload property of the existing script tag'
  );

  t.end();
});
