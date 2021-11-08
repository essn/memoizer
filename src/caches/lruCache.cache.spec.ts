import test from 'ava';

import memoizer from '../memoizer';

test('lruCache stores a specific number of values', (t) => {
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
  memoizedAdder(...args1);

  memoizedAdder(...args2);
  memoizedAdder(...args2);

  memoizedAdder(...args3);
  memoizedAdder(...args3);

  // count should be incremented a fourth time as the original call
  // is not in the cache
  memoizedAdder(...args1);
  memoizedAdder(...args1);

  t.deepEqual(count, 4);
});

test('lruCache protects memoized resource from multiple calls', async (t) => {
  // eslint-disable-next-line functional/no-let
  let counter = 0;

  const protekted = (a, b) => {
    counter += 1;

    return a + b;
  };

  const memoizedProtekted = memoizer(2)(protekted);

  const aDecentAmountOfArguments1 = new Array(10).fill(1);
  const aDecentAmountOfArguments2 = new Array(10).fill(2);

  const promises = [
    ...aDecentAmountOfArguments1.map((i) => {
      return new Promise((resolve) => resolve(memoizedProtekted(i, i)));
    }),
    ...aDecentAmountOfArguments2.map((i) => {
      return new Promise((resolve) => resolve(memoizedProtekted(i, i)));
    }),
    ...aDecentAmountOfArguments2.map((i) => {
      return new Promise((resolve) => resolve(memoizedProtekted(i, i)));
    }),
  ];

  await Promise.all(promises);

  t.deepEqual(counter, 2);
});

test('lruCache plays nice in a single thread', async (t) => {
  const adder = (a, b) => a + b;
  const memoizedAdder = memoizer(2)(adder);

  const aLotOfArguments1 = new Array(1000).fill(1);
  const aLotOfArguments2 = new Array(1000).fill(7);

  const promises = [
    ...aLotOfArguments1.reduce((innerPromises1, _, i) => {
      const memoizedValue = memoizedAdder(i, 1);
      innerPromises1.push(t.deepEqual(memoizedValue, i + 1));
      return innerPromises1;
    }, []),
    ...aLotOfArguments2.reduce((innerPromises2, _, i) => {
      const memoizedValue = memoizedAdder(i, 1);
      innerPromises2.push(t.deepEqual(memoizedValue, i + 1));
      return innerPromises2;
    }, []),
  ];

  await Promise.all(promises);
});
