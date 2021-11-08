import test from 'ava';

import memoizer from './memoizer';

test('memoizer returns a single cache with no arguments', (t) => {
  // eslint-disable-next-line functional/no-let
  let count = 0;

  const adder = (a, b) => {
    count += 1;

    return a + b;
  };

  const memoizedAdder = memoizer()(adder);

  const args1 = [1, 1];
  const args2 = [1, 2];

  memoizedAdder(...args1);
  memoizedAdder(...args2);
  memoizedAdder(...args1);

  t.deepEqual(count, 3);
});

test('memoizer returns an lruCache cache with limit argument', async (t) => {
  // eslint-disable-next-line functional/no-let
  let count = 0;

  const adder = (a, b) => {
    count += 1;

    return a + b;
  };

  const memoizedAdder = memoizer(2)(adder);

  const args1 = [1, 1];
  const args2 = [1, 2];
  const args3 = [1, 3];

  memoizedAdder(...args1);
  memoizedAdder(...args2);
  memoizedAdder(...args3);

  // count should be incremented a fourth time as the original call
  // is not in the cache
  memoizedAdder(...args1);

  t.deepEqual(count, 4);
});
