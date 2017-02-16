import test from 'tape';
import getCurriedOnLoad from '../src/helpers/get-curried-on-load';

test('getCurriedOnLoad()', (t) => {
  let firstFunctionCalled = false;
  let secondFunctionCalled = false;

  function first() {
    firstFunctionCalled = true;
  }

  function second() {
    secondFunctionCalled = true;
  }

  const mockScript = {
    onload: first,
  };

  const curriedOnLoad = getCurriedOnLoad(mockScript, second);
  t.doesNotThrow(curriedOnLoad, 'the curried function does not error');
  t.ok(firstFunctionCalled, 'the curried function calls the original onload function');
  t.ok(secondFunctionCalled, 'the curried function calls the second supplied function');

  t.end();
});
